# Emotional palette and relationships

## Emotion model

- `recurringEmotions[]` represents emotions that are familiar to a character, not immutable personality traits.
- `SceneReaction.feelings[]` represents emotions arising in one scene; these can be different and even contradictory.
- Multiple simultaneous emotions are valid (e.g., excitement and fear).
- Emotions are described with words; intensity MAY be an optional editorial tag but MUST NOT claim physiological precision.
- User-written emotion labels are allowed; predefined language-neutral IDs map to French/English visible labels.

## Relationship model

A relationship is an author-maintained narrative connection, not a measured compatibility score. Schema uses a **canonical workspace-level record** to avoid contradictory copies in two character records.

Proposed fields: `id`, `sourceCharacterId`, `targetCharacterId`, `type`, `label`, `context`, `history`, `trustNote`, `tensionNote`, `isReciprocalDescription`, `updatedAt`.

- `type` can be ally, rival, mentor, protege, family, friend, adversary, complex, custom.
- A directed relationship can exist from A to B without forcing B's feelings toward A.
- A reciprocal claim is explicit and may be described asymmetrically using notes.
- Personal relationship data does not vary when switching visual themes.
- A scenario can optionally reference one `targetCharacterId` to situate its stakes.

## Relationship editing behavior

- Picker excludes self by default (self-reflection belongs in narrative fields).
- Duplicate relationship detection is based on (source, target, type) and should warn but allow meaningful multiple ties when clearly named.
- Deleting a target does not automatically reassign relation to another same-name character.
- Deletion/migration shows unresolved link warnings.
- P0 interface: list, filters, editor and a read-only relation summary. Interactive graph is P1.

## Contextual use in simulation

The engine may incorporate only **author-supplied** relationship facts. Example: with a mentor target, it may propose hesitation to disappoint, *if such a tendency is supported by notes or character fear*, not invent an unspecified lifelong trauma.

The evidence trail should distinguish:
- `character`: baseline preference or narrative fact;
- `relationship`: explicit note or relation type;
- `scenario`: user-provided external fact;
- `inference`: creative hypothesis from the rule engine.

## Example

King Klown → Mira: `mentor` with a context note "He challenges her caution with puzzles and respects her boundaries". In an unexpected danger scene, a possible response is to offer Mira a choice rather than making the decision for her. This is a **possible interpretation**, not a certainty.
