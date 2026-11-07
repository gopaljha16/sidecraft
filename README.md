# Slidecraft Studio

Premium LinkedIn and Instagram carousel design studio, planned for
https://slidecraft.gopaldev.in.

Implementation workspace: `D:\creativePortfolio`.
GitHub remote: https://github.com/gopaljha16/sidecraft.

The existing personal portfolio at https://gopaldev.in is outside this
repository's implementation scope.

## Build specification

See [the supplied implementation plan](slidecraft-subdomain-complete-implementation-plan.md)
for page requirements, design tokens, deliverables, and phase acceptance gates.
See [implementation status](docs/implementation-status.md) for evidence and open decisions.

## Current state

This repository currently contains the specification and project preparation only.
The starter ZIP referenced in the specification was not present at the initial audit.
There is no application to install or run yet.

## Commit workflow

1. Implement and verify one phase at a time.
2. Present the exact changes and verification results for review.
3. Ask the owner for confirmation before creating that phase's commit.
4. Keep phase commits separate and descriptive. Do not amend or rewrite approved
   commits without authorization.

The initial push error (`src refspec main does not match any`) occurs because
the repository has no commits. After the first approved commit, push with
`git push -u origin main` to create the remote branch and upstream tracking.
