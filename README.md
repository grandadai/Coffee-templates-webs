# Lumina — Cinematic Hero System

A premium, Awwwards-inspired interactive hero built with **React**, **Vite**, **Tailwind CSS**, **GSAP + ScrollTrigger**, **Framer Motion**, and **Lenis**.

This is not a one-off animation. It’s a reusable multi-client stage:

- **Agency theme** — website mockup with floating UI cards, cursors, analytics, and glow orbs
- **Coffee theme** — ceramic cup emerging from the UI with beans, leaves, and soft steam

Swap assets + config to adapt the same motion system for jewelry, footwear, real estate, and more.

## Features

- 7-layer cinematic depth composition
- Mouse parallax with capped rotation and smooth interpolation
- Unique GSAP floating idle animations per object (4s–12s)
- Entrance choreography (~2s) including SplitText-style headline reveal
- Scroll-driven depth (mockup recedes, product stays in focus)
- Soft dynamic shadows, particles, and looping smoke
- Responsive amplitude reduction and effect culling on mobile
- Theme switcher demonstrating client-swappable configurations

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Framer Motion (particles / subtle motion only)
- Lenis smooth scrolling

## Getting started

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/hero/
    Hero.tsx
    FloatingObject.tsx
    HeroProduct.tsx
    WebsiteMockup.tsx
    ParticleLayer.tsx
    SmokeLayer.tsx
    MouseParallax.tsx
    HeroAnimations.tsx
    SplitTextHeading.tsx
  config/themes/
    agency.ts
    coffee.ts
  hooks/
    useLenis.ts
    useMediaQuery.ts
public/assets/
  agency/
  coffee/
```

## Adding a new client theme

1. Drop transparent PNG/SVG assets into `public/assets/<client>/`
2. Create `src/config/themes/<client>.ts` using the `ThemeConfig` type
3. Register it in `src/config/themes/index.ts`
4. Tune float depths, speeds, and scroll multipliers per object

Every floating object supports unique position, depth, speed, rotation, delay, and amplitude — driven by arrays, not hardcoded JSX.
