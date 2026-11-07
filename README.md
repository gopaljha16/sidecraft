# Slidecraft Studio

Premium LinkedIn and Instagram carousel design studio, planned for
https://slidecraft.gopaldev.in.

GitHub remote: https://github.com/gopaljha16/sidecraft.

The existing personal portfolio at https://gopaldev.in is outside this
repository's implementation scope.

## Current state

Phase 1 includes the responsive studio landing page, original carousel cover
compositions, shared navigation, footer, typography, and visual design system.
Full portfolio viewers and the contact integration are planned in later phases.

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
width. EditorConfig provides matching editor defaults. Local notes, generated
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
