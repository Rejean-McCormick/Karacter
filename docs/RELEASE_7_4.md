# Karacter 7.4 — Unified Universes

## Product decision

The default universe navigation now has exactly two entries, ordered as:

1. **King Klown** — 39 profiles from Kristal MEDIA and King Clown Canon on a clean installation.
2. **Blank Universe** — **John Doe**, an intentionally minimal starter character (no polarities, no defined emotions, values, motivations, narrative conflict or visual signature).

The **All universes** filter is a view control, not an additional universe. Other universes created by an end user remain available and are never deleted by this migration.

## Migration from v7.3

The previous default collections `kOA`, `King Klown · Kristal MEDIA` and `King Klown · Canon narratives` are unified into **King Klown**. The original collection metadata is retained under `extensions.previousUniverseCollections` for audit purposes. The migration occurs only once, using `extensions.universeLayout = "king-klown-blank-v1"`.

The character IDs, relationships, artwork, narrative histories, authored text and canonical source metadata remain unchanged. John Doe is only seeded once. A user who later deletes him does not see him return on reload. Previously saved sample **Mira** is preserved as an example; she is not seeded in a new installation.

Newly authored characters are assigned to the single visible universe when one is selected, otherwise the active character's universe (or King Klown). Standardized TXT/JSON/ZIP imports are aligned to the new layout, without restoring the old categories.

## Tests

Node unit and migration tests validate both the fresh and previously saved workspaces, the linked 0–6 polarity invariant, and the retained data. Chromium's isolated UI test confirms **King Klown (39)** and **Blank Universe (1)** are the only built-in universe buttons. The test environment did not allow certification of persistent IndexedDB across actual application restarts on a local HTTP origin.
