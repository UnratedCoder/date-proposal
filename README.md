# 💖 Romantic Date Proposal Wizard 💌

A next-generation, highly interactive, and beautiful storytelling web application designed to propose to a special someone. Built with **Next.js 16**, **Tailwind CSS v4**, and **Framer Motion**, the application leads the recipient through an immersive series of memories, custom interactions, and planners, culminating in a digital invitation.

---

## 🌟 Interactive Journey & Features

1. **Envelope Overlay Intro:**
   - Visitors land on a dark-mode ambient screen presenting a sealed crimson letter. Tapping the pulsing golden wax seal unfolds the letter and starts the romantic soundtrack.

2. **Vinyl Record Music Player:**
   - A floating, rotating vinyl player appears in the top corner once the letter opens. It plays a romantic soundtrack (automatically starting from the 22-second vocal mark) and can be toggled on/off.

3. **Background Scrapbook Collage:**
   - Wide desktop viewports feature a floating polaroid collage on the sides of the screen. The collages display high-quality romantic photography served locally (sunset walks, red roses, candlelight dinners, and starry sky balloon details) that sway and float with micro-animations.

4. **Wizard Steps:**
   * **Step 1: Memory Lane** – Draggable Polaroid polaroids showing illustrations of shared moments. The cards can be dragged, tossed, and stacked dynamically.
   * **Step 2: Why I Love You (Sequential Carousel)** – A slide deck of reasons. Features a **3-second active reading timer** per card paired with a filling love progress bar. Moving to the next slide or dot is locked until she reads the current slide, preventing forwarding/skipping.
   * **Step 3: Tactile Scratch-to-Reveal Card** – A pink glittery heart overlay on an HTML5 canvas. Tapping/dragging scratches off the surface to reveal a handwritten cursive love note underneath. Confetti triggers once 22% is cleared.
   * **Step 4: The Proposal (Dodger Button)** – The core proposal question. The "No" button playfully escapes the cursor or touch gesture by teleporting around the screen, leaving "Yes" as the only choice!
   * **Step 5: Cozy Calendar Picker** – A custom calendar layout for June 2026. The selected date receives a glowing pink heart frame, and today's date stands out with a dashed glow indicator.
   * **Step 6: Sunset/Moon Time Picker** – Sun, moon, and stargazing time slots styled as atmospheric selection cards.
   * **Step 7: Craving Selector** – A grid of craving food emoji cards with customized status message replies based on combinations.
   * **Step 8: Pearlescent Ticket Invitation** – A slide-out, gold-embossed ivory boarding pass ticket sitting inside a warm velvet envelope. Features a synchronized side confetti burst on reveal, full WebKit 3D z-depth fixes, and a one-click Google Calendar sync button.

5. **Aesthetics & Responsive Layout:**
   - Engineered to be **100% zero-scroll** on both mobile and desktop screens. It locks layout elements to fit within the viewport height, ensuring a smooth, app-like native feel.
   - Designed using a warm, rich romantic palette of crimson reds, soft blush pinks, and gold accents.

---

## 🛠️ Technology Stack

* **Core Framework:** Next.js 16 (App Router, TypeScript)
* **Styling Engine:** Tailwind CSS v4 (incorporating `@theme` variables, keyframe animations, and custom glassmorphism utilities)
* **Animations:** Framer Motion (for spring transitions, 3D rotations, and wizard steps)
* **Interactive Canvas:** HTML5 Canvas API (for floating background particles and the scratch card game)
* **Icons:** Lucide React

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience the proposal.

### 3. Production Build
To compile the static pages and verify there are no TypeScript or bundling issues, run:
```bash
npm run build
```

---

## 📜 Credits & Patents
* **Made by:** [UnratedCoder](https://github.com/UnratedCoder)
* **License:** Handmade with Love ❤️ All Rights Reserved.
