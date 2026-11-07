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
FAQs share the same source data. Email delivery is planned for a later phase;
enquiries are currently labelled as opening soon.

## Styling

Tailwind CSS 4 is integrated through PostCSS. Theme colors and font utilities
reference the studio's shared brand tokens. Pages and interactive components use
responsive utilities; original carousel compositions use component-layer CSS
for their art direction. Source detection is limited to application/components
so local notes and QA files do not generate utility classes.

## Local development

Requires Node.js 20.9 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Checks and formatting

```sh
npm run typecheck
npm run build
npm run format
npm run format:check
```

Prettier handles TypeScript, React, CSS, JSON, and Markdown. The configuration
uses two-space indentation, double quotes, semicolons, and a 100-character print
width. The Tailwind Prettier plugin sorts utility classes automatically.
EditorConfig provides matching editor defaults. Local notes, generated
output, and dependency lockfiles are excluded from formatting.

Fonts are bundled locally through `next/font/local`; the production site does
not fetch fonts from Google. This is a local review build with indexing disabled.
Production deployment and search metadata follow in later phases.

## Commit workflow

1. Implement and verify one phase at a time.
2. Present the exact changes and verification results for review.
3. Ask the owner for confirmation before creating that phase's commit.
4. Keep phase commits separate and descriptive. Do not amend or rewrite approved
   commits without authorization.

Internal implementation plans and progress notes remain local and are excluded
from Git tracking.
