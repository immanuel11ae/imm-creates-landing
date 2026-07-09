# AI Rules & Tech Stack Guidelines

This document outlines the technical stack, architectural rules, and library guidelines for the **imm.creates** web application. All AI assistants and developers must adhere to these rules when modifying or extending the codebase.

## Tech Stack

*   **Semantic HTML5**: Structured using modern semantic elements (`<header>`, `<section>`, `<footer>`, `<article>`, `<nav>`) to ensure accessibility and SEO optimization.
*   **Modern CSS3 & Custom Properties**: Styled using a robust CSS variable system (`--paper`, `--panel`, `--ink`, `--amber`, `--teal`, etc.) for consistent theme management, custom animations, and responsive layouts.
*   **Vanilla JavaScript (ES6+)**: Lightweight, high-performance scripting for all core UI interactions (IntersectionObserver for scroll reveals, scrollspy, portfolio filtering, and accordions) without heavy framework overhead.
*   **Three.js (WebGL)**: Interactive 3D ambient wave background utilizing custom vertex and fragment shaders for high-performance GPU rendering.
*   **Google Fonts**: Typography driven by *Space Grotesk* (headings), *Inter* (body text), and *JetBrains Mono* (technical labels and codes).
*   **Third-Party Embeds**: Integration with the Instagram Embed SDK for interactive social proof and live content showcases.

---

## Library & Implementation Rules

### 1. UI & Interaction Library Rules
*   **Rule**: **Do not introduce heavy JS frameworks** (such as React, Vue, or jQuery) unless explicitly requested by the user. All interactive components (accordions, tabs, filters, scrollspy) must be written in clean, modular Vanilla JavaScript.
*   **Rule**: Use the native `IntersectionObserver` API for scroll-driven animations and scrollspy features to maximize performance.

### 2. 3D & Graphics Rules
*   **Rule**: Use **Three.js** (currently loaded via CDN) for WebGL-based visual effects.
*   **Rule**: Always implement a graceful fallback. If WebGL is unsupported or if the user has `prefers-reduced-motion` enabled, the application must fall back to CSS-based ambient blobs or static backgrounds.
*   **Rule**: Keep custom shaders optimized and documented.

### 3. Styling & Design System Rules
*   **Rule**: **Do not introduce utility frameworks** like Tailwind CSS or Bootstrap. All styles must be written in the central stylesheet using the established CSS custom properties (variables) to maintain the unique "filmstrip/sprocket" aesthetic.
*   **Rule**: Always respect user accessibility preferences by wrapping animations and Three.js loops in `@media (prefers-reduced-motion: reduce)` checks.

### 4. Icons & Media Rules
*   **Rule**: Use inline SVGs for icons to minimize HTTP requests and ensure crisp rendering at any resolution.
*   **Rule**: Portfolio videos must use the `<video>` tag with `muted`, `loop`, `playsinline`, and `preload="metadata"` attributes, triggered to play on hover via lightweight JS event listeners.