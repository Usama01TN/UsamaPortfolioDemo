// Featured projects: these get a cover image and their own page.
// Every other public repository is listed automatically (see data/notes.js).
// `repos` lists the GitHub repositories behind a project; the first is the main one.
export const projects = [
  {
    slug: "ocrroute", repos: ["OcrRoute"], name: "OcrRoute", kind: "Service and desktop app", home: true,
    tags: ["Python", "AI", "Desktop", "Web"],
    summary: "One API for 50+ OCR engines, with smart routing, automatic fallbacks, caching and cost tracking.",
    body: [
      "Every OCR engine fails in a different way. OcrRoute puts them behind a single API, picks an engine for each request and moves on to the next one when a call fails.",
      "A web dashboard shows what each engine costs and how often it is used, and a PyQt desktop app gives the same controls without a browser.",
    ],
    highlights: ["Smart routing across 50+ OCR engines", "Automatic fallbacks when an engine fails", "Result caching and per-engine cost tracking", "Web dashboard and PyQt desktop app"],
  },
  {
    slug: "screenmagnifier", repos: ["ScreenMagnifier"], name: "ScreenMagnifier", kind: "Desktop app", home: true,
    tags: ["Python", "Desktop", "AI", "Windows", "macOS", "Linux"],
    summary: "A real-time screen magnifier for Windows, macOS and Linux with AI super-resolution and a game zoom lens.",
    body: [
      "ScreenMagnifier is for inspecting small interface details, reading tiny text, checking pixel alignment and picking colours, with an image that stays sharp at high magnification instead of turning blurry or blocky.",
      "It is written in Python with PyQt or PySide through ManyQt, and release builds are produced for every architecture with GitHub Actions.",
    ],
    highlights: ["Select a screen region or follow the cursor, from 0.25x to 32x", "Classic and AI super-resolution upscaling", "Live colour code and colour-zone detection", "Optional AI face detection", "Optional analysis server that upscales on another computer in real time", "Runs from the tray and works while you play a game"],
  },
  {
    slug: "quizkey", repos: ["QuizKey"], name: "QuizKey", kind: "Chrome extension", home: true,
    tags: ["JavaScript", "AI", "Web"],
    summary: "A hotkey-driven quiz assistant for Chrome that reads the page with vision models.",
    body: [
      "Press a hotkey and QuizKey sends what is on screen to a vision model, then shows the answer.",
      "It works with hosted providers and with models running on your own machine, so you choose where your data goes.",
    ],
    highlights: ["Hotkey-driven, built for Chrome", "Vision models from OpenAI, Claude, Gemini and OpenRouter", "Local options through Ollama and LM Studio", "OmniRoute support"],
  },
  {
    slug: "qfunnywidgets", repos: ["QFunnyWidgets", "QFunnyWidgets-cpp"], name: "QFunnyWidgets", kind: "Widget library, Python and C++", home: true,
    tags: ["C/C++", "Python", "Desktop", "Qt"],
    summary: "35 animated, custom-painted Qt widgets with a sense of humour, for PyQt, PySide and C++.",
    body: [
      "Serious applications can have a little personality. Every widget is a drop-in QWidget with normal signals, properties and keyboard support, and it animates like a cartoon.",
      "The Python version targets PyQt and PySide. The C++ port has the same widgets, demos, gallery and Qt Designer integration for Qt 6 and Qt 5.15.",
    ],
    highlights: ["Switches, loaders, sliders, toasts and more", "Python edition for PyQt and PySide, C++ edition for Qt 6 and Qt 5.15", "Qt Designer plugin included", "Releases with a gallery app and an SDK for every desktop architecture"],
  },
  {
    slug: "manyqt", repos: ["ManyQt"], name: "ManyQt", kind: "Library", home: true,
    tags: ["Python", "Desktop", "Qt"],
    summary: "A uniform API that lets one codebase run on PyQt4, PyQt5, PyQt6, PySide, PySide2 and PySide6.",
    body: [
      "Qt for Python comes in many bindings, and each one names things a little differently. ManyQt hides those differences.",
      "Write your interface once and run it on whichever binding your users have installed. Several of my other projects are built on it.",
    ],
    highlights: ["Supports PyQt4, PyQt5 and PyQt6", "Supports PySide, PySide2 and PySide6", "A single codebase and one import"],
  },
  {
    slug: "pyfreerdpapp", repos: ["PyFreeRdpApp"], name: "PyFreeRdpApp", kind: "Desktop app and widget", home: true,
    tags: ["Python", "Desktop", "Remote desktop", "Windows", "Linux"],
    summary: "A Python RDP client built on FreeRDP 3, as an embeddable Qt widget and a desktop app.",
    body: [
      "PyFreeRdpApp wraps the low-level FreeRDP bindings in a small, task-oriented RDPApplication class and an optional Qt widget for PyQt5, PyQt6 and PySide6.",
      "The desktop app adds clipboard sharing, file transfer and Azure AD sign-in.",
    ],
    highlights: ["Built on PyFreeRdpNative and FreeRDP 3", "Embeddable Qt widget for PyQt5, PyQt6 and PySide6", "Clipboard and file transfer", "Azure AD support"],
  },
  {
    slug: "pyfreerdpnative", repos: ["PyFreeRdpNative"], name: "PyFreeRdpNative", kind: "Native library",
    tags: ["Python", "C/C++", "Remote desktop", "Networking"],
    summary: "A cross-platform remote desktop protocol library for clients and servers, compiled for Python.",
    body: [
      "PyFreeRdpNative brings the remote desktop protocol to Python as a compiled library, so Python programs can act as an RDP client or a server.",
      "It is the base that PyFreeRdpApp, QRemoteDisplay and other remote desktop tools are built on.",
    ],
    highlights: ["RDP for both clients and servers", "Cross-platform", "Compiled for Python, with FreeRDP 3 libraries published as release assets"],
  },
  {
    slug: "qaxrdp", repos: ["QAxRDP"], name: "QAxRDP", kind: "Qt widget library",
    tags: ["Python", "Desktop", "Remote desktop", "Windows", "Qt"],
    summary: "The Microsoft Remote Desktop client as a Qt widget for Python, with signals, slots and properties.",
    body: [
      "QAxRDP embeds the same ActiveX control that mstsc.exe uses inside a Qt application, so a Python program can open RDP sessions in its own windows without touching COM.",
      "It is built on ManyQt, so the same code runs on PyQt5, PyQt6, PySide2 and PySide6. Version 2.0 is a complete rewrite.",
    ],
    highlights: ["Every option of the Microsoft client: credentials, display, redirections, RD Gateway, RemoteApp", "Session life cycle exposed as ordinary Qt signals", "Works with PyQt5, PyQt6, PySide2 and PySide6"],
  },
  {
    slug: "minirdpblocker", repos: ["MiniRDPBlocker"], name: "MiniRDPBlocker", kind: "Security tool",
    tags: ["Python", "Desktop", "Remote desktop", "Networking"],
    summary: "A lightweight tool that drops unwanted RDP sessions by client IP or country.",
    body: [
      "MiniRDPBlocker runs as a hidden background process and disconnects remote desktop sessions you did not expect.",
      "Rules can match a client IP address or a country found by geolocation, and the settings are protected by a password.",
    ],
    highlights: ["Blocks by client IP or geolocated country", "Password-protected settings", "Runs hidden in the background"],
  },
  {
    slug: "pyqtbuilder", repos: ["PyQtBuilder"], name: "PyQtBuilder", kind: "Build tool",
    tags: ["Python", "Desktop", "Qt", "Tooling"],
    summary: "Builds PyQt and PySide apps on multiple platforms.",
    body: [
      "Shipping a Qt app means a different build on every operating system. PyQtBuilder turns that into one command.",
      "It pairs with ManyQt, so the same app can be built against any Qt binding.",
    ],
    highlights: ["Builds PyQt and PySide applications", "Targets multiple platforms"],
  },
  {
    slug: "thewalkingduck", repos: ["TheWalkingDuckTaskBar"], name: "TheWalkingDuckTaskBar", kind: "Desktop toy", home: true,
    tags: ["Python", "Desktop", "Windows"],
    summary: "A PyQt duck that waddles your window across the real Windows taskbar, quacking on every step.",
    body: [
      "The window's taskbar button is moved one slot at a time, using the 7+ Taskbar Tweaking Library through a thin ctypes wrapper.",
      "The duck icon is drawn with QPainter, so there are no image files, and each step plays a quack.",
    ],
    highlights: ["Moves the real taskbar button group, left or right", "Four-frame walk cycle drawn procedurally", "Plays WAV, MP3, OGG and more as quack sounds", "Step speed from 60 ms to 1000 ms, plus a taskbar order inspector"],
  },
  {
    slug: "cinephile", repos: ["MovieAppExample"], name: "Cinephile", kind: "Web app", home: true,
    tags: ["React", "JavaScript", "Web"],
    summary: "A React movie and TV shelf with title search, a star-rating filter and trailer pages.",
    body: [
      "Add titles, filter them by name and by minimum star rating, then open any card to read its description and watch the trailer on its own page.",
      "It is built with React hooks and React Router.",
    ],
    highlights: ["Add titles to your shelf", "Filter by title and minimum rating", "A page per title with description and trailer", "React hooks and React Router"],
  },
  {
    slug: "motonic", repos: ["motonic-react"], name: "Motonic", kind: "Web template in React", home: true,
    tags: ["React", "JavaScript", "Web"],
    summary: "A car repair website template rebuilt as a React 18 and Vite project with React Router.",
    body: [
      "Every page of the original HTML template is now a route, the repeated markup is split into reusable components, and all of the jQuery behaviour is rewritten in React.",
      "The result runs without jQuery, Bootstrap JS, Owl Carousel or Fancybox.",
    ],
    highlights: ["React 18 and Vite", "One route per original page", "Reusable components", "No jQuery or jQuery plugins"],
  },
  {
    slug: "inkpad", repos: ["InkpadExample"], name: "Inkpad", kind: "Web app",
    tags: ["JavaScript", "Web"],
    summary: "A small, fast to-do tracker that runs entirely in the browser and saves to your device.",
    body: [
      "Add tasks with an optional due date and a high-priority flag, which is shown as a highlighter mark. Finished tasks get an ink line through them.",
      "Everything stays on your device, so it works without an account or a server.",
    ],
    highlights: ["Due dates and a high-priority highlighter", "Filter and search", "Edit with the pencil button or by double-clicking", "Saved on your device"],
  },
];

export const allTags = [...new Set(projects.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b));
export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const featuredRepoNames = new Set(projects.flatMap((p) => p.repos));
