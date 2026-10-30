# Image prompt generation contract

## Output scope

Karacter prepares **copyable text** for ChatGPT/DALL·E or another external image tool. The baseline v6 has no network generation API. All three modes request **one square image** (`1:1`, target 1024×1024 unless external service differs).

## Prompt composition (in priority order)

1. **Task and mode**: "Create one square illustrated portrait / four-expression sheet / action scene".
2. **Character identity lock**: distinctive visual signature, palette, silhouette, accessories and authored exclusions.
3. **Theme reinterpretation**: universe requirements without changing underlying psychology.
4. **Scene instruction**: scenario and stakes for action; four selected emotions for expressions.
5. **Selective personality cues**: maximum three **context-relevant, physically expressible** cues; use narrative context and chosen behavior rather than eight numerical labels.
6. **Art style and composition**: style, lighting, framing, uncluttered background, readable silhouette.
7. **Continuity constraints**: same recognizable character across variants, no extra characters unless requested, no embedded text/logo unless specified.
8. **Output request**: single square image; filename handled by Karacter after import.

## Personality → visuals rules

- Favor observable behavior, posture, gaze direction and gesture in context, not stereotypes about appearance or protected traits.
- A high preference for reserve should not force downcast eyes or sadness; it may suggest a deliberate, measured social presentation **when relevant**.
- Many personality attributes, like loyalty or wisdom, do not have unique facial expressions: use narrative action or props only if grounded in story fields.
- Neutral 3/3 preferences should not be described as middling talent.
- If a priority visual cue contradicts the identity lock, identity lock wins; flag the conflict for author review.
- User-written 'negative prompts' (e.g. "not a circus clown") remain authoritative over automatic theme defaults.

## Mode-specific rules

### Portrait

- Single recognizable subject, clear full/three-quarter figure based on user choice, stable costume details.
- Limit personality-driven pose cues to 1–3 observable tendencies.
- No unsupported biographical symbolism.

### Expressions

- Exactly four panels/expressions, each the **same** character and costume.
- Emotions can be chosen by the user; defaults are narrative examples, not fixed diagnoses.
- Require consistent facial proportions, accessories and visual palette; no textual captions unless user requests.

### Action

- Include scenario location/trigger and the selected or locked reaction path.
- Action must be traceable to the scene, not simply "running" when spontaneity is high.
- Do not leak the simulator's internal evidence paths verbatim into the artistic brief.

## Prompt assembly pseudocode

```text
buildPrompt(character, theme, style, mode, scene?, candidate?):
  assert character and theme and style and mode are valid
  identity = canonicalVisualSignature(character)
  cues = chooseRelevantVisualCues(character, scene, max=3)
  prompt = modeInstruction(mode)
         + identityConstraints(identity)
         + themeConstraints(theme)
         + (sceneInstruction(scene, candidate) if mode == 'action' else '')
         + observableCues(cues)
         + styleConstraints(style)
         + squareOutputAndContinuityRules()
  return { text: prompt, provenance: sourceFields, mode, targetAspectRatio: '1:1' }
```

## Manual editing

If the user edits prompt text, show **Edited manually**. Changing a slider or theme may display **Inputs changed — regenerate?**, but MUST NOT silently replace user-edited text. Regenerate is explicit and should optionally offer copy of the previous draft.

## Batch export

Each prompt section has a named character ID, theme ID, mode and expected filename. Batch generation uses the character's current settings but does not create image assets. The output document contains English prompts by default unless the user explicitly selects French prompts, independent of UI language.

## Example phrase for King Klown

"A tall cosmic trickster guardian with hypnotic eyes, black-silver-teal waves of hair, and a long teal coat traced with luminous spirals. Noble and enigmatic rather than a circus clown; a controlled smile hints at a larger plan. Preserve this silhouette across all reinterpretations."

See [visual system](01_VISUAL_SYSTEM.md), [scenarios](../domain/05_SIMULATION_ENGINE.md), [asset contract](../technical/02_DATA_AND_STORAGE.md).
