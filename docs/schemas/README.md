# Proposed v6 schemas — not current v5 exports

These Draft 2020-12 JSON Schemas define the **target Karacter 6** normalized documents. Each JSON file is a standalone schema **except for explicit relative references** (`$ref`) to sibling schemas. Resolve them from this directory or register `$id` URLs with a local resolver; no network request is required.

- `character.schema.json`: identity, paired axes, emotional palette, inner world, narrative, milestones.
- `polarity.schema.json`: stores **leftScore only** (0..6); right score is always derived as 6-leftScore.
- `relationship.schema.json`: stable reference IDs for links.
- `scenario.schema.json`, `simulation-run.schema.json`, `reaction-candidate.schema.json`: scenario inputs and saved proposals.
- `workspace.schema.json`, `image-asset.schema.json`, `backup.schema.json`: complete exported document and assets.

## Cross-entity validation beyond JSON Schema

JSON Schema cannot by itself enforce several application rules:

1. Character, relationship, scenario, asset and collection IDs are unique in workspace.
2. Every referenced ID points to an existing record, or is explicitly noted as a frozen historical reference.
3. At most one active image asset per `(characterId, themeId, mode)` slot.
4. `manifest.characterCount` and `manifest.imageCount` equal actual counts.
5. `sha256` and `byteLength` match actual bytes (if assets present).
6. Each simulation run stores at least one candidate per required path; its evidence paths resolve or are explicitly marked inference.
7. The comparison references different characters and one identical scenario/stakes pair.
8. A single character must not have duplicate axis IDs.
9. A built-in axis label can be changed by the author without changing its stable ID.

These MUST be checked in dedicated runtime validators and tests. `format: date-time` similarly requires a format-aware validator.

## Example fixtures

- `../examples/king-klown.v6.json`: valid character record.
- `../examples/mira.v6.json`: contrasting character.
- `../examples/example-backup.v6.json`: minimal valid backup **with no image bytes**.
- `../examples/comparison-king-klown-mira.json`: illustrative narrative choices, **not a saved simulation-run JSON** and not a claim of implemented simulation.

Do not use these schemas as a reason to silently discard unknown fields when migrating older user documents. See `../technical/03_MIGRATION.md`.
