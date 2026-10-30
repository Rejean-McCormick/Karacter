# Explainable contextual simulation engine (v6 core)

## Purpose

Given a character, a shared scenario and stakes, generate **multiple plausible hypotheses** about what the character might feel, think, do and need. Explain which authored details influenced each hypothesis. Do not determine the one true response; never diagnose people.

## Inputs

```text
character snapshot (axes, emotion palette, story, milestones as selected)
scenario snapshot (neutral facts, trigger, stakes, optional relationship target)
context options (stakes low | medium | high, role, optional constraints)
engineVersion, locale (display only), optional user-seeded choices
```

No external AI call is required for baseline v6. A deterministic template/rule engine is sufficient and auditable. Generative AI is an explicit future opt-in (P2) subject to privacy and provenance decisions.

## Output contract

A `SimulationRun` contains `id`, `engineVersion`, `inputsHash`, `characterSnapshot`, `scenarioSnapshot`, timestamp and at least **three** `candidates`.

Every candidate has:

- `path`: `habitual | deliberate-alternative | surprising-but-grounded`;
- `feelings[]`, `interpretation`, `action`, `underlyingNeed`, `tension`;
- `evidence[]` with `sourceType`, source ID/path, a user-readable reason, polarity if relevant, and scenario consequence;
- `possibleUpside`, `possibleTradeoff`, `editable`, `userEdited`, `locked`;
- no synthetic confidence percentage, diagnosis or goodness/ranking score.

## Processing pipeline

1. **Validate** input IDs, required scenario text and stakes.
2. **Normalize a snapshot**; never mutate character or source scenario.
3. **Identify relevance:** mark at most 2–4 axes relevant to the scene *by their applicable context*, not merely largest scores.
4. **Identify tensions:** use stated desire, fear, contradiction, target relationship and stakes; if absent, state that explanation is limited.
5. **Construct habitual path** from matching preference/context and recurrent coping strategy (if recorded).
6. **Construct deliberate alternative** that leverages the other pole, a value, trusted relationship or growth choice the character could make.
7. **Construct surprising-but-grounded path** from the character's contradiction, a relevant milestone or a plausible unchosen strategy. Do not invent biography.
8. **Ensure diversity:** actions and rationales must be meaningfully different; if impossible, return a clearly labeled limited-suggestion state rather than three paraphrases.
9. **Render evidence** from cited internal data paths; label author-provided facts versus inferred hypotheses.
10. **Save only on user action or explicit autosave of run as a separate record**; never overwrite original character fields.

## Stakes

- `low`: inconvenience, embarrassment or short-lived disagreement.
- `medium`: meaningful relationship, resource or decision.
- `high`: essential value, safety, belonging or major loss in the fictional narrative.

Higher stakes MAY change prioritization, emotional intensity and willingness to depart from habitual preferences. It MUST NOT always increase impulsiveness/aggression or produce stereotyped violence.

## Determinism and traceability

- The same normalized input snapshot + rule version + explicit seed (if used) MUST produce the same proposal set in deterministic mode.
- Results store a frozen snapshot so later character edits do not rewrite old scenes.
- Evidence objects must cite valid paths in the snapshot, e.g. `polarities[caution-boldness].leftScore`, `narrative.contradiction`, `relationship[rel-id].context`.
- Users can regenerate from current character settings, but the app must warn before discarding unlocked edits; locked candidates survive and are marked out-of-date when inputs change.

## Avoiding simplistic scripts

Anti-pattern: "If boldness > 3, the character charges forward."  
Better: "If this axis is relevant to the specific scene, boldness preference may make initiative one candidate; fear of betraying a friend may make restraint another."  
If a domain has no supporting character information, avoid confidently asserting it as a cause.

## Example: King Klown

Scene: His trusted community asks him to disclose a secret plan; stakes high.

- **Habitual:** playful misdirection, a question instead of a direct answer. Evidence: recurring reaction and strategic secrecy.
- **Deliberate alternative:** reveal the plan and invite shared decision making. Evidence: value of freedom and potential growth toward transparency.
- **Surprising but grounded:** temporarily withdraw from leadership. Evidence: contradiction between guidance and control, fear of endangering autonomy.

All are *possibilities*, not inevitable outcomes. Output may change when the target is a protected child rather than an adult rival, if that target and relationship context are explicitly supplied.

## Safety and pedagogy

- No real-child personality diagnosis; no clinical labels, compatibility ranking or automatic moral assessment.
- Do not infer trauma, mental illness, abuse, criminality or protected traits from an axis position.
- Avoid presenting imagined motives as evidence about real people.
- If a story touches on harm, describe consequences responsibly and allow less harmful alternative paths.

## Quality tests

See [acceptance scenarios](../quality/02_ACCEPTANCE_CASES.md). Test identical inputs for stable output, opposite profiles for distinct reasoning, and sparse profiles for transparent uncertainty without invented backstory.
