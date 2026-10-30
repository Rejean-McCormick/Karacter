# ADR-003: Local-first character ownership and portable backups

**Status:** Confirmed preference for file-based character sheets; proposed v6 schema mechanics.

## Decision

The distributed application operates without a mandatory server. Editable UTF-8 TXT sheets remain supported, while JSON/ZIP full backups carry all characters, relationships, scenarios, user edits and image bytes. Imported data is validated before replacing saved data.

## Consequences

- Browser storage is not a backup; export is prominent.
- Imported images are kept in an isolated browser blob store and exported separately as bytes.
- Both v5 and v6 data are recognized by version, not guessed from numbers.
- Changes to schemas require migrations and fixture tests.
- `file://` quirks must be tested and clearly explained.

See [data and storage](../technical/02_DATA_AND_STORAGE.md).
