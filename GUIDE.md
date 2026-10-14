# Guide: adding videos, notes and more

Everything the Study Hub shows comes from **one source file: `tools/library.src.js`**.
It is encrypted into `data/library.enc.js`, which is what the site actually loads. After every edit, rebuild:

```bash
node tools/build-library.mjs YOUR_PASSWORD      # needs Node 18+
```

Then refresh the page. The current password is `ethics441`. To change it, rebuild with a new one.

> Keep `tools/library.src.js` safe (it is in `.gitignore`, so it is **not** pushed to GitHub). If you lose it, decrypt-and-copy is not possible, so keep a backup.

- [The password gate](#the-password-gate)
- [How the library is organised](#how-the-library-is-organised)
- [Add a YouTube video](#add-a-youtube-video)
- [Add a PDF note](#add-a-pdf-note)
- [Add the lecturer's slides](#add-the-lecturers-slides)
- [Add a new interactive deck](#add-a-new-interactive-deck)
- [Add or rename a category](#add-or-rename-a-category)
- [Item fields](#item-fields)
- [Preview locally](#preview-locally)
- [Troubleshooting](#troubleshooting)
- [Before you make the repo public](#before-you-make-the-repo-public)

## The password gate

On load the page asks for a password. The library (titles, video links, file paths) is stored **encrypted** (AES-256-GCM, key from PBKDF2). The password is not in the code, so it cannot be read from View Source or DevTools. Typing the right one decrypts the library in the browser; a wrong one gives nothing.

What this does **not** do: this is a static site, so there is no server to refuse a request. Anyone who already knows a direct URL (for example `files/notes/...pdf` or `decks/ethics/`) can still open it, and a weak password can be guessed offline. It keeps casual visitors and link-hunters out; it is not real access control. For that, use a private repo or an access-controlled host.

Changing the password: `node tools/build-library.mjs NEW_PASSWORD`, then push `data/library.enc.js`.

## How the library is organised

```js
window.LIBRARY = {
  site: { ... },
  categories: [
    { id: "slides", title: "Slides", icon: "slides", blurb: "...", items: [ ...items ] },
    { id: "videos", ... },
    ...
  ]
};
```

Each category becomes a tile. Each item inside it becomes a card. The hero counters and the quick-jump cards at the top update by themselves.

## Add a YouTube video

1. Open `tools/library.src.js` and find the `videos` category.
2. Add an item to its `items` array (mind the comma after the previous item):

```js
{
  title: "Trolley Problem Explained",
  description: "One line about why it is worth watching.",
  youtube: "https://www.youtube.com/watch?v=VIDEO_ID",
  channel: "Channel name",
  tags: ["frameworks", "week 1"]
}
```

Any of these URL styles work for `youtube`: `watch?v=...`, `youtu.be/...`, `/embed/...`, `/shorts/...`, or just the 11-character ID.

**Start time.** The `&t=11s` part of a pasted link is ignored on purpose. Videos start at 0:00. To start somewhere else, add `start` in seconds:

```js
start: 95,   // begins at 1:35
```

The video plays in a pop-up on the page when the card is clicked.

## Add a PDF note

1. Copy the PDF into `files/notes/`. Use lowercase, hyphens, no spaces: `week-3-lesson-1-privacy.pdf`.
2. Add an item to the `notes` category (then rebuild):

```js
{
  title: "Week 3 · Lesson 1: Privacy",
  description: "What the note covers, in one sentence.",
  file: "files/notes/week-3-lesson-1-privacy.pdf",
  pages: 6,
  tags: ["week 3"]
}
```

The PDF opens in the pop-up with an **Open** and a **Download** button. Browsers that cannot show PDFs inline (many phones) get those buttons instead.

## Add the lecturer's slides

Same as notes, but put the file in `files/sirs-slides/` and add the item to the `sirs` category.

## Add a new interactive deck

1. Copy the folder `decks/ethics/` to `decks/your-topic/` and edit its `index.html`.
2. Keep the `⌂ Hub` link and the `../../` icon paths so it still points home.
3. Add an item to the `slides` category:

```js
{
  title: "Privacy from Zero",
  description: "What this deck teaches.",
  href: "decks/your-topic/",
  meta: "20 slides",
  tags: ["privacy"]
}
```

Use `href` for anything that is a web page, deck or external link. Use `file` for PDFs and `youtube` for videos.

## Add or rename a category

Copy an existing category block and change it:

```js
{
  id: "labs",              // unique, lowercase, no spaces
  title: "Labs",
  icon: "paper",           // slides | play | notes | present | quiz | paper
  blurb: "Short line under the title.",
  items: []
}
```

Add `soon: true` to show it as a greyed-out "coming soon" tile with no items. Remove that line when you add content. Delete the whole block to remove the category.

## Item fields

| Field | Used for | Notes |
|---|---|---|
| `title` | all | required |
| `description` | all | one or two sentences |
| `youtube` | video | URL or 11-character ID |
| `start` | video | seconds, optional, default 0 |
| `channel` | video | shown under the title |
| `file` | PDF | path relative to the site root |
| `pages` | PDF | shown as "7 pages · PDF" |
| `href` | deck / link | relative path or full URL |
| `meta` | any | small grey line, overrides the auto text |
| `tags` | all | searchable with the box above the cards |

An item needs exactly one of `youtube`, `file` or `href`.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Double-clicking `index.html` also works for the page, library and PDFs. YouTube embeds can show **Error 153** when the page is opened as a `file://` address. That is YouTube refusing a page with no web origin, not a bug. Use the local server or the live site.

## Troubleshooting

| Problem | Fix |
|---|---|
| Build script fails | A typo in `tools/library.src.js` (usually a missing comma).
| Nothing shows / a blank library | The password step did not run. Use https:// or http://localhost (file:// works in most browsers but not all). A typo in `library.src.js` also shows here. Open the browser console (F12); the line number is in the error.  |
| "Video unavailable" | The owner disabled embedding. Nothing to fix on your side; use the "Watch on YouTube" link in the pop-up. |
| PDF does not open | Check the path and the exact filename (GitHub Pages is case-sensitive: `Notes.pdf` is not `notes.pdf`). |
| New file not on the live site | Pages takes a minute or two after you push. Hard-refresh with Ctrl+Shift+R. |
| Planet background missing | It needs WebGL and internet access to its CDN. Without them the hub falls back to a plain dark background and everything else still works. The **Effects** button turns it off on purpose. |

GitHub rejects single files over 100 MB and warns above 50 MB. Compress big PDFs, or host large videos on YouTube and use the `youtube` field.

## Light and dark mode

Dark is the default. The sun/moon button in the top bar switches, and the choice is remembered in the browser.

## Before you make the repo public

The notes and the lecturer's slides are **someone else's work**. Putting them in a public repository republishes them. Safer options:

- keep the repository **private** (GitHub Pages on private repos needs a paid plan), or
- add `files/` to `.gitignore` and share only the hub and your own deck, or
- ask the lecturer for permission first.

The YouTube videos are embedded from the owner's channel and are not copied, so they are fine.
