# Spacious Clarity Marketing

Static Astro landing page for `spaciousclarity.com`, designed to deploy as a Cloudflare Workers static-assets site.

## Stack

- Astro 6
- Hand-authored CSS with local variable fonts (Literata + Host Grotesk via `@fontsource-variable`)
- `@paper-design/shaders` halftone effect over the hero image
- Cloudflare Workers Static Assets via Wrangler
- GitHub Actions for validation plus manual production deploys

## Prerequisites

- Node `22.12.0` or newer
- pnpm
- A Cloudflare account with the target domain added to your zone

The repo includes `.nvmrc` so local Node version managers can switch automatically.

## Scripts

| Command               | Purpose                                                |
| :-------------------- | :----------------------------------------------------- |
| `pnpm dev`            | Start the Astro dev server                             |
| `pnpm check`          | Run Astro's project checks                             |
| `pnpm build`          | Build the static site into `dist/`                     |
| `pnpm preview`        | Preview the production build locally                   |
| `pnpm validate`       | Run checks and build together                          |
| `pnpm deploy:dry-run` | Build and validate the Cloudflare deploy configuration |
| `pnpm deploy`         | Build and deploy to Cloudflare Workers                 |

## Local development

```sh
nvm use
pnpm install
pnpm dev
```

## Manual-first Cloudflare deployment

1. Authenticate Wrangler:

   ```sh
   pnpm dlx wrangler login
   ```

2. Build and deploy the site:

   ```sh
   pnpm deploy
   ```

3. Confirm the generated `*.workers.dev` URL looks correct before attaching the production domain.

4. In Cloudflare:
   - Add `spaciousclarity.com` to your account if it is not already present.
   - Point the registrar nameservers to Cloudflare.
   - Open the deployed Worker and attach `spaciousclarity.com` as a custom domain.
   - Add `www.spaciousclarity.com` as a redirect to the apex domain.

## GitHub pipeline

- `.github/workflows/validate.yml` runs `pnpm validate` on pushes to `main` and on pull requests.
- `.github/workflows/deploy.yml` is manual-only and deploys to Cloudflare with Wrangler.
- Add these repository secrets before using the deploy workflow:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

## Notes

- The production domain lives in two places: `astro.config.mjs` (`site`) and `src/content/site.ts` (`url`/`email`). Keep them aligned if it ever changes.
- The social card ships as `public/og-card.png` (most platforms won't render SVG `og:image`). `public/og-card.svg` is the editable source; `scripts/og-card.html` regenerates the PNG:

  ```sh
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
    --allow-file-access-from-files --hide-scrollbars --window-size=1200,630 \
    --screenshot=public/og-card.png "file://$PWD/scripts/og-card.html"
  ```

- `docs/kit-form-reference.html` is the reference markup for the Kit waitlist form; the live forms render through `src/components/WaitlistForm.astro`.
