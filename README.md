# Santhosh S. Portfolio

Portfolio site built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis, and Swiper.

## Run locally

```bash
npm install
npm run dev
```

The site content and project records are maintained in `content/portfolio-defaults.json`. Images are stored under `public/` and referenced from that content file. Page layouts, typography, themes, navigation, and interactions remain in the application code.

The development server uses Turbopack. `npm run build` uses Webpack because Turbopack’s CSS worker cannot bind a local port in the current restricted build environment.
