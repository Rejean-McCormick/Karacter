# Navigation, feature layout and screen specifications

## Main navigation

**Create | Understand | Simulate | Gallery** (top-level conceptual structure). A persistent character picker/collection filter is available except during a focused full-screen export/import confirmation.

- **Create:** identity, archetype, visual signature, character sheet, art themes, image prompts.
- **Understand:** polarity editor, emotions, values, contradiction, relationship list and growth timeline.
- **Simulate:** scenario library, stakes, character reactions, comparison.
- **Gallery:** portrait/expression/action images, filters, upload and download.

Explorer and Studio are **depth controls**, not separate accounts or datasets. Explorer displays minimal language and optional extra content collapsed; Studio exposes detailed fields, relation editing and simulation evidence.

## Screen A — Workspace/character library

- Search by character name, archetype, collection; stable selection even with duplicate names.
- Create, duplicate, import, export, delete with confirmations.
- Show missing-image placeholder; no pressure to upload a portrait to proceed.
- Empty state contains a short guided creation call to action.

## Screen B — Character editor

- Identity card: name, role, collection, keywords, optional lore.
- Polarity cards: two sliders, both numbers, context, benefit/tradeoff disclosure, Customize, Undo.
- Emotional palette; inner-world and narrative fields; relationships/milestones in Studio.
- Autosave state is honest: Saved / Saving / Save failed / Storage limited.

## Screen C — Scenario lab

- Character selector, scenario selector, factual context, stakes and target relationship (optional).
- Generate 3 candidate response cards; each has feeling, interpretation, action, need, tension and "Why this might happen" expandable trace.
- Candidate actions: Edit, Lock, Copy, Save as author's choice, Regenerate alternatives.
- Clearly distinguish authored fields from simulated text.

## Screen D — Comparison lab

- A/B character selectors (different IDs), one shared scenario and stakes selector.
- Two equal columns desktop; stacked A/B on mobile with shared header.
- Never rank, color-code moral scores or show numerical "compatibility".
- Export standalone comparison text.

## Screen E — Prompt and gallery

- Theme, visual style, image mode, 1:1 preview, external prompt text and Copy/Export.
- Drop zone with explicit `character + theme + mode` target.
- Preview crop, confirm replacement, download renamed copy.
- Gallery filters: collection, theme, mode; no hidden destructive actions.

## Screen F — Import/export center

- Explains difference among TXT, JSON, full ZIP; shows what includes portraits.
- Backup now CTA is always accessible.
- Import preview: source format/version, character counts, collisions, image count, missing links and migration notes. Confirm destructive replace.
- Restore result screen: totals, warnings, and quick links to verification.

## Cross-screen behavior

- Language toggle does not reset current screen, character, scenario, score or unsaved prompt edit.
- Changing visual theme never modifies character story or relationships.
- Switching Explorer ↔ Studio hides/reveals sections without changing the stored model.
- Browser back/forward behavior is consistent; if using file:// without client routing, maintain screen state in app without requiring server paths.

See [design system](02_DESIGN_SYSTEM.md) and [requirements](../product/02_REQUIREMENTS.md).
