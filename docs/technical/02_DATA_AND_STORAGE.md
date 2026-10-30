# Data contracts, persistence and interchange

## Proposed canonical export format (v6)

- `schemaVersion`: integer **6** for v6 data contracts (separate from the marketing app version).
- `format`: literal `KaracterBackup`.
- `exportedAt`: ISO-8601 UTC.
- `workspace`: full v6 normalized document, including characters, collections, themes, scenarios, relationships, runs, comparisons and image metadata.
- `assets`: list of `{assetId, mediaType, sha256, dataBase64}` for every exported image.
- `manifest`: counts and optional application build metadata.

Schema: [`backup.schema.json`](../schemas/backup.schema.json). Examples: [`example-backup.v6.json`](../examples/example-backup.v6.json).

**Note:** Legacy v5 backups have `format: 'Karacter'`, `version: 8`, `state` and `images` containing data URLs. V6 MUST explicitly distinguish that format during import. It MUST NOT label a v5 document as valid v6 without migration.

## Storage strategy

- `localStorage` or a small transactional browser store for compact preferences; versioned workspace JSON may use IndexedDB if localStorage size becomes insufficient.
- IndexedDB for image blobs, with metadata and content hash. The persistence layer must report a failure instead of silently losing a large image.
- Atomic logical save: validate new state, persist records/blobs and only then signal "Saved". For multi-store changes, use a transaction or recoverable staged commit.
- A local browser store is **not an external backup**. Provide one-click full backup and prominent retention guidance.

## Image key and integrity

`slotKey = characterId + '/' + themeId + '/' + modeId`; IDs are opaque and cannot contain unsafe path traversal sequences. Exactly one current asset per slot; old assets may be retained for undo until cleanup.

The export stores image bytes as base64 plus `sha256`, byte size and `mediaType` in metadata. Import must verify each asset's integrity when a hash is included and refuse a corrupted archive without partially restoring content.

## Human-readable TXT sheet

- Each character sheet is UTF-8, editable and re-importable.
- `KARACTER CHARACTER SHEET v6` is the document marker; section names/field keys are stable **English machine identifiers**, while optional display labels can be localized.
- Preserve multiline author text with safe length limits.
- A machine-readable JSON section embedded at the end is the authoritative lossless record for nested axes, story fields and milestones. Editing human-readable key fields updates matching fields during import by explicit precedence rules.
- **No binary image bytes in TXT**. Include only image slot/file references.

TXT import precedence: (1) parse and validate machine-readable JSON; (2) overlay recognized user-editable visible scalar sections; (3) validate IDs, polarities, dates and references; (4) show preview; (5) commit atomically. Do not guess arbitrary section aliases.

## Backup ZIP

At a minimum:

```text
karacter-backup-YYYY-MM-DD.zip
├── manifest.json
├── karacter-backup.json
├── sheets/
│   └── <character-id>.txt
└── prompts/
    └── <character-id>_<theme-id>_<mode-id>.txt  (optional)
```

For v6 baseline, `karacter-backup.json` is self-contained and includes all image bytes in `assets`. ZIP `images/` folders are optional and MUST NOT create competing authoritative versions. The importer must always prefer the manifest-specified primary backup.

## Import semantics

1. Read only local user-selected file, bound file size and decompressed size.
2. Detect format by signature, validate structure and version.
3. Migrate into an in-memory draft and produce an import preview with counts/warnings.
4. Resolve conflicts and relation references; no guessed name matching.
5. Offer **Replace workspace** or **Merge using IDs** (merge is P0 only if tested thoroughly; default replace with backup-first is acceptable). Conflict handling never overwrites without confirmation.
6. Write all records/blobs transactionally or from a recoverable staged snapshot.
7. On failure, return to the previous consistent state; surface what failed.
8. On success, log a local migration summary and offer a restoration check.

## Export semantics

- Export only after committed saves are complete.
- Keep schema version, stable ID and explicit filename.
- JSON exports always contain images; TXT files never contain images.
- Prompt batches should not contain private image bytes.
- Deleting a character after export does not remove copies already downloaded.

## Size and safety limits (proposed defaults)

- Per imported image ≤ 30 MiB; per ZIP ≤ 200 MiB compressed and ≤ 500 MiB uncompressed; max 1,000 characters and 10,000 simulation runs per imported workspace (configurable).
- Nested JSON depth/field string bounds, 40 custom axes/character, 8,192 characters per free text field (except large lore notes with explicit handling).
- Reject ZIP entries with path traversal, decompression bombs or unexpectedly encrypted entries.
- These are **implementation policy proposals**, not v5 capabilities. Tune after realistic perf tests.

See [migration](03_MIGRATION.md) and [security](05_SECURITY_PRIVACY.md).
