# Slidecraft Studio

Premium LinkedIn and Instagram carousel design studio, planned for
https://slidecraft.gopaldev.in.

GitHub remote: https://github.com/gopaljha16/sidecraft.

The existing personal portfolio at https://gopaldev.in is outside this
repository's implementation scope.

## Current state

The studio includes a responsive landing page, a filterable gallery of six
self-initiated concepts, seven-slide viewers, individual project stories, and a
dedicated carousel-design service page. Pricing, delivery responsibilities, and
FAQs share the same source data. Two original studio guides, canonical metadata,
social preview images, sitemap, robots rules, and truthful structured data are
included. The enquiry form and Resend integration are implemented; live sending
stays disabled until provider configuration and delivery verification are complete.

## Styling

Tailwind CSS 4.3.5 is integrated through PostCSS. Homepage sections, navigation,
footer, pricing, gallery, and project layouts use responsive JSX utilities.

- `app/globals.css`: Tailwind imports, theme tokens, base styles, and shared
  primitives using `@apply`.
- `app/artwork.css`: original scalable carousel artwork.
- `app/motion.css`: decorative transitions and reduced-motion rules.

Framer Motion drives staggered scroll reveals, desktop hero artwork, short route
entrances, spring-based navigation and gallery layouts, category indicators,
approach crossfades, and animated native menu/FAQ disclosures. The shared motion
provider responds to live reduced-motion changes. Floating artwork pauses outside
the viewport and in background tabs; mobile omits continuous motion. Content and
native disclosures remain available without JavaScript.

Source detection is limited to application/components so local notes and QA
files do not generate utility classes. VS Code uses Tailwind CSS language mode,
an explicit stylesheet entry, and custom directive definitions. Install the
recommended Tailwind CSS IntelliSense extension for editor support.

The homepage Approach section has four directly selectable stages with a sticky
desktop preview. Scroll can follow the narrative on desktop; mobile uses the
same buttons without sticky positioning. Motion respects reduced-motion
preferences, and the first preview and all process copy render without JavaScript.

## Local development

Requires Node.js 22.19 or newer and npm. CI uses Node.js 24, matching `.nvmrc`.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Checks and formatting

```sh
npm run typecheck
npm run build
npm test
npm run format
npm run format:check
```

GitHub Actions runs installation, formatting, API tests, build, and typechecking
for pull requests and pushes to `main`. Email delivery stays disabled in CI.

## Lighthouse audits

Run a production build and start it in one terminal. In another terminal:

```sh
npm run audit:lighthouse
```

This checks the homepage, service page, gallery, and first article on mobile and
desktop using Chrome. JSON, HTML, and a timestamped summary are saved under the
ignored `docs/qa/lighthouse/` directory. Localhost results are labelled as local
lab measurements. The default configuration keeps pre-launch indexing disabled;
its SEO score can reflect that intentional restriction.

After deployment, audit the real origin with:

```sh
node scripts/audit-lighthouse.mjs https://slidecraft.gopaldev.in
```

Optionally append one or more supported page paths to repeat only affected
routes. Set `CHROME_PATH` if Chrome cannot be found automatically. Lab reports
do not establish field Core Web Vitals or verify email delivery.

Prettier handles TypeScript, React, CSS, JSON, and Markdown. The configuration
uses two-space indentation, double quotes, semicolons, and a 100-character print
width. The Tailwind Prettier plugin sorts utility classes automatically.
EditorConfig provides matching editor defaults. Local notes, generated
output, and dependency lockfiles are excluded from formatting.

Fonts are bundled locally through `next/font/local`; the production site does
not fetch fonts from Google. Indexing defaults to disabled until a verified
production deployment explicitly enables it. Vercel previews stay noindex.

## Enquiry configuration

Use `.env.example` as the reference for the ignored `.env.local` file and the
hosting project's environment variables. Keep secrets out of Git and chat.

The form requires a real monitored public/receiving address, a verified Resend
sending address, a Cloudflare Turnstile widget for the actual hostname, Upstash
Redis REST credentials, and a random server-only rate-limit secret of at least
32 characters. `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` contain plain email
addresses; the server adds the display name to the sender.

The studio owner must confirm the actual retention period and review the
privacy notice before setting `CONTACT_PRIVACY_REVIEWED=true`. Retention is
managed in the mailbox; this application does not automatically purge email.
Set `CONTACT_ENABLED=true` first on a controlled preview for delivery testing.
Only enable the public production form after verifying arrival in the inbox.
Changing build-time environment values requires a fresh deployment.

For a controlled preview, set `CONTACT_PREVIEW_ORIGIN` to its exact origin.
Preview forms are otherwise disabled on Vercel. The API validates the security
token's hostname/action, then uses atomic Redis limits before asking Resend to
send a plain-text message. Limits are three submissions per normalized sender
and 30 total per one-hour window. No in-memory fallback is used when Redis fails.

The success response means the email provider accepted the message. It is not
proof of inbox delivery. Automated tests mock all external providers and send no
real emails; live delivery remains a separate launch check.

## Production setup

Deploy this repository as a separate Next.js project on hosting that permits
commercial use. Add only `slidecraft.gopaldev.in` and use the exact DNS target
provided for that hosting project. Existing personal-portfolio and mail records
must remain unchanged. No DNS records have been changed by this code.

After HTTPS and functional release checks pass, set `SITE_INDEXING_ENABLED=true`
for production. Vercel uses `VERCEL_ENV`; other hosts also require
`DEPLOYMENT_ENV=production`. The optional `GOOGLE_SITE_VERIFICATION` value adds
the URL-prefix verification tag; account verification and sitemap submission
still happen in Search Console. No analytics script is installed by default.

## Commit workflow

1. Implement and verify one phase at a time.
2. Present the exact changes and verification results for review.
3. Ask the owner for confirmation before creating that phase's commit.
4. Keep phase commits separate and descriptive. Do not amend or rewrite approved
   commits without authorization.

Internal implementation plans and progress notes remain local and are excluded
from Git tracking.
