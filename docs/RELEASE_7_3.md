# Karacter 7.3 — Built-in Universes (EN)

## Decision
The character catalogue is part of the application, not an optional import workflow. Two previous buttons for importing built-in character packs have been removed. A single import button handles standardized user-provided TXT/JSON/ZIP files.

## Behavior
- Fresh local workspaces have 40 built-in characters: 2 starter characters, 19 Kristal MEDIA profiles (one coincides with King Klown), and 20 Canon profiles.
- Existing browser workspaces receive missing built-in profiles once at first launch of 7.3, preserving edited fields and portraits. This installation is stored in `workspace.extensions.installedUniversePacks`.
- Deleting a built-in profile after installation remains effective after restart. It will not be auto-restored. To recover deleted characters, explicitly restore a backup.
- In the sidebar, multi-select chips display one or several universes, or all. A filter never deletes a character. The gallery applies the same filter.
- The active profile can remain open even when a filter hides it from the left navigation; selecting a visible profile changes it.
- A standard TXT import may add/replace a character; a full JSON/ZIP restore replaces the workspace after confirmation.

## Data model
Universe groups reuse the existing `collections` entries and `identity.collectionId`. Visual `themes` remain independent and are unchanged.

## Known limits
No automatic remote syncing; native IndexedDB persistence across browser restarts still requires testing on the user's machine.
