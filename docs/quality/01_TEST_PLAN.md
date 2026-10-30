# Test strategy and definition of done

## Strategy

Use a **test pyramid** plus manual accessibility and real-browser restore verification:

1. Pure unit tests for polarity math, normalization, prompts, scenario engine and document migration.
2. Schema/contract tests for v6 data, import/export, image bytes and evidence references.
3. Integration tests for storage transactions and independent image modes.
4. End-to-end browser tests in FR and EN from an extracted build, including `file://` where supported.
5. Manual UX/a11y tests with keyboard, screen reader, zoom and small viewport.

## Core invariants

```text
forall axis:
  integer(leftScore) and 0 <= leftScore <= 6
  rightScore == 6 - leftScore
  total == 6

forall character:
  stable opaque id
  narrative is user-owned and never changed by a simulation

forall image:
  identity = characterId / themeId / modeId
  backup roundtrip preserves original bytes and binding

forall comparisons:
  A != B
  same scenario facts and stakes
  no moral ranking/compatibility percentage

forall locale changes:
  authored content and canonical IDs remain identical
```

## Property-based tests

- For each integer `n` from 0 to 6, `setLeft(n)` yields `(n,6-n)` and `setRight(n)` yields `(6-n,n)`.
- Repeated slider operations never drift outside 0..6 or change `axis.id`.
- Serialize → validate → deserialize preserves all user-authored text, including newlines, quotes, unicode and French accents.
- Repeated export/import is idempotent for entities and content hashes, modulo metadata timestamps.
- Two independent image-mode slots can be replaced or deleted without affecting the other.

## UX/a11y matrix

| Scenario | EN | FR | Keyboard | Mobile |
|---|---:|---:|---:|---:|
| Create/edit | ✓ | ✓ | ✓ | ✓ |
| Paired sliders | ✓ | ✓ | ✓ | ✓ |
| Story/growth | ✓ | ✓ | ✓ | ✓ |
| Simulate | ✓ | ✓ | ✓ | ✓ |
| Compare | ✓ | ✓ | ✓ | ✓ |
| Import/export | ✓ | ✓ | ✓ | ✓ |
| Theme/mode/image slots | ✓ | ✓ | ✓ | ✓ |

## Fixture policy

- `examples/king-klown.v6.json` is the reference character.
- `examples/mira.v6.json` is a contrasting character.
- `examples/comparison-king-klown-mira.json` is an **illustrative expected-shape fixture**, not a statistically validated model prediction.
- `examples/example-backup.v6.json` is a **minimal backup with zero image bytes**; image roundtrip tests require generated binary test images and a real v5 backup fixture from the implementation repository.
- Include corrupt-file and orphan-link cases in code tests, not only positive fixtures.

## Definition of done per feature

- Requirements IDs are linked in the PR description.
- Domain unit tests and at least one real-browser flow pass.
- EN/FR translations complete, including aria/error strings.
- Existing character files remain importable or a migration note is added.
- No silent overwrite of user-authored text, images, relationships or scene choices.
- Docs/examples/schema updated when contract changes.

## Release gate

The release owner signs off the P0 matrix in [acceptance cases](02_ACCEPTANCE_CASES.md), cross-device image restore, validation of representative v5 data and warnings for local browser storage. Until then, documentation and code are a **work in progress**.
