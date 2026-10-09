# Design QA — Santhosh S. Portfolio

## Source visual truth

The four supplied PDFs contain screenshots of the reference site, not portfolio content or instructions. Rendered source captures used for this review:

- Homepage: `/private/tmp/user-pdf-3-1.png` (1200 × 928 px)
- About: `/private/tmp/user-pdf-2-1.png` (1200 × 928 px)
- Works: `/private/tmp/user-pdf-1-1.png` (1200 × 928 px)
- Contact: `/private/tmp/user-pdf-0-1.png` (1200 × 928 px)

## Rendered implementation

- Preview URL: `http://127.0.0.1:3000/`
- Other reviewed routes: `/about`, `/works`, `/works/kriti-herbals`, `/contact`
- Browser: selected Codex in-app browser
- Captured page viewport: 909 × 942 CSS px; device pixel ratio 2
- Screenshot export: the selected-browser capture was visible in the review session, but the CUA screenshot API did not expose a filesystem export path.

## Comparison state and evidence

- Theme: light, except for a separate dark-theme interaction check.
- State: page top, menu closed; desktop screenshots. The source PDF screenshots are 1200 × 928 px and the selected browser capture is 909 × 942 CSS px, so the full-page captures are not pixel-aligned and were compared by visible page regions rather than as a normalized side-by-side image.
- Full-view regions reviewed: homepage collage, oversized wordmark and role list; works title and featured project; about title and photo panel; contact title and split form; project detail title, visual, and outcome column.
- Focused regions reviewed: menu overlay, project filters, contact required-field and invalid-email states, theme toggle, and project story split.
- Desktop interaction checks: menu opens; Event filter reduces four cards to two; contact form reports empty and malformed email errors; theme toggle switches to the ink palette. Mail draft was not opened.
- Browser console: no application errors observed after the fresh dev-server restart. Older console warnings belong to the reference site capture. The local dev-server startup warning about `scroll-behavior` was fixed with the Next.js `data-scroll-behavior` attribute.

## Comparison history

1. The first project-detail preview showed stale output from the old dev-server session after the production build ran. Restarted the server, opened the route again, and verified the current split layout, project facts, outcome, and replaceable-content note.
2. The refreshed desktop pages follow the reference’s high-level structure: oversized editorial titles, asymmetrical image and copy panels, thin dividers, project-led work layouts, slide controls, large menu overlay, and a split contact form. The supplied cream, ink, and crimson palette is applied throughout.

## Findings

- [P2] Mobile comparison remains unverified. The selected in-app browser's exposed Playwright wrapper does not provide `setViewportSize`, and no Playwright connection to that selected tab is exposed. The user approved a 390 × 844 capture, but the available browser API cannot set it. The stylesheet includes mobile breakpoints; the rendered 390 × 844 behavior still needs a browser capture.
- [P2] Exact same-viewport comparison remains unavailable. Source screenshots are 1200 × 928 px; the selected browser viewport is 909 × 942 CSS px at DPR 2. This prevents a normalized, same-size comparison of the full views.

## Follow-up

Capture the source and implementation at matching desktop dimensions and the implementation at 390 × 844 using a Playwright connection that targets the selected in-app browser. Recheck mobile overflow, title overlap, menu, carousel controls, and contact fields at that size.

## final result: blocked
