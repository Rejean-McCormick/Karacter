# TXT sheets, backups and imports

## Choose an export

| Command | File | Includes portraits? | Purpose |
|---|---|---|---|
| **TXT sheet** | One editable `.txt` character sheet | No | Review, edit and re-import one character |
| **TXT sheets** | ZIP with one TXT per character | No | Organize character records separately |
| **TXT prompts** | A batch of image prompts | No | Generate portraits elsewhere |
| **JSON** | Full collection and image backup | Yes | Restore or transfer everything |
| **Backup ZIP** | Full JSON plus TXT sheets and prompts | Yes, within the JSON | Archive the complete project data |

The `fiches/`, `portraits/` and `sauvegardes/` folders are **manual organization folders**. Browser downloads are not placed there automatically.

## Export a TXT sheet

Open **Studio**, select a character, and choose **TXT sheet**. The file is human-readable and can be edited in a text editor, then re-imported. Preserve the section markers if you need to re-import it. TXT references portraits but does **not** contain image bytes.

## Restore a complete backup

1. Export a backup of the current collection first.
2. Click **Import** and select a Karacter **Backup ZIP** or complete **JSON** file.
3. Confirm the replacement of the current collection.
4. Check your characters, paired polarities and gallery portraits.

**Warning:** A complete backup import **replaces the current collection**.

## Import TXT sheets

Select one or several Karacter TXT files with **Import**. A matching character ID can be updated while keeping existing image references. Unknown IDs create new characters. Older TXT sheets are recognized and their scale values are converted approximately where applicable; review those polarities afterward.

## Portability

TXT/JSON field names are kept stable for compatibility and are not automatically translated when switching between FR and EN. Keep external backups because local browser data may be erased or lost after moving the project.

[Wiki home](HOME.md) · [Troubleshooting](TROUBLESHOOTING.md)
