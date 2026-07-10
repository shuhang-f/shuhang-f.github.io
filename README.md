# Sean Feng — Portfolio

Static portfolio for Sean Feng, live at [shuhang-f.github.io](https://shuhang-f.github.io).

The site positions Sean around technical operations, AI product delivery, infrastructure, QA, and user-engineering feedback loops. It includes verified experience, selected projects, a downloadable resume, and a purpose-built social preview card.

## Stack

Vanilla HTML, CSS, and JavaScript. No frameworks, no build step. Deployed via GitHub Pages.

## Structure

```
index.html        # single-page portfolio
css/style.css     # responsive visual system
js/main.js        # navigation and progressive reveal behavior
images/profile.jpg
images/og.png     # social preview card
resume.pdf        # downloadable current resume
favicon.ico
```

## Local dev

Use any static file server:

```bash
npx serve .
```

There is no compile step. Changes pushed to `main` are published by GitHub Pages.
