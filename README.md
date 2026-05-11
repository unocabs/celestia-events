# Celestia Events & Celebration

Premium one-page website with Sanity CMS editing support.

## Local Development

```bash
npm install
npm run dev
```

Open the site at the Vite local URL, usually `http://127.0.0.1:5173/`.

## Content Editing With Sanity

The public site uses Sanity when these environment variables are present:

```bash
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-05-11
```

Without those values, the site uses the fallback content in `src/siteContent.ts`.

Editors can open:

```text
/studio
```

The Studio includes editable content types for:

- Site settings and contact details
- Hero copy and hero images
- Event types
- Services / offers
- Featured packages
- Gallery images
- Section headings and supporting copy

## Vercel Setup

1. Create or connect a Sanity project.
2. Add the environment variables from `.env.example` in Vercel.
3. Add the deployed site domain to Sanity CORS origins.
4. Deploy the Vercel project.
5. Visit `/studio` on the deployed site and log in with a Sanity user.

The `vercel.json` rewrite keeps both the one-page site and `/studio` working on refresh.

## Build

```bash
npm run build
```
