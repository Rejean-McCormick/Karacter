# Karacter 7.0 — Narrative Studio

Status: **implemented and regression-tested in an isolated browser and Node environment**, not independently certified on physical devices.

## New functionality

- Context-based narrative engine with situation cues (urgency, relationships, unknown), authored values, contradictions and **recent canonical events**.
- Separate **Story** timeline and author-reviewed *Make canon* action with outcome, notes and optional impact on another character.
- Explicit growth applied to the character's limiting belief. The action can be undone if the value has not been manually changed since.
- Character-choice memory in subsequent simulations and action-mode prompts; no automatic changes to the character's 0–6 polarities.
- Enhanced same-scenario comparison with descriptive preference contrasts; no moral or compatibility score.
- Both sides of every axis show possible benefits and possible tradeoffs. Dragging either linked slider still keeps total six.
- Author-controlled axis ordering; twelve modifiable templates; broader character search; manual cleanup of simulation runs unreferenced by comparisons or the story.
- Filename-mapped batch image import (up to 30 files), per-slot approval for replacements, and error reports. Crops centered; individual image crop remains customizable.
- French and English narrative response templates. Author-entered text is never auto-translated.
- New schema definitions for canonical story events and belief-change records under `workspace.extensions`.

## Compatibility

- Export remains **schemaVersion 6** because its top-level format is unchanged. New story data lives under `workspace.extensions` (already allowed by v6). `comparison.extensions` is documented in the updated schema.
- V5 JSON/TXT migration, v6 JSON/ZIP import/export, the exact 0–6 polarity model and the separate image slots are retained.
- No server, online account, LLM API or compilation is required.

## Important limits

- All behavior is **deterministic creative scaffolding**. It is not a clinical assessment or a general-purpose artificial intelligence.
- Recent author-approved events provide context, but Karacter does not simulate arbitrary long causal chains, independent NPC plans or a persistent world-state engine.
- Relationships include authored text and selected story moments, but there is no automatically changing trust score (by design: automatic psychological scoring would imply unsupported precision).
- Character TXT retains the character's own fields, but canonical events belong to the workspace and are exported separately as story TXT or with a full ZIP/JSON backup.
- Native IndexedDB persistence after browser restart, cross-device backup recovery, assistive-technology compatibility and multi-tab conflict safety still require real-device verification.

## Core acceptance cases

1. On any polarity, left 5 implies right 1; neither side is labeled good or bad.
2. An axis can be reordered or edited without losing its value and context.
3. A run produces three different candidate actions, each with evidence and possible tradeoffs.
4. Making a candidate canon stores the chosen action and aftermath, and its memory influences a later run.
5. An ordinary simulation **does not** change the canonical story.
6. Applying an evolution edits only a named, author-approved belief; polarities remain unchanged.
7. A comparison applies identical scenario and stakes to two distinct characters.
8. Renaming and exporting images remains theme/mode-aware; arbitrary filenames are never silently assigned in batch import.
9. JSON/ZIP backups retain story extensions and all portrait bytes with hash verification.
10. English/French controls work in all five application views; author-provided names, text and character voices are not silently translated.

## Future work (outside this release)

- Native IndexedDB and full ZIP restoration tests on real installed browsers and devices.
- Conflict resolution for concurrent edits across tabs/devices.
- Optional actual image-generation API integration with explicit user consent.
- User-defined branching interactive stories, long-term world-state planning and collaborative editing.
- Full screen-reader audit, formal translation review and performance profiling with thousands of events.
