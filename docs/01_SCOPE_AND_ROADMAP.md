# Scope, delivery plan and non-goals

**This is the proposed implementation contract for Karacter 6.0, not a claim of completed functionality.**

## P0 — required in 6.0

| ID | Feature | Definition of delivery |
|---|---|---|
| P0-01 | Stable v6 records and migration | v5 backup import, deterministic schema validation, no data loss |
| P0-02 | Linked polarities with explicit context | 0–6 + 0–6 = 6, editable poles, situation-specific interpretation, visual cues |
| P0-03 | Narrative core | Desire, need, fear, belief, contradiction, turning point and growth remain editable |
| P0-04 | Scenario engine | Minimum three possible, distinct response paths per scene, evidence, stakes and overrides |
| P0-05 | Two-character comparison | Same scenario and stakes, side-by-side outputs; never a winner or ranking |
| P0-06 | Relationship support | Valid targets, context-specific links; no orphan IDs on deletion/import |
| P0-07 | Growth timeline | Baseline + milestone records; explicit user edits only |
| P0-08 | Visual workflow | Three modes, theme preservation, one image slot per character/theme/mode |
| P0-09 | Portable backups | TXT per character; full JSON and ZIP with all picture bytes; safe import preview |
| P0-10 | Bilingual accessible UI | All product chrome FR/EN; accessible slider pairs and comparison controls |
| P0-11 | Explorer/Studio | Same underlying data; progressive disclosure; no destructive mode transitions |
| P0-12 | Offline baseline | No account and no external API needed; local persistence + readable error states |

## P1 — deliver if P0 is stable

- Batch image import with an **explicit** character/theme/mode matching review; never guess and silently overwrite.
- Editable user-defined scenario templates in the scenario library.
- Relationship graph visualization (list/editor is P0; graph is P1).
- Multi-select character maintenance, duplicate collection, advanced search and sort.
- Guided educational discussion prompts and printable comparison worksheets.
- Optional Markdown/CSV summary exports (not an authoritative import format).

## P2 — deliberately deferred

- Cloud accounts, collaboration, automatic sync or public character feeds.
- Direct image model APIs and automated image generation from Karacter.
- Chatbot role-play conversations, unbounded AI-generated story worlds or clinical assessments.
- Automatic autonomous personality evolution, "compatibility score" or winner/loser rankings.
- Marketplace, payments, RPG stat systems, native mobile applications.

## Suggested build sequence

1. **Foundation:** freeze schema, migrations, persistence interfaces, i18n keys and tests.
2. **Model:** polarity semantics, story model, relationship references and growth events.
3. **Simulation:** context builder, deterministic alternatives, explanations and user overrides.
4. **Comparison:** two-character, one-situation side-by-side display and export.
5. **Visuals:** three specialized prompts, theme-aware image slots, gallery improvements.
6. **Reliability:** export/import/restore testing, accessibility, security and recovery.

## Release gates

Karacter 6 can be marked released only if every P0 acceptance case in [QA](quality/02_ACCEPTANCE_CASES.md) passes, migration from actual v5 fixture works, a backup round trip preserves portrait bytes and user edits, and FR/EN keyboard workflows are verified.

## Dependencies and risks

- Moving `index.html` under `file://` can change storage scope. Backup-first migration is mandatory.
- The v5 runtime is a classic-script offline HTML app. Re-architecture must not require a development server for end users unless the decision register is amended.
- Large base64 images can overwhelm JSON. Implement size limits and file-space checks; do not assume unlimited browser storage.
- Simulation rules may become formulaic. Test variation, avoid deterministic moral judgments, and allow alternative paths.
