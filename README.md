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

## Course invitation page

`/courses` is the noindex early-access page. Its copy lives in
`src/content/course.ts`; its presentation lives in `src/pages/courses.astro`.
Keep its displayed price aligned with the app product configuration and Stripe.

The existing API Worker records invitation clicks before redirecting here. The
page resolves the signed `invite` token through `/invitations/resolve`, leaving
manual email entry available on failure and preserving any visitor edits. Joining
passes the email in a URL fragment to the app's `/start` route, which removes
it and sends a verification code automatically. After verification, paid users
enter the app and unpaid users continue directly to Stripe. `/checkout` is only
a recovery screen when sending the code or opening payment fails. Authentication stays on the app
origin. The invite token and campaign parameters survive that handoff.

For local integration, set `PUBLIC_COURSE_APP_URL` and `PUBLIC_COURSE_API_URL`
when starting or building Astro. Production defaults point to the learn app and
its existing API Worker. Neither value is a secret. The production app must have
`/start`, `/continue`, and `/checkout` deployed before sending visitors to the new course page. The app's
old `/courses` links redirect here with their query strings intact.
