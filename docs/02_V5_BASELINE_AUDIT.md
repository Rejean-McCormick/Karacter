# Baseline audit: Karacter 5.0 versus v6 proposals

**Audited source:** `Karacter_5_0_complet.zip`, specifically `README.md`, `js/data.js`, `js/app.js`, `js/i18n.js`, `docs/wiki/` and `docs/TESTING.md`. This page is descriptive; it does not imply v6 behavior is implemented.

| Feature | Observed v5 baseline | Proposed v6 change |
|---|---|---|
| Delivery | Local HTML, CSS and classic JS; open `index.html` | Preserve zero-build offline use while modularizing internals |
| Language | FR/EN toggle via translation mappings | Key-based first-class i18n and complete new screen coverage |
| Polarities | 8 editable, linked axes; left stored as 0..6, right=6-left | Clarify relative *preference*, show context and never imply missing ability |
| Explorer/Studio | Four axes shown in Explorer; full detail in Studio | Guided workflows without separate character copies |
| Narrative | Six story fields | Add explicit growth milestones and evidence-based simulation use |
| Relationships | Per-character relationship list | Validate references; canonical normalized links and contextual influence |
| Situations | Eight templates, stakes low/medium/high, editable reaction text | Multiple plausible paths and explanation trail; paired comparison |
| Portraits | Portrait/expressions/action separate per theme | Formal image identity, explicit matching/import and rendering contracts |
| Prompt generation | Up to three prioritized visual preferences | Three specialized prompt contracts, identity-lock and scenario action specificity |
| Images | Browser IndexedDB blobs, drag/drop, square image | Metadata + byte integrity, explicit overwrites, portability tests |
| Exports | TXT, JSON, ZIP (with images embedded in JSON) | Versioned v6 schemas, preview, validation, conservative migrations |

## Known issues or limitations to address

- v5's generated scenario suggestions append heuristic sentences and do not deliver several distinctly justified candidate actions.
- Some personality contrasts are not literal opposites (e.g. practicality/imagination). Their semantics must be *preference in a relevant context*.
- The image-generation model is external (prompts copied to ChatGPT/DALL·E). The app should not claim to generate images itself.
- The current full restoration flow replaces the collection after confirmation; v6 should show a detailed import preview and offer a safe backup export first.
- The v5 implementation does not document a stable cross-version schema with formal fixture validation.
- The v5 test report notes the user's file-origin storage and portrait persistence were not end-to-end verified on their machine.

## Explicit non-regression

- King Klown in collection `kOA` and his canonical visual signature must remain importable and editable.
- Distinct saved images for `character × theme × image mode` must never collapse onto a single thumbnail.
- Existing user-written fields must be copied byte-for-byte where possible; translating UI does not translate authored content.
- Each axis remains two linked 0..6 controls, sum 6, neutral midpoint 3/3, no plus/minus scale.
- Continue recognizing legacy TXT sheets from supported prior releases; migration may be approximate and must disclose uncertainty.

Reference document: [migration](technical/03_MIGRATION.md).
