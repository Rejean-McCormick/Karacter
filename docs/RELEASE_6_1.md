# Karacter 6.1 — Release notes

This release finishes the most important open workflows from the initial Karacter 6 implementation. It retains the version 6 backup schema, the core polarity model and the existing local-first architecture. No cloud connection or external image-generation service is required.

## Changes since 6.0

- **Square image crop**: zoom, horizontal position and vertical position preview before committing a 1024 × 1024 PNG; cancelling does not change the existing portrait.
- **Safer full restore**: image replacement and a recovery journal are committed in one IndexedDB transaction; if a crash occurs before the corresponding workspace is saved, startup recovery restores the previous assets. Runtime validation now rejects duplicate image slots and inconsistent asset references.
- **Image backup checks**: SHA-256, metadata, duplicate/missing image bytes, corrupted ZIP entries and quota-failure rollback are covered by tests.
- **Scenario editor**: change title, context, central question and default stakes on saved situations.
- **Comparison history**: reopen and delete a saved comparison; the associated frozen simulation runs remain preserved in history.
- **Growth milestones**: edit the description, beliefs and behavior choice; undo the latest milestone edit in the current session.
- **Accessibility and responsiveness**: accessible value descriptions for paired sliders; zoom-friendly layouts at narrow effective viewport widths; crop slider keyboard support.
- **Bilingual UI**: new controls have EN/FR strings; author-written text remains unchanged when the language changes.

## Verification

- `npm test`: core and binary-backup regression suites pass, including simulated quota failure and journal recovery in an IndexedDB test double.
- Isolated Chromium UI smoke test: 0 JavaScript errors for character navigation, 5/1 slider changes, simulation, comparison history, editable scenarios, crop preview and language change.
- Offline JSON Schema validation: an edited in-memory workspace conforms to the v6 workspace schema.
- Narrow viewport tests: no horizontal document overflow at 320 CSS px and at 160 effective CSS px for Create, Understand, Simulate and Gallery.

## Important remaining limitations

1. **Native IndexedDB across a real `http://localhost` browser origin and across a browser restart could not be certified in this test environment.** Browser navigation to local origins is administratively blocked, even though the data logic and interface tests pass separately. Use a full exported ZIP backup before relying on the app for important creative work.
2. Image generation remains external: copy the prompt into ChatGPT/DALL·E and import the rendered result.
3. Imported ZIP archives must use *stored (uncompressed)* entries produced by Karacter; extract standard compressed ZIPs first. Full JSON files are also supported.
4. Legacy migrations target v5 JSON/ZIP and v4/v5 TXT. Older v1–v3 formats are not guaranteed.
5. This is a local-first application, not a synchronized multi-device service or a clinical psychological test.
6. A full manual assistive-technology audit (screen readers and device-specific testing) remains necessary before public production deployment.

## Backward compatibility

- **v6 TXT, JSON and ZIP stay at schema version 6.** The application version is 6.1.0.
- Previously saved Karacter 6 character IDs, collections, relations, images and themes remain compatible.
- For migration from v5, export a full backup from v5, then use **Backup / Import** in v6.1. Review migrated axes because preference scores are approximations.
