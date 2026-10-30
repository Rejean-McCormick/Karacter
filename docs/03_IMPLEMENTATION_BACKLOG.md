# Implementation backlog — recommended code order

This backlog translates the product specification into small, testable deliveries. **It is not a report of implemented work.**

## Sprint/phase A — Contracts and safe migrations

- A1: Create pure domain constructors/validators from `schemas/` and [domain model](domain/01_DOMAIN_MODEL.md).
- A2: Implement linked axes and invariant tests, including legacy paired6 preservation.
- A3: Implement import preview and atomic migrations from v5 JSON/ZIP/TXT.
- A4: Implement image metadata plus binary hashes and restore smoke test.

**Gate A:** A v5 King Klown ZIP round-trips into v6; its fields and image modes remain intact.

## Phase B — Character understanding

- B1: Studio and Explorer share normalized character fields.
- B2: Narrative core and growth timeline with immutable milestone history.
- B3: Workspace-level relationship records, target validation, delete impact notice.
- B4: Contextual polarity descriptions and custom-axis edit dialogs.

**Gate B:** User can edit King Klown, link Mira, record a narrative choice and still switch themes/languages with no data loss.

## Phase C — Scenario and comparison

- C1: Define scenario engine snapshot, evidence, rule version and candidate schemas.
- C2: Implement at least three distinct candidate paths with meaningful rationales.
- C3: Implement user edit/lock, stale state and safe regeneration.
- C4: Compare two characters under same facts/stakes, export comparison TXT.

**Gate C:** King Klown and Mira yield distinguishable plausible responses with inspectable evidence and no ranking.

## Phase D — Visual workflows

- D1: Refactor prompt builder into identity, theme, mood, action and style stages.
- D2: Implement portrait, four-expression sheet, action mode contracts.
- D3: Preserve separate picture slots with preview, replace confirmation, safe rename.
- D4: Update gallery filtering and prompt batch export.

**Gate D:** Three modes, two themes and two characters create independent image slots; a full backup restores each one byte-for-byte.

## Phase E — UX, localization and release

- E1: Complete Create/Understand/Simulate/Gallery information architecture.
- E2: Migrate dynamic translation replacement to key-based dictionary rendering.
- E3: Complete keyboard, screen-reader, mobile, zoom and quota failure testing.
- E4: Produce release notes, update wiki/README, verify extracted offline build.

**Gate E:** All P0 acceptance tests pass in English and French, with a successful cross-device restore check.

## Branch/PR convention

Each PR links to requirement IDs (e.g. `POL-01`, `SIM-02`), names changed schemas/fixtures, includes regression tests and documents remaining caveats. A feature is not "done" when only the view is visible; its storage and restore behavior must also work.
