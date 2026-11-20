# Creative Technologist Personal Website

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and pnpm.

## Editing content

แก้ไขข้อความและโปรเจกต์ได้ที่ `src/content/` ดู [คู่มือแก้ไขเนื้อหาและเพิ่มโปรเจกต์](docs/editing-content.md) สำหรับตัวอย่างและคำอธิบายแต่ละช่อง โดยไม่ต้องแก้ component

## Local setup

```bash
pnpm install
cp .env.example .env.development
pnpm dev
```

Fill in `.env.development` before starting the server. Open [localhost:3000](http://localhost:3000). Restart the server after changing environment values.

## Environment files

Keep environment files in the repository root, beside `package.json`.

| File                                               | Purpose                                                                                  |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `.env.example`                                     | Tracked template with no real credentials.                                               |
| `.env`                                             | Shared fallback values for development and production.                                   |
| `.env.development`                                 | Values used by `pnpm dev`; override matching values in `.env`.                           |
| `.env.production`                                  | Values used by `pnpm build` and `pnpm start`.                                            |
| `.env.local`                                       | Local overrides for development and production; overrides the environment-specific file. |
| `.env.development.local` / `.env.production.local` | Highest-priority file overrides for the respective environment.                          |

Existing process environment variables take priority over all files. For development, file precedence is `.env.development.local` → `.env.local` → `.env.development` → `.env`. Production uses the equivalent production files and ignores `.env.development`.

All `.env*` files are ignored by Git except `.env.example`. Keep real credentials out of source code, screenshots, and logs. Only the Turnstile site key is public; never prefix the Resend API key or Turnstile secret with `NEXT_PUBLIC_`.

## Contact form: development testing

The form calls the real Cloudflare Site verify and Resend APIs. There is no local email simulation or `CONTACT_DELIVERY_MODE` setting.

Use the following values in `.env.development`:

```dotenv
# Official Cloudflare test keys; no widget registration required for these keys.
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
TURNSTILE_EXPECTED_HOSTNAME=localhost

# Replace this placeholder with a real Resend API key.
RESEND_API_KEY=re_replace_with_your_api_key
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
CONTACT_TO_EMAIL=delivered@resend.dev
```

Cloudflare's public test keys work on localhost. Siteverify may return a synthetic hostname and omit the action; the endpoint accepts its `metadata.result_with_testing_key` marker only with an official dummy secret in development. Failed verification is still rejected. See [Cloudflare testing](https://developers.cloudflare.com/turnstile/troubleshooting/testing/).

Create a key at [Resend API Keys](https://resend.com/api-keys), choose **Sending access**, and copy the full key value into `RESEND_API_KEY`. Test recipients still require a valid API key. `onboarding@resend.dev` is Resend's test sender; if using a key restricted to your own domain, use a sender on that verified domain instead. See [Resend sending permissions](https://resend.com/changelog/new-api-key-permissions).

`delivered@resend.dev` simulates a delivery event through Resend without delivering to your personal inbox. You can also use `bounced@resend.dev` or `complained@resend.dev` to test other events. Test emails count toward the sending quota. The form reports API acceptance; delivery events are visible in Resend's dashboard or webhooks. See [Resend testing](https://resend.com/docs/dashboard/emails/send-test-emails).

## Contact form: production

Configure the same variables in your hosting provider or an ignored `.env.production` file:

- Use real Turnstile site and secret keys from a managed widget configured for your production domain. Dummy secrets are rejected outside development.
- Set `TURNSTILE_EXPECTED_HOSTNAME` to the exact hostname, such as `icegotcha.me`, without `https://`, a port, or a path. This check is optional, but useful for limiting accepted tokens.
- Set `RESEND_API_KEY` to a valid sending key and `CONTACT_FROM_EMAIL` to an address on a domain verified in Resend.
- Set `CONTACT_TO_EMAIL` to the inbox that should receive messages. The visitor's email becomes `reply_to`, not the sender.

Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` before building; Next.js embeds it in the browser bundle. Rebuild when changing it in production.

```bash
pnpm build
pnpm start
```

The hosting environment must support Next.js server routes for `/api/contact`.

## Deploying to Vercel

Import `icegotcha/icegotcha-dot-me` as a new Vercel project. Use these project settings:

| Setting          | Value                            |
| ---------------- | -------------------------------- |
| Framework preset | Next.js (detected automatically) |
| Root directory   | Repository root                  |
| Install command  | `pnpm install --frozen-lockfile` |
| Build command    | `pnpm build`                     |
| Node.js version  | 24.x                             |

`vercel.json` is not required because Vercel's Next.js preset supports the App Router and the
`/api/contact` route directly.

Add these values in the Vercel project's **Settings → Environment Variables**:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `TURNSTILE_EXPECTED_HOSTNAME`
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

Use production Turnstile keys whose widget allows the deployed hostname, and use a Resend sender
on a verified domain. Select Production for the production values. If preview deployments need the
contact form, configure suitable Preview values too; set `TURNSTILE_EXPECTED_HOSTNAME` only for an
environment whose hostname is fixed. Do not add dummy development keys or real credentials to
`.env.example`.

Because the Turnstile site key is prefixed with `NEXT_PUBLIC_`, Vercel embeds it during the build.
Redeploy after changing it. After the first deployment, attach the production domain and verify that
it matches the hostname configured in Turnstile and `TURNSTILE_EXPECTED_HOSTNAME`.

To link this checkout locally after installing the Vercel CLI, run:

```bash
pnpm dlx vercel@latest link
```

Vercel creates `.vercel/` for local project metadata; it is intentionally ignored by Git.

## Checks and Storybook

```bash
pnpm typecheck
pnpm format:check
pnpm storybook
pnpm build-storybook
```

Run `pnpm lint` to check the repository or `pnpm lint:fix` to apply automatic fixes. Project conventions are documented in [AGENTS.md](AGENTS.md).

## Continuous integration

[GitHub Actions](.github/workflows/ci.yml) runs on pull requests, pushes to `main`, and manual dispatch. It uses Node 24 and pnpm 10.15.0 with frozen lockfile installation and dependency caching.

- **Quality**: TypeScript, ESLint, Prettier, Node unit tests, and mocked contact API tests.
- **Storybook**: static build and browser component tests using Google Chrome.

No contact credentials are required; API tests mock external providers. CI does not deploy or send email. Superseded runs on the same branch are cancelled.

Run the test suites locally with `pnpm test:unit`, `pnpm test:api`, and `pnpm test:storybook`. For an installed Chromium browser, set `CHROMIUM_PATH=/usr/bin/chromium` (or its actual executable path). CI installs Chrome with the Playwright CLI from the locked dependency tree.
