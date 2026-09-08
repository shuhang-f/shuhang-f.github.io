# Shuhang Feng Portfolio

Personal portfolio for Shuhang Feng, a product engineer who builds and supports AI, fintech, and data products.

Live at [shuhang-f.github.io](https://shuhang-f.github.io).

## Site structure

- Project-first homepage led by the Trading Workspace, TFT Damage Lab, and OpenClaw at Home
- Three detailed case files covering a trading workspace, production reliability, and a self-hosted AI assistant
- Compact career timeline, personal context, and direct contact links
- AI product principles, a reflection on explicit delegation, and original demo artwork
- A small gallery of Blender experiments with responsive, optimized images
- Static output, responsive layout, keyboard navigation, and reduced-motion support
- Site-specific metadata and social preview card

## Stack

- Astro
- TypeScript
- Plain CSS
- GitHub Pages via GitHub Actions

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run build
```

The build performs Astro type and content checks before generating the static site. Pushes to `main` publish the generated site to GitHub Pages.

## Content sources

The public résumé is synced to the latest FDE résumé in the career bank. Portfolio copy is maintained separately in `src/data/site.ts` so the site can tell a broader, project-led story while keeping claim boundaries explicit.
