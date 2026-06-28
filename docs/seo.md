# Search Engine Optimization (SEO)

00 implements a production-grade SEO architecture designed to maximize organic discoverability and social sharing fidelity.

## Next.js Metadata API

We utilize the Next.js App Router Metadata API natively.

### Root Layout (`src/app/layout.tsx`)
The root layout defines the baseline metadata for the entire application.

- **Title Template**: Uses a template (`%s | 00`) so child pages only need to define their specific title.
- **OpenGraph & Twitter Cards**: Pre-configured with summary large images, ensuring links shared on Discord, Twitter, and Slack render beautifully.
- **Viewport Config**: Defines theme colors for both light and dark system preferences, ensuring browser UI matches our aesthetic.

### Dynamic Pages
For dynamic routes (e.g., `/blog/[slug]`), we export a `generateMetadata` function to fetch the relevant data and inject tailored SEO tags.

## Crawling & Indexing

- **`sitemap.ts`**: Dynamically generates an XML sitemap at build time. As new routes are added, ensure they are appended to the return array in this file.
- **`robots.ts`**: Configures crawler access, specifically preventing indexing of internal API routes (`/api/`) or Next.js build assets (`/_next/`).

## Semantic HTML

SEO is heavily reliant on accessibility and document structure.
- **Headings**: Ensure a strict heading hierarchy (`<h1>` down to `<h6>`). The `Hero` section always contains the singular `<h1>` for the page.
- **Images**: All `<Image>` or `<img>` tags must have descriptive `alt` tags. Decorative images should have `alt=""`.

## Web Manifest
A `manifest.webmanifest` file is located in the `public/` directory, allowing 00 to be installed as a Progressive Web App (PWA) with correct theming and standalone display modes.
