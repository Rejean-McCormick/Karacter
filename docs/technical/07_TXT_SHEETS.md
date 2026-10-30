# TXT character sheet specification (v6)

## Purpose

A sheet is a portable, human-readable record that can be edited with a plain text editor and re-imported. It is **not** a binary portrait container. UTF-8 is required; an optional UTF-8 BOM may be accepted during import.

## File naming and marker

- Default name: `karacter_<safe-name>_<short-id>.txt`.
- First marker line: `===== KARACTER CHARACTER SHEET v6 =====`.
- Last marker line: `===== END KARACTER CHARACTER SHEET =====`.
- Embedded canonical JSON begins after `[MACHINE_JSON]` and ends at `[/MACHINE_JSON]`.

## Required human-editable scalar blocks

`[NAME]`, `[ROLE]`, `[MOTIVATION]`, `[FEAR]`, `[VISUAL_SIGNATURE]`, `[NARRATIVE_CONTRADICTION]`, `[HABITUAL_REACTION]` plus `POLARITIES` table for convenience. The machine block contains full context, labels, and reference IDs. Additional fields may have optional named blocks.

Example (abridged; **not a complete valid import** without the JSON object):

```text
===== KARACTER CHARACTER SHEET v6 =====
[NAME]
King Klown
[/NAME]

[ROLE]
Benevolent cosmic trickster
[/ROLE]

[POLARITIES]
Caution: 1 | Boldness: 5
Reflection: 3 | Spontaneity: 3
[/POLARITIES]

[NARRATIVE_CONTRADICTION]
He protects freedom but secretly steers others' decisions.
[/NARRATIVE_CONTRADICTION]

[MACHINE_JSON]
{ "id": "...", "identity": { "name": "King Klown" }, "...": "full character record" }
[/MACHINE_JSON]
===== END KARACTER CHARACTER SHEET =====
```

## Import precedence

1. Parse the machine JSON record and validate schema.
2. Apply recognized visible block changes to corresponding fields, **including named axis lines** matched by machine axis ID and labels if unambiguous.
3. If a readable polarity line conflicts with the machine block and could map to multiple axes, show an import conflict preview; never choose one silently.
4. Never change character UUID from an edited human name.
5. Preserve context notes, migration flags, milestones and unknown approved `extensions` fields.
6. Preview the merged record and require explicit commit.

## Error handling

- Missing markers, malformed JSON, duplicate axis labels without IDs, invalid 0..6 values, conflicting 5/5 pair or dangling relationships cause a recoverable error/preview.
- If TXT contains no machine JSON, accept **legacy v5 or earlier** only via the corresponding version-specific parser; do not pretend a partial v6 TXT is a complete lossless import.
- One sheet per character; a ZIP of TXT sheets is for convenient editing, but only a **full backup JSON/ZIP** preserves image bytes.

## Compatibility policy

Do not translate machine block keys or delimiters. Built-in UI labels and documentation can be translated; imported user content is not auto-translated. Legacy marker parsers must be regression-tested on actual export fixtures.
