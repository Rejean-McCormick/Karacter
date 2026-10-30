# Design system and interaction standards

## Visual direction

Karacter's current identity is a calm creative studio: warm off-white backgrounds, dark ink, teal accent `#1e6864`, friendly rounded cards and restrained decorative elements. Keep the supplied Karacter SVG logo. Avoid gamification that assigns value or ranking to character personalities.

## Tokens (reference starting point)

| Token | Suggested starting value | Notes |
|---|---|---|
| `color.accent` | `#1e6864` | Brand teal; check contrast in use |
| `color.text` | `#20352f` | Readable body text |
| `color.background` | `#f6f7f1` | Warm neutral |
| `color.surface` | `#ffffff` | Cards and dialogs |
| `color.border` | `#dae5dc` | Subtle dividers |
| `radius.card` | `20px` | Consistent card shape |
| `radius.control` | `11–12px` | Inputs and buttons |
| `space.unit` | `4px` | Consistent spacing scale |

The token values are design guidance, not proof of accessible contrast. Verify WCAG contrast against actual backgrounds.

## Primary components

- `CharacterPicker`, `CollectionFilter`, `LanguageToggle`, `DepthToggle`.
- `PolarityPair`: two named sliders, 0..6 labels, context details and screen reader announcements.
- `NarrativeFieldGroup`, `RelationshipEditor`, `MilestoneTimeline`.
- `ScenarioPicker`, `StakesSelector`, `ReactionCandidateCard`, `EvidenceDisclosure`.
- `ComparisonColumns`, `ThemeSelector`, `PromptEditor`, `ImageSlot`, `ImportPreviewDialog`.

## Polarity pair interaction

Both controls occupy equivalent visual space and have the same typography. Avoid green-versus-red or "good-versus-bad" encoding. Display e.g. **Caution 5 / Boldness 1** with neutral colors. A centered 3/3 is not a moral ideal. Numeric information must be visible without interpreting color or thumb position.

## Responsive behavior

- Mobile single-column, generous touch target, no horizontal overflow in axis cards.
- Compare A/B stacks vertically; scenario context remains visible or easily expandable.
- Gallery resizes thumbnail grid without stretching/cropping original display unpredictably.
- Keyboard and reduced-motion preferences work across breakpoint changes.

## Interaction copy rules

- Say "possible response" rather than "will react".
- Say "preferred approach" rather than "ability" or "personality score".
- Say "can help / can complicate" rather than "strength / flaw" for axes.
- "Saved locally" does not mean "backed up". Show an explicit backup reminder where appropriate.
- When a user's manual text would be overwritten, state exactly what changes and offer Cancel.

## Accessible interaction

See [accessibility](../technical/04_I18N_ACCESSIBILITY.md). All slider outputs use semantic `<output>` or equivalent, linked labels, descriptive `aria-valuetext`, keyboard Arrow/Home/End and status changes. Modals trap focus and restore it on close.
