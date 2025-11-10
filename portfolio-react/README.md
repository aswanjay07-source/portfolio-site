# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Repo Hygiene
✅ `.gitignore` configured  
✅ No `node_modules` or build artifacts committed  
✅ Clean commit history

# 🚀 Aswan Jay — Fullstack Web Developer Portfolio

Welcome to my portfolio! I'm Aswan Jay, a fullstack web developer focused on building fast, secure, and visually engaging web applications. This repo powers my live portfolio site, showcasing featured projects, frontend experiments, backend integrations, and fullstack builds.

![GitHub last commit](https://img.shields.io/github/last-commit/aswanjay/portfolio)
![GitHub repo size](https://img.shields.io/github/repo-size/aswanjay/portfolio)
![GitHub issues](https://img.shields.io/github/issues/aswanjay/portfolio)
![GitHub forks](https://img.shields.io/github/forks/aswanjay/portfolio?style=social)
![GitHub stars](https://img.shields.io/github/stars/aswanjay/portfolio?style=social)

## 🧠 Tech Stack

- **Frontend**: React, Vite, CSS Modules, Semantic HTML
- **Backend**: Netlify Functions, GraphQL, REST APIs
- **Deployment**: Netlify, GitHub Pages
- **Tooling**: VS Code, Postman, GitHub Desktop, Lighthouse

## 📁 Repo Grouping Logic

Projects are grouped by GitHub topics:

| Category | Topic Tag |
|----------|-----------|
| Featured Projects | `featured` |
| Frontend UI/UX | `frontend` |
| Backend/API | `backend` |
| Fullstack Builds | `fullstack` |
| Sandbox Experiments | `sandbox` |

To update a repo’s category, go to GitHub → Settings → Topics → add the relevant tag.


## Screenshots

### Repo Cards
![Repo Cards](./src/assets/screenshots/repo-cards.png)

### Contact Form
![Contact Form](./src/assets/screenshots/contact-form.png)

## 🖼️ Screenshots

| Portfolio Homepage | Grouped Projects |
|--------------------|------------------|
| ![Homepage Screenshot](./screenshots/homepage.png) | ![Grouped Repos](./screenshots/grouped-repos.png) |

> Add your screenshots to a `/screenshots` folder in the root of your repo.

## 📈 Lighthouse Audit

| Category        | Score |
|----------------|-------|
| Performance     | 76%   |
| Accessibility   | 96%   |
| Best Practices  | 100%  |
| SEO             | 91%   |

> ⚠️ Note: Chrome extensions affected this run. For more accurate results, re-audit in incognito mode.

## 🧪 Features

- 🔍 Dynamic GitHub repo cards via API
- 🎨 Animated tags, filter buttons, and fade-in effects
- ⚡️ Lighthouse-optimized performance
- 🔐 Secure backend with environment variables
- 📬 Formspree contact form integration

## 📦 Installation

```bash
git clone https://github.com/aswanjay/portfolio.git
cd portfolio
npm install
npm run dev

## 🌐 Live Demo

👉 [View the live site](https://classy-madeleine-5df43f.netlify.app)

---

### 🧠 Optional Enhancements

- Add a **Lighthouse badge** once you run your audit
- Add a **“Built With”** section if you want to highlight tools like GitHub API, Formspree, etc.
- Add a **“Contributing”** section if you plan to open source or invite feedback

---

### ✅ Final Commit Message


## 📈 Deployment Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/5c8f3c4b-5c8f-4b8f-8c8f-5c8f3c4b8c8f/deploy-status)](https://app.netlify.com/sites/classy-madeleine-5df43f/deploys)

## 📦 Installation

```bash
git clone https://github.com/aswanjay/portfolio.git
cd portfolio
npm install
npm run dev

## 🛠️ Built With
- GitHub GraphQL API
- Formspree
- Netlify Functions
- React + Vite

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.y