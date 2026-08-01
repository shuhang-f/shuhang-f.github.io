# Shuhang Feng — Customer-Facing Product Engineering Portfolio

Static portfolio for Shuhang Feng, live at [shuhang-f.github.io](https://shuhang-f.github.io).

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

## Validation

Run the dependency-free portfolio checks before publishing:

```bash
python -m unittest discover -s tests -p "test_*.py" -v
```

GitHub Actions runs the same checks on every push and pull request.
