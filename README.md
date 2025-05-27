# Noughts & Crosses

**[Demo](https://noughts-and-crosses-atj.pages.dev/)**

Noughts & crosses built with React and Tailwind, deployed to Cloudflare Pages via a manually triggered [GitHub Actions workflow](.github/workflows/deploy.yml).

- Custom grid size, from 3x3 to 7x7
- Dark and light modes (starts with device preference via [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme))
- Animated win-line that respects [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- Keyboard and screen-reader friendly (with room for improvement)
- Rudimentary PWA support
