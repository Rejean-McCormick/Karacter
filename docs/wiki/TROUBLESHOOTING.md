# Troubleshooting

## I still see the old 1–7 scale

You may be opening an old HTML file. Open **`index.html` from Karacter 4.5**, not `karacter_v4.html` or another old copy. Each current axis has **two linked 0–6 sliders** that sum to six.

## FR / EN does not appear

Check that the complete project was extracted, including `js/i18n.js`, and that `index.html` is the new version. Try reloading the page.

## Styles or interface elements are missing

Preserve the directory tree. `index.html` must be able to load `css/main.css`, `js/data.js`, `js/app.js`, `js/i18n.js` and `assets/logo.svg`.

## My characters disappeared after moving the folder

Local browser storage may be associated with the `file://` path or a web origin. Open the older installation, export **Backup ZIP**, and import it into the new copy. Moving files alone does not move all browser data.

## My portrait is missing

Verify both the **character** and the active **visual theme**. Each theme has its own image. Keep each uploaded image below **30 MB**. Some browsers may restrict local image storage.

## My TXT does not contain portraits

This is expected: TXT contains the character profile and portrait references, not the image. Export **JSON** or **Backup ZIP** to preserve portraits.

## My image prompt does not update

If you edited the prompt manually, the app protects your edits. Select **Regenerate** to rebuild it using the current character settings.

## The project has no direct image generation

This is intentional. Copy the prompt to ChatGPT, save the resulting image on your device, and import it into Karacter.

[Wiki home](HOME.md) · [Backups and imports](BACKUPS_AND_IMPORTS.md)
