# Visual identity, themes and image gallery

## Separation of identity and presentation

Character fields are canonical and theme-neutral. A theme can reinterpret a character as an alien, mythological creature, woman or hockey player while preserving the authored personality, story, relationships and recognizable design anchors.

- **Identity lock:** name (unless deliberately hidden), silhouette cues, distinctive palette, signature accessories, recurring symbols and stated artistic do-not-change constraints.
- **Theme transformation:** species, costume context, environment and material properties.
- **Expression/pose:** chosen per image mode and scenario; may vary without rewriting character psychology.

A theme containing a new gender/species/profession is a visual reinterpretation, not an inference about the character's real-world identity or personality.

## Built-in themes

- `original`: no forced transformation.
- `alien`: original extraterrestrial anatomy; retain identifiable palette/motifs.
- `women`: characters portrayed as women; do not apply stereotyped personality assumptions.
- `mythology`: creative mythological forms, with cultural specificity only when explicitly requested and respectfully described.
- `hockey`: fictional players with appropriate equipment and no real team logos by default.
- `custom`: free-text, user-defined shared visual universe with a stable ID.

Themes SHOULD be portable and shareable as reference definitions. Changing a theme does not delete older portraits.

## Three image modes

1. `portrait`: one character, square 1:1, visual clarity, coherent signature.
2. `expressions`: **four** readable emotional expressions of the **same character** in one square, with consistent outfit/features and no change in identity; not four different characters.
3. `action`: square illustration of one character doing something relevant to a selected scenario; scene details from documented events, not invented biography.

These modes have **independent image slots** per theme.

## Asset workflow

- Drop or select image file; display a preview and target slot before committing.
- Validate MIME/actual decode, pixel dimensions, size limit and acceptable content type.
- Preserve original metadata minimally; normalize image to square thumbnail for display and a full-resolution retained square as appropriate.
- If crop is necessary, show preview and allow user to adjust focal area (P0). Do not silently remove significant visual content.
- If an asset already exists at that key, ask whether to replace or cancel; keep previous image until new blob is safely persisted.
- Download a new file named `karacter_<character-slug>_<theme-slug>_<mode>.png`, with collision-safe suffix when needed; original file on disk remains unchanged.
- Image errors, unsupported formats and storage quota issues must not lose prior assets.

## Gallery

Filter by collection, theme and image mode. Every tile shows the character name, collection, image mode, optional last-updated date and missing-image placeholder. Users can select, replace, download or remove an image from its exact slot.

P1 batch import maps every file to a character/theme/mode with review. **Never match by filename silently**, and never silently replace artwork.

## Visual quality

- User-selected art style is a rendering directive, not a personality trait.
- Keep accessible contrast and meaningful alt text for imported imagery.
- Do not claim the app generated the image; it prepares external image-model prompts and accepts imported results.
- King Klown visual reference: teal `#1e6864`, black/silver hair, cosmic coat, shifting constellations, hypnotic eyes, not a generic circus clown. See [example](../examples/king-klown.v6.json).
