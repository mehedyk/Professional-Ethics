// Encrypts tools/library.src.js into data/library.enc.js.
// The password is the key: it is never stored anywhere, so it cannot be read from the site.
//
//   LIB_PASSWORD=yourpassword node tools/build-library.mjs
//   node tools/build-library.mjs yourpassword
import { readFileSync, writeFileSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pw = process.argv[2] || process.env.LIB_PASSWORD;
if (!pw) { console.error('Give a password:  node tools/build-library.mjs <password>'); process.exit(1); }

const win = {}; vm.runInNewContext(readFileSync(join(root, 'tools/library.src.js'), 'utf8'), { window: win });
if (!win.LIBRARY || !Array.isArray(win.LIBRARY.categories)) { console.error('library.src.js did not define window.LIBRARY.categories'); process.exit(1); }

const ITER = 250000, enc = new TextEncoder(), b64 = (u) => Buffer.from(u).toString('base64');
const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(JSON.stringify(win.LIBRARY))));
writeFileSync(join(root, 'data/library.enc.js'), `/* Encrypted library. Rebuild with tools/build-library.mjs. Unreadable without the password. */\nwindow.LIB_ENC=${JSON.stringify({ v: 1, i: ITER, s: b64(salt), n: b64(iv), c: b64(ct) })};\n`);
console.log('wrote data/library.enc.js  (' + win.LIBRARY.categories.length + ' categories)');
