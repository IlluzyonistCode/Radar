# Radar

> *See what's flying above you, right now.*

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black)  ![Python](https://img.shields.io/badge/Python-3776AB.svg?style=flat-square&logo=Python&logoColor=white)  ![bat](https://img.shields.io/badge/bat-31369E.svg?style=flat-square&logo=bat&logoColor=white)  ![CSS](https://img.shields.io/badge/CSS-663399.svg?style=flat-square&logo=CSS&logoColor=white)

## Overview

Radar is a real-time aircraft tracking application. A Python backend demodulates raw ADS-B signals from a radio dongle, a Mode S decoder extracts structured flight data, and a JavaScript/HTML frontend renders aircraft positions on a live map interface.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## Features

|      | Component         | Details                                                                                                                                                                                                                                                  |
| :--- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**  | <ul><li>Multi-language stack: **Python** backend + **JavaScript/HTML/CSS** frontend</li><li>Windows-native launcher via `radar.bat` batch script</li><li>`.mjs` modules suggest use of **ES Module** architecture on the JS side</li><li>Likely a local desktop-web hybrid app (browser UI + Python process)</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>No linter or formatter config detected (e.g., no `.eslintrc`, `pyproject.toml`, or `black` config)</li><li>Mix of `.js` and `.mjs` files — inconsistent module format usage</li><li>No type annotations or TypeScript detected</li></ul> |
| 📄 | **Documentation** | <ul><li>A `LICENSE` file is present — project has defined legal terms</li><li>No `README`, `CHANGELOG`, or `docs/` directory detected</li><li>No inline docstrings or JSDoc evidence found</li></ul> |
| 🔌 | **Integrations**  | <ul><li>`radar.bat` acts as a Windows shell integration entry point</li><li>Python likely serves as a local backend or data-processing layer</li><li>No external API or third-party service integrations detected</li></ul> |
| 🧩 | **Modularity**    | <ul><li>`.mjs` files indicate some degree of **ES module separation** on the frontend</li><li>Python and JS responsibilities appear separated by language boundary</li><li>No evidence of a formal component framework (e.g., React, Vue)</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Static HTML/CSS/JS frontend — minimal rendering overhead</li><li>Python backend performance depends on implementation (no profiling config found)</li><li>No bundler or minifier detected (e.g., no `webpack`, `vite`, `esbuild`)</li></ul> |

---

## Project Structure

```
└── Radar/
    ├── decoder.mjs
    ├── demodulator.mjs
    ├── index.html
    ├── LICENSE
    ├── main.css
    ├── main.mjs
    ├── mode-s-msglen.mjs
    ├── radar.bat
    ├── README.md
    ├── rtlsdr.js
    └── server.py
```

---

## Getting Started

### Prerequisites

- Python 3.10+ / Node.js 18+ *(depending on the stack above)*

### Installation

```sh
git clone "https://github.com/IlluzyonistCode/Radar
cd Radar"
pip install -r requirements.txt
```

### Usage

```sh
radar.bat
```

---

## Contributing

- [Report Issues](https://github.com/IlluzyonistCode/Radar/issues)
- [Submit Pull Requests](https://github.com/IlluzyonistCode/Radar/pulls)
- [Discussions](https://github.com/IlluzyonistCode/Radar/discussions)

---

## License

Distributed under the [AGPL-3.0](LICENSE) license.
