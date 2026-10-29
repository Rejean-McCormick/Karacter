# Karacter 5.0 — Character Studio (FR / EN)

Karacter is an offline-first character design studio focused on **balanced personality polarities**, narrative conflict, relationships, emotional scenarios and consistent visual prompts.

## Quick start

1. Extract the project ZIP, keeping all folders together.
2. Open `index.html` in a modern browser. No server or build step is required.
3. Switch between **FR** and **EN** in the header.
4. Select **King Klown** or create a new character.
5. Export a **Backup ZIP** periodically; browser storage is not a permanent substitute for your own files.

## New in 5.0

- **Narrative core:** goals, hidden needs, limiting beliefs, internal contradictions, turning points and potential growth.
- **Relationships:** link any two characters with an editable relationship and an explanatory note.
- **Contextual reactions:** select everyday scenarios and change stakes between low, medium and high. Suggestions are creative hypotheses, not psychological predictions.
- **Image modes:** square portrait, four-expression sheet, or character-in-action, with a **separate image slot for each mode and theme** (the original portrait is not overwritten).
- **Better prompts:** prioritize recognizable design features and up to three dominant personality preferences, rather than flooding image generation with every score.
- **TXT / JSON / ZIP:** export stories and relationships along with existing character information. A full ZIP/JSON also carries portraits.

## Structure

```text
index.html
css/main.css
js/data.js
js/app.js
js/i18n.js
assets/logo.svg
fiches/
portraits/
sauvegardes/
docs/
```

## Migration

Export a complete ZIP from Karacter 4.5 first, then import it in Karacter 5.0. The new fields appear blank on old characters, while existing polarities, scenes and image references remain. A saved image is physically stored in browser IndexedDB; a full backup is safest when moving folders or computers.

## Limitations

Karacter does **not** generate the picture itself; it prepares prompts for ChatGPT/DALL·E and accepts dropped images. Text exports contain no picture bytes. The personality axes are fictional creative choices, not diagnostic measures or independent abilities. The two values on each axis always add up to six.
