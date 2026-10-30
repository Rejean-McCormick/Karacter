# Karacter 6.2 — Stability release

**Version:** 6.2.0  
**Backup schema:** 6 (unchanged)  
**Code baseline:** Karacter 6.1

## Fixed and improved

1. Moved the authoritative workspace from `localStorage` into the same IndexedDB database used by portraits; migration reads the 6.1 workspace once when no 6.2 workspace exists.
2. Added one atomic IndexedDB transaction for workspace edits that add, delete, replace or restore portrait bytes. Deleting a character, replacing an image and restoring a backup cannot commit half the update.
3. Made the editing status truthful: *Saving*, *Saved*, or persistent *NOT SAVED* and a retry button. The status survives re-rendering.
4. Delayed routine text/slider writes (~280ms) while keeping important image and deletion operations transactional. The simulator's frozen historical snapshots remain intact, now outside `localStorage` quotas.
5. Preserved v6 backup JSON/ZIP format, integrity verification, v5 imports and the French/English toggle.
6. Added regression tests for legacy migration, workspace persistence, atomic deletion, binary restore and injected transaction failure.

## Verified

- `npm test`: passes for core, schemas used in the core, v5 conversion, TXT, simulations, comparisons, backup SHA-256 and transactional rollback (an IndexedDB test double with snapshot commits).
- `python tests/ui_smoke.py`: passes in isolated Chromium for linked sliders, simulation, scenarios, comparison navigation, FR/EN and 320px layout; it deliberately does **not** certify persistent browser storage.
- JavaScript syntax checks pass.

## Not verified (manual release gate)

The automation environment blocks local HTTP and `file://` navigation. Thus native IndexedDB data after browser restart, cross-browser migration and real hardware/screen-reader tests remain unverified. Do not label Karacter 6.2 fully production-certified until these checks pass.

## First-run / migration instructions

1. From 6.1, export **Full ZIP** as a safe copy.
2. Serve 6.2 using the **same origin** (protocol, hostname and port) as 6.1, or import that ZIP if the origin changed.
3. Launch 6.2, edit a character, wait until **Saved locally** is shown, and reload.
4. Add an image, reload, then delete the character and verify that both the character and image disappear.
5. Import the saved ZIP and verify the character and image reappear with the right image hash.
6. Try a corrupted import and verify that it does not change the existing collection.

## Limitations / next milestone

- Historical runs still include full character snapshots to keep them immutable; IndexedDB removes the small `localStorage` ceiling but does not remove disk/storage limits. Manage history and optional archives in a later optimization.
- Multi-tab simultaneous editing is not synchronized and can overwrite newer edits; use one editing tab.
- The app does not auto-sync, automatically generate images or upload your files.
- Compressed foreign ZIPs need extraction before import.
- Accessibility on physical devices and real screen readers requires additional verification.
