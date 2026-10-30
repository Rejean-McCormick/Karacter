# Canonical domain model

This page names the objects implemented by Karacter 6. JSON details are defined in [`schemas/`](../schemas/) and [storage contracts](../technical/02_DATA_AND_STORAGE.md). These are **proposed v6 data structures**.

## Entities and ownership

| Entity | Ownership | Stable identifier | Key data |
|---|---|---|---|
| Workspace | user-local | `workspaceId` | locale, view settings, theme selection, collections |
| Character | workspace | `character.id` | identity, story, polarities, emotions, visual signature |
| PolarityAxis | character | `axis.id` | `left`, `right`, `leftScore`; `rightScore` derived |
| Relationship | workspace | `relationship.id` | source ID, target ID, type, narrative details |
| Scenario | workspace/library | `scenario.id` | neutral context, stakes, participant/target roles |
| SimulationRun | workspace | `run.id` | inputs snapshot, engine version, 3+ candidates, annotations |
| Comparison | workspace | `comparison.id` | Character A ID, B ID, shared scenario, independent runs |
| Milestone | character | `milestone.id` | time/order, event, change in behavior/belief |
| VisualTheme | workspace/reference | `theme.id` | text description and art-direction constraints |
| ImageAsset | workspace | `asset.id` | character/theme/mode binding + blob reference/metadata |
| Collection | workspace | `collection.id` | name, optional description, references to members |

## Identity rules

- IDs MUST be opaque stable IDs (UUID recommended). Display names MUST NOT be primary keys.
- A character is independent of its images: image absence is valid.
- A character has zero or more polarities. New characters start with eight suggested axes; Explorer only *shows* four.
- A scenario is independent of a character: the same `scenarioId` and facts MUST be reusable in comparison.
- A relationship references **two character IDs**. Its type is a narrative label, not proof of reciprocal trust.
- A milestone is an event record; it does not overwrite past records.
- Image identity: `characterId + themeId + modeId` uniquely identifies an active slot; historical image versions MAY be supported later.
- A workspace can store a character name more than once; picker UI must show collection or an ID suffix.

## Character canonical fields

- Identity: `id`, `name`, `collectionId`, `role`, `archetypeId?`, `keywords[]`.
- Story: `motivation`, `values[]`, `fear`, `habitualReaction`, plus `narrative` with desire/need/belief/contradiction/turningPoint/growth.
- Personality: `polarities[]`, optional `notes`, emotions list with context (emotion ≠ trait).
- Art direction: `visualSignature` containing identity-locked descriptors and optional variable descriptors.
- Continuity: milestone IDs, canonical state version, `createdAt`, `updatedAt`.

## Source of truth versus derived values

**Persist:** `leftScore`, custom labels, narrative text, relationships, scenario definitions, chosen/edited simulation responses, asset metadata.

**Derive:** `rightScore = 6 - leftScore`, dominant side, intensity description, rendered prompt, comparison layout, localized labels. Never persist two independently editable scores that can drift out of sync.

## Deletion and referential integrity

1. Deleting a character requires confirmation and warns about linked relationships, stored images and saved comparisons.
2. Default behavior: delete associated relationships and image bindings only after explicit confirmation; saved historical comparisons retain sanitized character snapshots so past work remains readable, but flag missing live character.
3. Imports with dangling references must not silently bind relationships to similarly named characters. Report unresolved references and allow skip/remap.
4. Deleting a scenario should not erase saved simulation evidence; preserve scenario snapshot in run record.

## Derived or user-owned content

A simulation candidate is **derived and editable**. A manually saved candidate becomes **user-owned content**. The simulator can offer an updated proposal but MUST preserve the user's existing text and clearly separate it from generated suggestions.

## Time and localization

- Store machine timestamps as ISO-8601 UTC; display local date/time with the chosen locale.
- Use canonical language-neutral IDs and keys for emotions, relationship types, axis templates and modes.
- Do not translate proper names, character notes or user-authored story text automatically.

## Future-compatible extensibility

Unknown fields in import files must be preserved in an `extensions` object when safe and namespaced, or reported with an explicit choice. Do not silently drop user creative data. Unknown enum values must either map to a custom value or be flagged for review.
