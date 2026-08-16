# Shuhang Feng Portfolio

Personal portfolio for Shuhang Feng, a product engineer who builds and supports AI, fintech, and data products.

Live at [shuhang-f.github.io](https://shuhang-f.github.io).

## Site structure

- Recruiter-focused homepage with selected evidence, work, experience, and contact
- Three detailed case files covering a trading workspace, production reliability, and a self-hosted AI assistant
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

The public résumé is intentionally carried forward unchanged. Portfolio copy is maintained separately in `src/data/site.ts` so case-study framing and claim boundaries stay explicit.
