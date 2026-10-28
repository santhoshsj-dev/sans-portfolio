# Santhosh S. Portfolio

Portfolio site built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis, Swiper, and Sanity.

## Run locally

```bash
npm install
npm run dev
```

The development server uses Turbopack. `npm run build` uses Webpack because Turbopack’s CSS worker cannot bind a local port in the current restricted build environment.

## Set up the hosted Sanity CMS

1. Create a Sanity account and project at [sanity.io/manage](https://www.sanity.io/manage). Use a public `production` dataset for public portfolio content.
2. Copy `.env.example` to `.env.local`, then set `NEXT_PUBLIC_SANITY_PROJECT_ID` to the project ID. Keep `SANITY_REVALIDATE_SECRET` private and set a random secret of at least 32 characters.
3. Sign in to the Sanity CLI with `npx sanity login`, then publish the Studio to the hosted `*.sanity.studio` domain with `npm run sanity:deploy`.
4. Create a Sanity API token with dataset write permission, set it as `SANITY_API_WRITE_TOKEN` in `.env.local`, and run `npm run sanity:seed` once. The script uploads the current editable media and creates the initial page settings and project documents.
5. In Sanity Manage, create a webhook targeting `https://YOUR-SITE-DOMAIN/api/sanity/revalidate`, with POST, create/update/delete events, a filter for `_type in ["project", "siteContent"]`, projection `{_type}`, and the same webhook secret.
6. Set the public project ID and dataset, plus `SANITY_REVALIDATE_SECRET`, in the production host’s environment variables and deploy the site.

The Studio contains editable project details, covers and galleries, homepage copy and services, About content and experience entries, Works showreel and category filters, Contact labels and imagery, and shared email/social/footer content. The layout, typography, theme, navigation, and form behavior remain in the application. Use `published` in the project listing group to show or hide a project without deleting it.

`SANITY_API_WRITE_TOKEN` is only used by the local seed script. It is never read by the public site. The API uses published documents only; drafts remain private to the Studio.

## Content fallback

When `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset, the site uses `content/portfolio-defaults.json`. This keeps local development and the production build usable before a Sanity project has been connected.
