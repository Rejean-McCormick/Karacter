# Paired polarity model: canonical rules

## Definition

A **polarity** is a context-sensitive emphasis between two useful tendencies, not a virtue-versus-flaw classification, a capacity rating, a diagnosis or a claim of mutually exclusive personality traits.

**Confirmed UI rule:** two linked scales from `0` through `6`. Their sum is `6`. Neither pole receives a plus or minus sign.

```
leftScore  = integer between 0 and 6
rightScore = 6 - leftScore
0 <= leftScore <= 6
leftScore + rightScore == 6
```

When the user changes the **right** slider to `r`, set `leftScore = 6-r`.

| Left | Right | Textual interpretation |
|---:|---:|---|
| 6 | 0 | Strong left preference in the named context |
| 5 | 1 | Clear left preference |
| 4 | 2 | Slight left preference |
| 3 | 3 | Balanced preference; either can be chosen |
| 2 | 4 | Slight right preference |
| 1 | 5 | Clear right preference |
| 0 | 6 | Strong right preference |

These are **qualitative controls**, not calibrated measures. Do not show percentages, standard deviations, probability estimates or psychiatric labels.

## Context is mandatory for interpretation

A standard axis has an `appliesWhen` text, such as "when facing uncertain opportunities" for Caution ↔ Boldness. Without context, the scale risks incorrectly implying that cautious characters cannot act bravely.

Example: **Caution 5 / Boldness 1** means "when choosing how to handle uncertainty, the character usually prepares and checks risks". It DOES NOT mean "the character is incapable of brave acts".

A different context can elicit a different choice without changing the baseline. A character can be analytical *and* quick to act; the axis only says which approach is preferred when the two are meaningfully in tension.

## Standard eight starting axes (editable templates)

| Template ID | Left | Right | Example applicable context |
|---|---|---|---|
| `caution-boldness` | Caution | Boldness | Facing uncertainty or potential danger |
| `reserve-expression` | Reserve | Expressiveness | Joining or contributing to social interaction |
| `reflection-spontaneity` | Reflection | Spontaneity | Responding to unexpected events |
| `familiarity-exploration` | Familiarity | Exploration | Encountering new possibilities |
| `objectives-relationships` | Task focus | Relationship focus | Deciding where to direct attention in a group |
| `containment-expression` | Emotional containment | Emotional expression | Showing personal feelings to others |
| `speed-patience` | Quick pace | Patient pace | Deciding how much time to devote to a task |
| `practicality-imagination` | Practicality | Imagination | Developing a first approach to a problem |

These are **creative contrasts**, not scientific psychological opposites. All can be renamed. A custom axis may be a contrast rather than a strictly opposing psychological dimension.

## Per-axis authorable details

- `left.label`, `right.label`: displayed pole names, localized for templates but editable at character level.
- `appliesWhen`: contextual framing; required for a newly published custom axis.
- `left/ right.visualCues[]`: optional non-stereotyped, visible suggestions.
- `left/ right.canHelpWhen[]`, `canComplicateWhen[]`: conditions, not moral judgments.
- `leftScore`: canonical integer; right score is derived.
- `source`: template/custom/imported; `migrationReviewRequired` if inferred from legacy.

## Custom axis UX

1. Ask for two labels, the choice context, and optional benefits/trade-offs and visual cues.
2. Warn (without blocking) when labels are synonyms, one is a moral insult, or both are independently compatible rather than an intelligible context-specific contrast.
3. Permit balanced 3/3 and any 0..6 value; forbid an independently editable unpaired score.
4. Store one axis per unique ID; duplicate axis names are not IDs and can be legitimate.
5. Allow axis removal with undo, reorder and restore template defaults without altering other axes.

## Prompt semantics

The prompt builder MUST NOT translate `left 6/right 0` into "cannot do right-pole behavior". It may include at most three prominent *visually actionable* preferences with contextual language such as "usually observant before acting". Avoid mapping internal values (e.g. empathy) to facial anatomy or gender stereotypes.

## Simulation semantics

The reaction engine reads the axis's `appliesWhen` and potential context effects before using its score. When context is irrelevant, it SHOULD NOT force the axis into a response. It MUST consider the narrative core, stakes and relationships, and it must offer alternative responses that a character could plausibly choose.

## Migration interpretation

- From v5 paired scores: retain stored left score exactly (unless malformed).
- From older 1..7 or -3..3 scales: use the historical conversion relevant to that format and flag approximate interpretation. **Never infer the conversion solely from a number**.
- A zero is a relative preference signal, not an absent trait.

Tests: [QA cases `POL-*`](../quality/02_ACCEPTANCE_CASES.md).
