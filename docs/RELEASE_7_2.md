# Karacter 7.2 — Canon narrative expansion

This release augments the existing 7.1 application with 20 more source-indexed narrative profiles: 17 characters featured in individual Mythos stories, plus Elias, Gabriel Lajoie and Réjean McCormick. These appear in a separate *King Klown · Canon narratives* collection.

## Source of truth

The original `king-clown-canon.zip` repository is authoritative for this expansion. Its `CANON/` files govern conclusions, while the individual files in `CORPUS/mythos-gods/` are source-specific narratives. The original source files are **not** bundled into Karacter because the supplied canon repository does not establish a public redistribution licence.

This pack preserves references to source paths and clearly labels interpretive fields. A character's narrative portrayal is never treated as a verified fact about mythological or religious traditions.

## What was built

- 20 new source-indexed profiles, with 8 linked 0–6 polarity pairs, motivations, fears, contradictions, possible growth, visual direction and identity information.
- 19 new source-indexed relations: 17 short Mythos encounters with the public King Klown persona, plus Réjean's continuity links to Colin Row and King Klown.
- Non-destructive, repeatable **Import King Klown Canon** button for existing local collections.
- All new profiles included in the first-install character seed.
- 20 standalone `fiches/canon/*.txt` sheets, plus complete machine-readable pack in `data/`.
- Source-specific interpretations separated from established claims on the Create view and in documentation.

## Exclusions and limits

- The large provisional manuscript `CORPUS/asile/asile_v2_source.md` and the source PDF `CORPUS/konvergence/` have **not** been exhaustively extracted into individual character profiles. The 20 new profiles are not a claim that every named entity in the source repository has been found.
- Arjun is named as part of a Colin Row chapter, but available governing summaries do not establish enough individuality for a robust profile. He is tracked as a candidate for later source review rather than inventing his biography.
- Aïda Éloïse already has a profile from the earlier Kristal MEDIA pack and was not duplicated.
- There are no image portraits in the delivered Canon pack.
- The new source additions use English descriptions to match existing character data. The existing French/English interface toggle continues working; user-written fields are not auto-translated.
- Persistence after a browser restart still requires real-device verification, as in earlier local-first releases.

## Verification

- `npm test` passes core, storage, narrative, old Kristal, and new Canon pack tests.
- All 20 new character objects and 19 relation objects validate against the current JSON Schemas.
- Assembled default seed validates through `KCore.validate` (40 total characters, 38 relationships, three collections).
- Re-import detects all 20 existing profiles and adds zero duplicates.
