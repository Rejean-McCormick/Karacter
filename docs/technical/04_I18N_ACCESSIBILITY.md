# Bilingual interface and accessibility requirements

## Languages

Karacter supports **English (`en`) and French (`fr`)** for every application-owned string: navigation, menus, controls, hints, dialogs, errors, comparison captions, example prompts and export UI.

- Locale preference persists across sessions when storage is available.
- Default locale: browser language if `fr` or `en`, otherwise English (proposed; review decision register).
- User-authored strings **never auto-translate**: character names, lore, custom pole labels, custom scenes, relationships and prompt edits remain exact.
- Built-in reference datasets use stable IDs and optional localized labels.
- Schema keys/IDs are English and stable, independent of interface locale.
- A locale change must not reset active character, tab, slider, scenario, stakes, theme or unsaved text.

## Implementation

Use key-based messages like `polarities.preferenceNote` with interpolation and plural rules where needed. Do not scrape/replace rendered DOM strings after the fact. Translate accessible names, validation messages, toast notifications and tooltips as first-class keys. Missing keys must be caught by tests and fallback visibly to English rather than broken placeholders.

## Accessibility targets

- WCAG 2.2 AA as the **design/testing goal** (not a certification claim).
- All functions usable by keyboard, including drag/drop alternatives and image selection.
- Focus outlines, meaningful headings and landmarks; skip navigation link.
- Two sliders per polarity both exposed with labels and `aria-valuetext`, including complementary numeric value.
- Numeric 0–6 representation must not depend on red/green or left/right alone.
- Every modal traps focus while open, restores focus when dismissed and explains destructive effects.
- Every image has meaningful alt text or is explicitly decorative.
- Form validation associates messages to control IDs and offers summaries for import errors.
- Use reduced-motion preferences; avoid blinking/rapid transitions.
- Support 200% browser zoom and 320 CSS px viewport without clipping essential content.
- Screen-reader change announcements for autosave, import success/failure and paired slider adjustments (debounced to avoid verbosity).

## Suggested accessibility test tasks

1. Create a character by keyboard only.
2. Set Caution 5; verify Boldness changes to 1 and a screen reader announces both scores.
3. Switch FR ↔ EN during an unsaved prompt edit; verify content remains.
4. Compare two characters and read evidence in logical DOM order.
5. Import a backup using keyboard; review warnings and cancel without modifying state.
6. Navigate a 320px mobile viewport at high zoom.

## Child-friendly context

Explorer uses shorter phrases, accessible explanations and avoids moralized words. Children should not be asked to diagnose real people with Karacter. The product provides fictional examples only and leaves interpretation to a parent/educator.
