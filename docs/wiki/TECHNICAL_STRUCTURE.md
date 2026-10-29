# Technical structure

Karacter 4.5 is a **local web app** that needs no build process, external packages or mandatory web server.

```text
index.html        Main HTML and interface structure
css/main.css      Responsive styling
js/data.js        Themes, styles, axes, archetypes, scenarios, sample characters
js/app.js         Rendering, character editing, portraits, prompts, import/export
js/i18n.js        French / English UI translations and toggle state
assets/logo.svg   User-provided logo
fiches/           Example importable TXT sheets
portraits/        Optional manual image filing
sauvegardes/      Optional manual backup filing
docs/wiki/        English wiki
```

## Script loading

`index.html` loads the reference data (`js/data.js`), application logic (`js/app.js`) and interface translations (`js/i18n.js`) in that order. The language switch works locally, without a translation API or network connection.

## Storage and formats

- **`localStorage`**: character data and supported interface preferences.
- **`IndexedDB`**: imported portrait image blobs.
- **TXT**: editable character sheets, using stable field labels and machine-readable sections.
- **JSON**: complete collection and embedded image data.
- **ZIP**: JSON backup plus convenient TXT copies.

A local HTML app cannot silently write exports to arbitrary project folders; browser downloads are saved to the browser's chosen destination.

## Customization

- Change colors/layout in `css/main.css`.
- Change archetype templates or polarity defaults in `js/data.js`.
- Change application behavior and backups in `js/app.js`.
- Update French-to-English interface translations in `js/i18n.js`.

Preserve a ZIP backup before changing stored data structures and test imports from older releases afterward.

[Wiki home](HOME.md)
