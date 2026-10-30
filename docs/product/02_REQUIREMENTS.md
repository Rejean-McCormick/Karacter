# Functional requirements and acceptance criteria

Each requirement ID is stable. **P0** requirements block Karacter 6.0 release. See [release scope](../01_SCOPE_AND_ROADMAP.md) and [test cases](../quality/02_ACCEPTANCE_CASES.md).

## Characters and content

- **CHR-01 (P0):** Create, edit, duplicate, delete and search characters with stable IDs. Delete is confirmed; duplicate receives a new ID.
- **CHR-02 (P0):** A character contains identity, collection, traits/polarities, emotional palette, story core and visual signature. Optional fields remain optional.
- **CHR-03 (P0):** Multiple characters may have the same displayed name; identity is based on UUID, not name. UI must disambiguate them.
- **CHR-04 (P0):** Moving a character between collections must not change its relationships, prompts or portrait images.
- **CHR-05 (P0):** Explorer and Studio use the same record; switching never deletes or resets fields.
- **CHR-06 (P1):** Custom archetype presets can be saved without changing existing instances automatically.

## Polarities

- **POL-01 (P0):** Every axis exposes two integer values 0..6 summing to 6; editing either adjusts the other instantly.
- **POL-02 (P0):** 3/3 is the visual and semantic midpoint; no negative/positive signs or right-side implied superiority.
- **POL-03 (P0):** The pair describes preferred emphasis in a *specified context*, not absolute ability or moral worth.
- **POL-04 (P0):** Each axis has editable pole names, applicable contexts, imagery, potential benefits and trade-offs.
- **POL-05 (P0):** Custom axes have stable IDs and are orderable. Invalid/duplicated labels produce warnings, not silent changes.
- **POL-06 (P0):** Theme/mode/prompt changes do not mutate axis scores.
- **POL-07 (P0):** Legacy scores migrate conservatively, without reversing left/right semantics; approximate migrations are flagged.

## Inner world and development

- **NAR-01 (P0):** Store desire, need, values, fear, limiting belief, contradiction, turning point and possible growth separately.
- **NAR-02 (P0):** Timeline milestones can record a new belief, choice, behavioral shift and explanatory note without overwriting baseline axes.
- **NAR-03 (P0):** Users can explicitly apply selected changes to baseline after confirmation; simulation never mutates canonical character records.
- **NAR-04 (P0):** Relationships refer to existing character IDs; show labels, context and trust/tension notes, not pseudo-objective compatibility scores.

## Scenarios and simulation

- **SIM-01 (P0):** Scenarios define neutral factual context, stakes and possible affected relationships.
- **SIM-02 (P0):** Simulation returns at least three distinguishable possibilities per character: habitual, deliberate alternative, counter-intuitive but grounded.
- **SIM-03 (P0):** Each result includes emotion, interpretation, intended action, underlying need, tension and explanatory evidence.
- **SIM-04 (P0):** Explanations refer to actual supplied data and context; do not fabricate character history or diagnose real people.
- **SIM-05 (P0):** User may edit/lock/choose a candidate. Recompute cannot silently overwrite manual edits.
- **SIM-06 (P0):** Given the same saved inputs and rule version, deterministic mode produces identical suggestions.
- **SIM-07 (P0):** Comparison uses a single shared scenario and stakes for two *distinct* characters; no grading, ranking or winner.
- **SIM-08 (P0):** Comparison results can be exported as text and optionally saved without mutating profiles.
- **SIM-09 (P1):** Users can create and edit custom scenario templates with validation.

## Images and prompts

- **VIS-01 (P0):** Three prompt modes: square portrait, four-expression sheet, square action scene.
- **VIS-02 (P0):** Prompt includes stable visual signature and no more than three prioritized, scene-relevant personality cues.
- **VIS-03 (P0):** A theme changes presentation only; character content and relationships remain unchanged.
- **VIS-04 (P0):** Imported portrait is keyed by character ID + theme ID + mode ID; replacement requires explicit confirmation.
- **VIS-05 (P0):** Image crop/export target is 1024×1024 or source-preserving normalized square; user must preview crop if loss of content is possible.
- **VIS-06 (P0):** Original disk filenames are not renamed; downloaded copies use safe deterministic names.
- **VIS-07 (P0):** Prompts can be copied and exported in a batch for a selected collection.
- **VIS-08 (P1):** Bulk image import offers an explicit mapping preview and rejects ambiguous assignments.

## Persistence, i18n, UX and integrity

- **DATA-01 (P0):** Data and backup formats carry a schema version and stable IDs.
- **DATA-02 (P0):** Full backup includes every character and image byte, with image mapping metadata. TXT sheets contain profile data, not binary images.
- **DATA-03 (P0):** Import previews consequences and detects conflicts. Failed imports do not partially replace a collection.
- **DATA-04 (P0):** V5 files remain importable, including characters with King Klown details and multi-mode image slots.
- **DATA-05 (P0):** App uses local browser storage for characters and image blobs, and provides explicit backup/restore.
- **I18N-01 (P0):** FR/EN toggle translates all interface chrome, prompts/help, validation and exported UI labels where applicable; user text stays as written.
- **A11Y-01 (P0):** Full keyboard navigation, explicit labels and accessible 0–6 value announcements.
- **SEC-01 (P0):** User-authored fields render as text, never executable markup. File imports and images are validated and bounded.
- **OPS-01 (P0):** Runs offline from the extracted folder with no build step or mandatory service.

## Evidence required

For each P0 item, implementation PRs must include linked automated tests where practical, a manual reproduction note for browser-only behaviors, FR/EN screenshots when UI changes, a migration note when the schema changes, and updated documentation. No "verified" label without a test result.
