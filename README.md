# Spacious Clarity Marketing

Static Astro landing page for `spaceiousclarity.com`, designed to deploy as a Cloudflare Workers static-assets site.

## Stack

- Astro 6
- Hand-authored CSS with local variable fonts
- Cloudflare Workers Static Assets via Wrangler
- GitHub Actions for validation plus manual production deploys

## Prerequisites

- Node `22.12.0` or newer
- npm
- A Cloudflare account with the target domain added to your zone

The repo includes `.nvmrc` so local Node version managers can switch automatically.

## Scripts

| Command | Purpose |
| :------ | :------ |
| `npm run dev` | Start the Astro dev server |
| `npm run check` | Run Astro's project checks |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run validate` | Run checks and build together |
| `npm run deploy:dry-run` | Build and validate the Cloudflare deploy configuration |
| `npm run deploy` | Build and deploy to Cloudflare Workers |

## Local development

```sh
nvm use
npm install
npm run dev
```

## Manual-first Cloudflare deployment

1. Authenticate Wrangler:

   ```sh
   npx wrangler login
   ```

2. Build and deploy the site:

   ```sh
   npm run deploy
   ```

3. Confirm the generated `*.workers.dev` URL looks correct before attaching the production domain.

4. In Cloudflare:
   - Add `spaceiousclarity.com` to your account if it is not already present.
   - Point the registrar nameservers to Cloudflare.
   - Open the deployed Worker and attach `spaceiousclarity.com` as a custom domain.
   - Add `www.spaceiousclarity.com` as a redirect to the apex domain.

## GitHub pipeline

- `.github/workflows/validate.yml` runs `npm run validate` on pushes to `main` and on pull requests.
- `.github/workflows/deploy.yml` is manual-only and deploys to Cloudflare with Wrangler.
- Add these repository secrets before using the deploy workflow:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

## Notes

- V1 intentionally uses a direct email CTA instead of an embedded signup form.
- If the production domain spelling changes later, update both `astro.config.mjs` and `src/content/site.ts`.
