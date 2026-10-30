# Performance, reliability and failure behavior

## Proposed performance budgets (to test, not guaranteed)

- Small workspace (≤50 characters, ≤500 thumbnail metadata rows): main view interactive within ~2 seconds on a typical laptop running a modern browser from local files.
- Slider linked value update feels immediate (target under 50 ms for UI reaction) without invoking full rerender of gallery.
- Generate deterministic scene alternatives for a character in under 500 ms on typical device for reference fixtures.
- Large gallery: lazy-render images, preserve scroll position, avoid decoding every asset simultaneously.
- Browser quota is unpredictable: detect and report rather than promise fixed storage capacity.

## Error taxonomy

| Code | Meaning | Required behavior |
|---|---|---|
| `IMPORT_FORMAT_UNSUPPORTED` | Unrecognized file/schema version | Explain supported formats; no changes |
| `IMPORT_INVALID_DATA` | Corrupt/malformed text or IDs | Show actionable errors and record index |
| `IMPORT_ASSET_CORRUPT` | Blob/image checksum mismatch | Refuse partial destructive restore |
| `IMPORT_REFERENCES_MISSING` | Broken relationship IDs | Show remap/skip preview |
| `STORAGE_QUOTA` | Browser can't persist | Keep current unsaved state in memory, warn, offer export |
| `STORAGE_UNAVAILABLE` | Browser blocks local storage | App still permits temporary editing/export where possible |
| `IMAGE_DECODE_FAILED` | Unsupported/corrupt image | Keep existing slot untouched |
| `PROMPT_STALE` | Inputs changed after manual prompt edit | Show Regenerate action; preserve manual text |
| `SIMULATION_UNDER_SPECIFIED` | Not enough domain context for diverse paths | Label limited basis, request optional detail |

## Autosave and backup

- Make saving visible and truthful; a successful localStorage call alone is not a verified full image backup.
- Debounce frequent text edits; flush on field blur, explicit export and documented before-unload behaviors where browser allows.
- Keep last good validated workspace snapshot to recover from malformed writes.
- Exports must wait for pending image transaction completion, then validate manifest/counts.
- Offer clear test restore flow; avoid pretending a backup is valid without parsing it.

## Observability

Local structured logs should avoid sensitive author text and remain optional for diagnostics. A debug export MAY contain version, entry counts, schema validation issues and error codes, not raw images or creative content by default.
