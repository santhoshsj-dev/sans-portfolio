# Santhosh S. Portfolio

Portfolio site built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis, and Swiper.

## Run locally

```bash
npm install
npm run dev
```

The development server uses Turbopack. `npm run build` uses Webpack because Turbopack’s CSS worker cannot bind a local port in the current restricted build environment; the site’s CSS and route output were verified with the Webpack production build.

## Update portfolio content

- Edit project descriptions, services, metrics, and metadata in `lib/projects.ts`.
- Replace the abstract project artwork in `public/projects/` with approved project images, then update the `src` mapping in `components/project-art.tsx` if filenames change.
- Update contact and social links in `components/contact-form.tsx`, `components/site-footer.tsx`, and `app/contact/page.tsx` when preferred profile URLs are available.
- Palette tokens are defined at the top of `app/globals.css`.
