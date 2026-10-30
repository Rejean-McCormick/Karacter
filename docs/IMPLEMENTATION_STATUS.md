# Karacter 7.0 — Implementation status

## Implemented in the repository

The following code is present and exercised by automated checks: linked 0–6 polarities, authored character information, 12 templates, custom axes and ordering, context-sensitive candidate reactions, two-character comparisons, canonical story events, later-memory references, explicit belief-growth apply/undo, relationship notes, three prompt modes, themes, crop preview, batch file matching, local gallery, bilingual interface, character TXT, full JSON/ZIP, v5/v6 migration and transactional IndexedDB APIs.

## Verification performed here

- `npm test`: core, engine, migration, old/new TXT, ZIP, SHA-256, transactional storage double, narrative memory and safe batch association.
- `python tests/ui_smoke.py`: isolated Chromium UI, axes, simulations, FR/EN and small viewport.
- `python tests/ui_story.py`: isolated Chromium, accepted story event, later memory, axis ordering, 12 templates and five main views, using **mocked storage**.
- JSON schemas and a representative story-extended workspace validated with a local JSON schema resolver.

## Not yet independently verified

- IndexedDB close/reopen from a genuine localhost or HTTPS origin on a physical machine. The browser automation sandbox blocks local navigation; isolated UI smoke tests use an in-memory or unavailable DB.
- Cross-device restore with real photos and very large ZIP files.
- Screen-reader and physical device keyboard/touch audit.
- Concurrent-tab merge handling: the application is intended for single-tab editing.
- Long-running stress/performance profiling on thousands of story events and large pictures.

## Honest release classification

**Feature-complete local creative release candidate**, not security-audited production software or psychological software. Keep exporting full ZIP backups; avoid treating the browser database as the only copy of your work.
