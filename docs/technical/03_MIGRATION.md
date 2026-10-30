# Migration from Karacter 5 and earlier versions

**Baseline evidence:** v5 `js/app.js` stores workspace under `karacter.state.v8`, images in IndexedDB `karacter.images.v1`, and exports a backup object shaped `{format:'Karacter', version:8, state, images}`. v5 has `state.polarityScale = 'paired6'`, a `characters[]` list, per-character axes and images and narrative fields. Its ZIP contains a JSON backup file plus text sheets/prompts.

## Migration goals

- Preserve all user-authored text exactly where feasible.
- Preserve axis order, IDs, labels and orientation; preserve leftScore and derive rightScore.
- Preserve King Klown's identity/signature and existing portraits across themes/modes.
- Preserve old stories, custom scenarios, relationships and edited responses.
- Convert old fields into explicit v6 objects without fabricating new psychological evidence.
- Make approximate legacy conversions visible and reviewable.

## Import pipeline

1. **Detect:** v6, v5 backup JSON, old TXT (recognizable release markers), or ZIP wrapping one of these.
2. **Parse:** never execute imported content; enforce size/depth limits.
3. **Normalize:** map old character fields and axis arrays into v6 candidate structures.
4. **Migrate:** move v5 story (`story` or equivalent) into `narrative`, `scenes` into `legacyScenarioNotes` or saved authored reactions, and nested relationships into canonical workspace-level relations.
5. **Image mapping:** v5 image slot may use `theme` + `promptMode`. Create asset metadata and preserve bytes; do not collapse modes into portrait.
6. **Validate:** IDs, links, pair-sum invariant, number of images and content hashes.
7. **Preview and confirm:** note any discarded/unknown legacy fields, missing blobs and approximated scale conversion.
8. **Commit atomically:** previous workspace survives import failure; offer fresh full export after import.

## Field mapping principles

| v5 concept | v6 location | Important caveat |
|---|---|---|
| `name`, `collection`, `archetype` | `Character.identity` + `collectionId` | Preserve display text; create stable collection IDs |
| `polarities[].value` | `polarities[].leftScore` | Keep 0..6 orientation; right is derived |
| `motive`, `fear`, `reaction` | `innerWorld` | Do not overwrite narrative fields |
| six story inputs | `narrative` | Map by existing field keys, not localized UI labels |
| nested `relationships` | workspace `relationships[]` | Preserve direction and notes; warn on unresolved targets |
| `scenes` | saved legacy reactions | Preserve manual edits; do not treat all as simulator outputs |
| `images` reference keys + backup blobs | `imageAssets[]` + asset bytes | Preserve by exact character/theme/mode |
| `theme`, `promptMode`, language | workspace UI prefs | None changes character content |

**Important:** The existing code's literal story field names and image key layout must be confirmed against the actual v5 file during implementation. Do not rely solely on this summary when writing the migrator.

## Legacy scales

- `paired6` (v5): left `0..6`, preserved exactly.
- `signed3` (older): historical conversion depends on saved orientation, with documented review.
- `legacy7` (older): historical 1..7 mapping only when format indicates that scale.
- One-sided 1..5 (older): approximate, mark every migrated axis `migrationReviewRequired`; do not infer absent data.
- Format ambiguity: stop and request user confirmation instead of silently guessing.

## Migration tests

- v5 complete backup with King Klown and distinct portrait/expression/action images; verify exact byte hashes after migration and re-export.
- v5 TXT with editable polarity list; verify both scalar edits and embedded JSON.
- Old legacy7/signed3 fixtures; verify orientation and review warnings.
- Duplicate names, missing IDs, orphaned links, corrupt image blobs, malformed ZIP, duplicate ZIP entries and interrupted commit.
- Compare before/after counts, selected character, visual signature, authored narrative and schema version.

## Rollback

Keep user-provided original backup untouched. Never overwrite the file on disk. If v6 workspace fails to migrate, present a recovery path: export current state, inspect import error, restore from original source after fix.
