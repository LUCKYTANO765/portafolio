# Dorian Flores — Full-Stack Computer Engineer Portfolio

Welcome to my personal portfolio repository. This is a premium, interactive, and fully responsive website showcasing my expertise in building high-performance, real-time, and scalable full-stack web applications.

🔗 **Live Site:** [https://github.com/LUCKYTANO765/portafolio](https://github.com/LUCKYTANO765/portafolio)

---

## 🚀 Key Features

- **Premium UI/UX:** Built with modern CSS design tokens, smooth aurora mesh backdrops, glassmorphism card layouts, and subtle noise grain filters for depth.
- **Dynamic Interactions:**
  - **Spotlight Hover Effects:** Background radial glows on cards that follow mouse coordinates.
  - **Magnetic Buttons:** Interactive call-to-actions that respond dynamically to hover vectors.
  - **Scroll Indicators & Reveals:** Responsive progress bar and animated entrances for components on scroll.
- **Bilingual (Bilingüe):** Full English and Spanish localization toggle, powered dynamically via JavaScript.
- **Performance Optimized:** Uses native JavaScript animations (optimized requestAnimationFrame loops), zero heavy external libraries, and complies with `prefers-reduced-motion` media queries.

---

## 🛠️ Technology Stack & Focus Areas

- **Frontend Development:** React, TypeScript, Zustand, TailwindCSS (for major apps), HTML5 Canvas, modern vanilla CSS.
- **Backend Development:** Go, Node.js (Express), REST APIs, Server-Sent Events (SSE) for live streaming data.
- **Databases & ORMs:** PostgreSQL, Prisma ORM, sqlc (strict SQL compiler for Go).
- **Architecture & DevOps:** Monorepo management (`pnpm`), containerization (`Docker` & `Docker Compose`), E2E testing (`Playwright`), unit testing (`Vitest`), CI/CD workflows (`GitHub Actions`).

---

## 📂 Project Structure

- `index.html` — Main layout, copy structure, and bilingually tagged DOM elements.
- `style.css` — Custom utility tokens, animation keyframes, and theme layouts (Dark/Light).
- `script.js` — Core interactive logics, dynamic project generation, scroll events, translation mapper, and theme switching.
- `resume.pdf` — Professional Curriculum Vitae.

---

## 💻 Local Execution

To run the portfolio locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/LUCKYTANO765/portafolio.git
   cd portafolio
   ```
2. Open `index.html` in your browser, or start a local static server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js (any static server tool)
   npx serve .
   ```
3. Open `http://localhost:8000` (or the served port) in your web browser.

---

## 📄 License

This project is personal intellectual property. Feel free to browse the source code for design pattern inspiration.
