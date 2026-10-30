## 7.0.0 — Narrative Studio

- Canonical story timeline, context-sensitive reactions, author-approved growth, axis ordering, templates, batch images, bilingual narrative suggestions.
- Backward-compatible v6 backup envelope with documented story extensions.
- See [RELEASE_7_0.md](RELEASE_7_0.md).

# Documentation changelog

## 6.0 specification draft — 2026-10-29

- Established Create / Understand / Simulate product positioning.
- Preserved user-confirmed paired 0..6 polarity design, with explicit context-based semantics.
- Specified three-path explainable simulations and two-character comparisons.
- Added narrative growth timeline and workspace-level relationship design.
- Defined image prompt modes, theme identity lock and independent asset slots.
- Drafted versioned v6 schemas and JSON fixtures, TXT import rules, and v5 migration requirements.
- Added bilingual UX, accessibility, security and release acceptance tests.

**This changelog is for the documentation specification, not proof that version 6 software has been coded or released.**


## 2026-10-29 — Karacter 6 code baseline

- Added modular browser application under `/src`, with index.html launcher.
- Implemented first-pass Create, Understand, Simulate and Gallery workflows.
- Added linked axes, character fixtures, TXT/JSON/ZIP backups, v5 migration and deterministic simulations.
- Added implementation status and regression tests; open work listed in `IMPLEMENTATION_STATUS.md`.

## 2026-10-30 — Karacter 6.2 Stability

- Unified workspace and portrait metadata/bytes into transactional IndexedDB operations.
- Migrated 6.1 localStorage workspaces safely on first 6.2 launch.
- Added coalesced saves, visible non-resetting error status and retry.
- Extended transactional storage tests, updated release notes and implementation status.
