# Karacter 6 acceptance cases (Given / When / Then)

Each P0 criterion is testable. The numbered test IDs may be used in automated suite names.

## Polarities

**AC-POL-01** Given an axis Caution 3/Boldness 3, when Caution changes to 6, then Boldness is 0 and both visible numbers and accessible names update; neither is flagged bad.  
**AC-POL-02** Given Caution 5/Boldness 1, when Boldness changes to 4, then Caution is 2.  
**AC-POL-03** Given a character, when its visual theme changes, then every canonical polarity value and narrative field is identical afterward.  
**AC-POL-04** Given a new custom axis, when the user supplies a context and labels and saves it, then it survives TXT and JSON round trips.  
**AC-POL-05** Given invalid `leftScore=9`, when importing, then no invalid state is saved; the importer reports a precise validation error.

## Character and story

**AC-CHR-01** Given duplicate display names, selecting one always opens the correct UUID-based character.  
**AC-CHR-02** Given an Explorer user, switching to Studio exposes previously hidden data without changing it.  
**AC-NAR-01** Given King Klown's contradiction, adding a milestone records a choice and belief update without automatically rewriting baseline 3/3 preferences.  
**AC-NAR-02** Given an edited milestone, undo restores the previous user-authored content and timeline order.

## Simulations

**AC-SIM-01** Given the same full input snapshots and engine version, running twice produces identical deterministic proposals.  
**AC-SIM-02** Given King Klown, high stakes and an autonomy conflict, the engine proposes at least three **meaningfully different actions** with explanations grounded in his provided story/axis/scene data.  
**AC-SIM-03** Given a minimally specified character, the engine makes uncertainty explicit rather than inventing traumatic history or relationships.  
**AC-SIM-04** Given a user-edited candidate, changing the axis then requesting regenerate does not silently replace the edited candidate.  
**AC-SIM-05** Given high versus low stakes, changes can be explained using the stated scenario, without mechanically implying aggression or incompetence.  
**AC-SIM-06** Given a saved result, reopening it after editing the character shows the frozen snapshot and option to rerun with latest settings.

## Comparison

**AC-CMP-01** Given King Klown and Mira under the same scene/stakes, UI shows both with identical external facts and different possible paths when supported by source data.  
**AC-CMP-02** Given A = B, Run is blocked and an accessible explanation appears.  
**AC-CMP-03** Given no images, comparison remains usable and exportable.  
**AC-CMP-04** No comparison view or export includes a "winner", "compatible %" or moral grade.

## Images and prompts

**AC-VIS-01** Given a portrait image in the `alien/portrait` slot, importing an `alien/action` image does not overwrite portrait bytes.  
**AC-VIS-02** Given a full theme switch, the character's story/polarities/relationships remain unchanged and previous themed assets remain available.  
**AC-VIS-03** Given a manually edited prompt, changing a slider raises a stale/regenerate notice but preserves the manual text.  
**AC-VIS-04** Given King Klown, generated portrait prompt retains teal signature and exclusion of generic circus-clown look.  
**AC-VIS-05** Given an existing slot, attempting image replacement asks for explicit confirmation and keeps old image if canceled.

## Storage and migration

**AC-DATA-01** Given a full v6 backup with three image modes, restore recreates identical asset hashes, character IDs and linked slots.  
**AC-DATA-02** Given a valid v5 backup, import preview lists transformations and all authored fields are retained where supported.  
**AC-DATA-03** Given a corrupt ZIP, import fails atomically and previous workspace remains readable.  
**AC-DATA-04** Given a TXT sheet modified on disk, import overlay rules preserve intended edits and unrelated nested data.  
**AC-DATA-05** Given two characters with the same name but different IDs, merge does not conflate them.  
**AC-DATA-06** Given a storage quota error during image replacement, old image remains and the UI reports failure honestly.

## Bilingual, accessible and offline

**AC-I18N-01** Given an edited English or French custom note, switching locale does not change its text.  
**AC-I18N-02** Every new view, error, evidence label, screen-reader label and button is localized EN/FR.  
**AC-A11Y-01** All critical flows work with keyboard only, including both slider controls, comparison and import dialogs.  
**AC-A11Y-02** At 200% zoom on a 320px viewport, the paired scales and comparison remain operable without clipping.  
**AC-OPS-01** Extracted distributable opens offline with no API calls required; exports, imports, prompts and comparisons work.

## Negative tests

- No exact evidence path exists → display inference as speculation, not invented fact.
- A character is deleted with relationships → show impact and avoid dangling live references.
- Huge malformed image/ZIP → fail gracefully without crashing or destructive partial restore.
- Unknown schema version → refuse safely with explanation and the original file intact.
- Prompt-mode switch when an image is present → old mode asset remains intact.
