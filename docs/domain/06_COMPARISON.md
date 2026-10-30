# Two-character comparison lab

## Purpose

Show two fictional characters encountering **exactly the same factual situation** and describe multiple plausible reactions without a winner, moral ranking or "personality compatibility" percentage.

## Fixed shared inputs

- One scenario ID and immutable scenario text.
- One stakes level (low, medium, high).
- Same external facts, same available choices and same constraints.
- Two distinct character IDs; character-specific narrative context and relationships may differ.
- Same simulation rule version and any explicit seed setting.

## UI layout

Desktop: two equal-width character columns with a persistent shared scenario header. Mobile: stacked panels and an A/B switch; both keep the shared stakes visible. Each column has character identifier, brief baseline cues, three plausible response cards and evidence disclosures.

Provide a **Differences explained** section with neutral comparisons:

- different priorities due to authored values;
- different approaches suggested by relevant polarities;
- different interpretations supported by relationships or past milestones;
- common ground in needs or concerns.

Never show a better/worse badge, colored moral grading or statistical confidence.

## User interactions

1. Choose A and B. If identical IDs, disable Run and explain why.
2. Choose a scenario and stakes.
3. Generate both sets from frozen inputs.
4. Expand evidence, compare candidate paths and optionally edit/lock a response.
5. Save a comparison as an independent artifact and export a UTF-8 `.txt` summary.
6. If a character is later edited, past comparison stays a historical snapshot; offer `Run again with current characters`.

## Comparison export outline

```text
KARACTER 6 — CHARACTER COMPARISON
Scenario: ...
Stakes: High
A: King Klown (id ...)
B: Mira (id ...)

A — Habitual path
Feels: ...
Interprets: ...
Acts: ...
Needs: ...
Evidence: ...

B — Habitual path
...

Alternative paths (A and B)
...

Common ground: ...
Differences: ...
Disclaimer: Fictional interpretive possibilities; no ranking or diagnosis.
```

## Special cases

- No character image: use initials/emoji; comparison remains fully usable.
- Missing narrative fields: explain only existing axis/scenario facts; do not invent past events.
- Deleted original character: show frozen snapshot, label original unavailable.
- Customized axis with unique name: display it unmodified; avoid comparing its numeric value to a different axis as if scientifically equivalent.
- A/B different languages in authored prose: preserve original text; translate interface labels only.

## Acceptance

An educator can compare two characters with no art assets; a writer can inspect *why* their choices diverge; an author can save a run without altering either character. Compare outputs of King Klown and Mira in [example fixture](../examples/comparison-king-klown-mira.json).
