# Karacter 7.0 — Character Psychology Studio

**Create. Understand. Simulate. Remember. Evolve. Visualize.**

Karacter is an **offline-first, bilingual (English / French)** studio for original fictional characters. It combines personality polarities, a narrative core, relationship context, multiple possible reactions, an author-approved story timeline, and consistent visual prompts. It is a **creative tool, not a diagnostic or predictive psychology system**.

## Start

Open `index.html` in a modern browser. The application has **no npm packages to install and no build step**. For browsers that restrict storage under `file://`, serve the folder on a consistent local origin:

```bash
python -m http.server 8080
# open http://localhost:8080
```

Use the **same host, port and browser profile** when upgrading to keep access to previously stored data. **Export a full ZIP backup before upgrading.** The ZIP can be imported into this release; the on-disk backup format remains **Karacter schema v6** for compatibility.

## Core experience

1. **Create:** Name characters, organize collections, start from twelve optional archetypes, give them an identity and a visual signature.
2. **Understand:** Explore eight neutral pairs of **linked 0–6 preference scales**, customize both poles, reorder axes, and see when either preference can help or complicate a situation. A 5/1 score means *habitual preference*, never ability, goodness or worth.
3. **Simulate:** In a given situation, choose the stakes and optionally a relationship. The local, explainable rule engine suggests **three distinct possibilities**, with evidence. Results are hypotheses; they are never auto-adopted as character facts.
4. **Story:** **Make canon** only the reaction the author chooses; specify the consequence and affected relationship, edit or remove the event later. Subsequent simulations consider recent accepted events. Apply growth to a character's limiting belief **explicitly**, with an undo guard; axes never change automatically.
5. **Compare:** Simulate two characters under the same conditions without scores, ranking or psychological labels.
6. **Visualize:** Make square image prompts for portraits, four-expression sheets or action scenes, in multiple themes; drop images into per-character/per-theme/per-mode slots. Crop interactively or bulk-import files with exact filenames.
7. **Save:** Export editable character TXT, a story TXT, complete JSON or ZIP (including image bytes + SHA-256); import previous v5/v6 backups and supported old TXT sheets. Character TXT **does not contain portrait bytes or the shared story timeline**; use the full backup to preserve everything.

## Image workflow

Karacter **does not call image-generation APIs**. Copy a prompt into ChatGPT or an image service, generate a square picture, and import the result. The gallery handles thumbnails, cropping, naming and downloading. For **batch import**, use this precise naming convention (the app shows compatible filenames on export):

```
karacter_<character-slug>_<theme-id-slug>_<portrait|expressions|action>.png
```

Batch import matches names against existing characters and themes only. Unknown or ambiguous filenames are skipped and reported; replacing an existing image requires approval. Batch images are **center-cropped**. Use the single-image importer for custom pan/zoom cropping.

## Data safety

- IndexedDB contains sheets, runs, relationships, story events, and portrait bytes on one local origin.
- Image metadata and image bytes are stored transactionally; a failed delete or restore should abort as a unit.
- Ordinary edits are debounced; a failed save displays **NOT SAVED / NON ENREGISTRÉ** and a retry control.
- **The browser's storage is not a backup.** Save a full ZIP regularly, particularly before updates or clearing site data.
- The simulation history can grow. **Clean unused history** explicitly, and export a ZIP first. Runs referenced by comparisons or canonical events are kept.
- This is a single-user local application. Simultaneous edits across multiple tabs or machines are not conflict-resolved.

## Repository layout

```text
index.html             App entrypoint
src/app.js             UI and workflows
src/core.js            Data model, validation and migration
src/engine.js          Deterministic reaction and image-prompt engine
src/narrative.js       Context, author-approved story memory and evolution
src/presets.js         Twelve optional personality starting points
src/batch.js           Unambiguous filename-based image import mapping
src/storage.js         IndexedDB and full backups
src/txt.js             Character TXT compatibility
src/i18n.js            UI labels (FR/EN)
src/seed.js            King Klown and Mira examples
src/styles.css         Responsive interface
assets/                Logo
schemas/               See docs/schemas/
docs/                  Complete product specs, JSON schemas and release notes
tests/                 Regression and isolated UI checks
```

## Checks

```bash
npm test                    # Node-only tests; no npm install required
python tests/ui_smoke.py    # Optional Playwright + Chromium
python tests/ui_story.py    # Optional isolated UI/story integration
```

The isolated browser checks **do not certify native IndexedDB persistence**: the test environment blocks navigation to a local server. The built-in IndexedDB transaction tests use a test double. Before treating this as production-ready on your computer, verify close/reopen persistence and full ZIP restore in a real browser.

## Principles

- No pole is intrinsically a strength or weakness.
- A personality preference does not fix a character's behavior.
- A simulation suggests paths; **only the author chooses the story's facts**.
- Text and images remain locally owned, portable and usable without subscriptions.
- The author may modify or reject any suggestion.

Read [the release specification](docs/RELEASE_7_0.md), [implementation status](docs/IMPLEMENTATION_STATUS.md), and the [original v6 product documentation](docs/README.md).


## Kristal King Klown universe pack (7.1)

This distribution includes **19 source-aware character design profiles** and **18 relationships** based on the supplied Kristal MEDIA 4.2.0 archive. Fresh installations receive them as example profiles; existing users can use **Import Kristal universe** from the sidebar without overwriting existing character fields or portrait images.

The source archive contained **no portrait images**. Most personality scores and visual suggestions are imaginative proposals, explicitly identified as such, and must not be mistaken for Kristal canon. Read [the universe evidence policy](docs/universe/README.md) and [the character index](docs/universe/CHARACTER_INDEX.md).

## King Clown Canon extension — v7.2

Added 20 individual profiles based on the newly provided King Clown Canon sources, including seventeen mythic source figures, Réjean McCormick, Elias and Gabriel Lajoie. New installs include them; existing collections can use **Import King Klown Canon** without overwriting saved profiles. The Canon and Kristal MEDIA imports remain separate. Read `docs/universe/KING_CLOWN_CANON_CATALOGUE.md` for evidence and creative-vs-canon boundaries.
