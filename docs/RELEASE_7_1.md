# Karacter 7.1 — Kristal MEDIA Character Library

**Status:** local application extension, not a modification of Kristal canon.

## Added

- **19 character-design profiles**: King Klown, his continuity modes, named supporting characters and clearly labeled unnamed figures.
- **18 source-aware relationship links**, with identity continuity distinguished from independent-character relationships.
- A browsable source/proposal section in the **Create** screen, showing evidence summaries, author-created interpretations, source status and traceable event/claim IDs.
- A **Kristal universe import** action that merges profiles into an existing local workspace without replacing user-authored text or images and without duplicating existing profiles.
- Full character details: complementary 0–6 polarity preferences (eight axes), emotions, motivation, fear, values, reaction, narrative needs, limiting beliefs, contradiction, turning point, potential growth, visual anchors and exclusions.
- Character-specific editable TXT sheets, a machine-readable data pack, evidence reference index and 19 prose development files.
- Automatic inclusion of the pack for **new workspaces**. Pre-existing workspaces require an explicit click on the import button.

## Epistemic restrictions

- **Source-supported** is not the same as **governing canon**. SOURCE_EXPLICIT_NON_GOVERNING scenes retain their status. Creative text and all 0–6 scores are labeled **proposals**.
- King Klown / Colin Row / Ninja Arc-en-ciel / Primordial Principle are separate *design cards for manifestations of one identity continuity*, not independent people. `L’Auteur (Hello World)` is a specific metafictional character.
- Aïda Mansour and Aïda Éloïse stay separate. Aïda Éloïse's characterization is mostly imagined because her profile in this source is sparse.
- Unnamed roles are not assigned unsupported names, nations or ethnic imagery.
- The civil identity of the creator is neither read nor displayed.
- No images were embedded in the source archive; the portrait fields contain only creative text instructions for future generated images.

## How to install

1. Back up your existing Karacter workspace using ZIP/JSON.
2. Replace the app files with this repository, preserving a copy of your old installation.
3. Run from a stable local origin, e.g. `python -m http.server 8080`.
4. A fresh workspace starts with the 19 Kristal profiles and the unrelated Mira demonstration character. For existing workspaces, click **Import Kristal universe** in the sidebar.
5. Explore the new collection **King Klown · Kristal MEDIA**. Open a profile to see source evidence and creative content separately.

## Quality checks

`npm test` now includes the new pack validation (unique identities, 0–6 invariants, relationships, TXT imports, evidence refs, idempotent merge). Isolated Chromium smoke test: `python tests/ui_kristal.py`. These checks do **not** certify persistence of native IndexedDB after browser shutdown.

## Follow-up not claimed as complete

- No portraits or music downloads are bundled; they were absent from the supplied archive.
- No automatic synchronization back into the separate Kristal source project.
- Proposals are not promoted to canon. A future editorial approval tool could allow the creator to accept individual design choices explicitly.
- The source archive also contains works, events and non-person entities; they are indexed for traceability but not presented as personality profiles.
