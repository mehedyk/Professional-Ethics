/* ------------------------------------------------------------------
   SE 441 Study Hub: the library.
   Everything the dashboard shows comes from this one file.
   Add, remove or reorder entries here and refresh the page.
   See GUIDE.md for copy-paste recipes.
------------------------------------------------------------------- */
window.LIBRARY = {
  site: {
    name: "SE 441 Study Hub",
    course: "Software Engineering Professional Ethics"
  },

  categories: [
    /* ---------------------------- SLIDES ---------------------------- */
    {
      id: "slides",
      title: "Slides",
      icon: "slides",
      blurb: "Interactive decks with animations, flows and quizzes.",
      items: [
        {
          title: "Ethics from Zero",
          description: "Ethics, professional ethics, the four frameworks, computer ethics, laws and a worked case study. Bangla explanations, English answers.",
          href: "decks/ethics/",
          meta: "32 slides · Bangla × English",
          tags: ["frameworks", "case study", "quiz"]
        }
      ]
    },

    /* ---------------------------- VIDEOS ---------------------------- */
    {
      id: "videos",
      title: "Videos",
      icon: "play",
      blurb: "Watch right here on the page. No tab switching.",
      items: [
        {
          title: "Semester Ethics Course condensed into 22mins (Part 1 of 2)",
          description: "A whole semester of ethics theory in one sitting.",
          youtube: "https://www.youtube.com/watch?v=DLCUn6h7qRo",
          channel: "Jeffrey Kaplan",
          tags: ["theory", "overview"]
        },
        {
          title: "Semester Ethics Course condensed (Part 2 of 2)",
          description: "The second half. Watch it after Part 1.",
          youtube: "https://www.youtube.com/watch?v=dpmD6NuM_r0",
          channel: "Jeffrey Kaplan",
          tags: ["theory", "overview"]
        }
      ]
    },

    /* ----------------------------- NOTES ---------------------------- */
    {
      id: "notes",
      title: "Notes",
      icon: "notes",
      blurb: "Written lesson notes. Read in the page or download.",
      items: [
        {
          title: "Week 1 · Lesson 1: Ethics, Professional Ethics and Frameworks",
          description: "Definitions, ethics vs professional ethics, deontology, utilitarianism, virtue and rights-based ethics.",
          file: "files/notes/week-1-lesson-1-intro-to-ethics.pdf",
          pages: 7,
          tags: ["week 1", "frameworks"]
        },
        {
          title: "Week 2 · Lesson 1a: Introduction to Computer Ethics",
          description: "Moor's definition, why computer ethics matters, core issues, laws and the ACM / IEEE codes.",
          file: "files/notes/week-2-lesson-1a-computer-ethics.pdf",
          pages: 3,
          tags: ["week 2", "computer ethics"]
        },
        {
          title: "Week 2 · Lesson 1b: Computer Ethics in depth",
          description: "Scope, history, relevance, and how each ethical theory applies to computing.",
          file: "files/notes/week-2-lesson-1b-computer-ethics.pdf",
          pages: 10,
          tags: ["week 2", "history"]
        },
        {
          title: "Week 2 · Lesson 2: Computer, Professional and General Ethics",
          description: "How the three kinds of ethics overlap, with scenarios on piracy, biased AI and breach cover-ups.",
          file: "files/notes/week-2-lesson-2-similarities.pdf",
          pages: 4,
          tags: ["week 2", "scenarios"]
        }
      ]
    },

    /* --------------------------- SIR'S SLIDES ----------------------- */
    {
      id: "sirs",
      title: "Sir's Slides",
      icon: "present",
      blurb: "The lecturer's own slides, as presented in class.",
      items: [
        {
          title: "Week 1 · Lecture slides",
          description: "Trolley problem, the server-room dilemmas, law vs ethics, why software needs ethics, and the core frameworks.",
          file: "files/sirs-slides/week-1-lesson-1-lecture-slides.pdf",
          pages: 15,
          tags: ["week 1", "lecture"]
        }
      ]
    },

    /* ------------------------ COMING SOON (placeholders) ------------ */
    {
      id: "practice",
      title: "Practice",
      icon: "quiz",
      blurb: "Quizzes and flashcards.",
      soon: true,
      items: []
    },
    {
      id: "past",
      title: "Past Questions",
      icon: "paper",
      blurb: "Previous class tests and model answers.",
      soon: true,
      items: []
    }
  ]
};
