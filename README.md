# 🌐 Koustav.dev | Advanced 3D Interactive Portfolio

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

Welcome to the source code of my personal portfolio. This is not just a static website; it is an interactive, highly-optimized frontend system built to showcase advanced UI/UX engineering, physics-based animations, and complex client-side logic.

🔗 **Live Deployment:** [Insert Your GitHub Pages URL Here]

---

## 🚀 The Mainframe (Key Features)

### 🤖 HexaBot v3.0 (Local AI Assistant)
A custom-built, fully draggable, client-side AI chatbot that answers questions about my experience, projects, and skills. 
* **NLP-Light Scoring Algorithm:** Understands intent by scoring input strings, gracefully handling typos and complex sentences.
* **Typewriter Engine:** Simulates real-time AI response generation with a realistic "Processing..." delay.
* **Zero-Latency:** Runs entirely in browser memory without relying on external APIs.
* **Draggable Physics:** Framer Motion enables users to grab the terminal header and move the bot anywhere on the screen.

### 📊 2.5D Holographic GitHub Pipeline
A complete, cyberpunk-themed overhaul of the standard GitHub contribution graph.
* **True Parallax Tilt:** Uses `useSpring` and `useTransform` to track mouse velocity and physically tilt the glass panel in 3D space.
* **Opposing Grid Physics:** Background grid moves inversely to the mouse, tricking the brain into seeing deep 3D space without WebGL overhead.
* **Mobile Optimized:** Includes smooth horizontal scrolling buttons for smaller devices.
* **Hacker Glitch Text:** Custom React component that continuously deciphers header text.

### 💻 Automated Multi-Language Terminal
An infinite-looping code terminal in the About section that simulates real-time typing. It seamlessly rotates through 15+ complex architectural snippets across Java, React, Spring Boot, and SQL, complete with a custom regex-based syntax highlighter.

### 🌓 Cyber-Curtain Theme Toggle
A seamless, lag-free Dark/Light mode switcher pinned securely to the UI.
* Bypasses the standard "ugly color flash" by deploying a full-screen, animated SVG curtain (`SYSTEM_REBOOT`) to hide the CSS variable swap.
* Spring-animated sliding knob mechanism.

### ⚡ 60FPS Mobile Optimization
The entire UI is built with hardware acceleration (`transform-gpu`). Complex effects like `mix-blend-difference` have been stripped from mobile views to guarantee buttery smooth scrolling and instant menu interactions on all devices.

---

## 🛠️ Tech Stack Arsenal

* **Core Framework:** React 18, Vite
* **Styling Engine:** Tailwind CSS (v3)
* **Animation Physics:** Framer Motion
* **Routing:** React Router DOM (HashRouter for GitHub Pages compatibility)
* **Icons:** React Icons
* **Data Visualization:** React GitHub Calendar

---

## ⚙️ Local Installation & Boot Sequence

Want to run this system locally? Follow the boot sequence below:

**1. Clone the repository:**
```bash
git clone [https://github.com/Koustav2303/koustavpan-portfolio.git](https://github.com/Koustav2303/koustavpan-portfolio.git)