# Working with Karacter 6 documentation

## Source of truth

Read [README](README.md), [requirements](product/02_REQUIREMENTS.md) and [decision register](decisions/DECISION_REGISTER.md) before implementing a feature. Product assumptions should never be introduced only in code.

## Changing behavior

1. Identify or add a stable requirement ID.
2. Update the relevant domain/UX/technical page.
3. If data changes, update the JSON Schema and example fixture.
4. Add or adjust acceptance cases and migration notes.
5. Record significant choices in the decision register or an ADR.
6. Implement and test. Do not mark a feature shipped before release gates pass.

## Terminology rules

- "Polarity", "pole", "relative preference", "scenario", "possible reaction", "narrative conflict", "visual theme" have precise meanings in [glossary](04_GLOSSARY.md).
- Never call the low end of a pole a flaw, or the high end a virtue.
- Avoid diagnosis, simulated certainty percentages and moral leaderboards.
- User-authored strings remain in their source language.

## Documentation conventions

- English for canonical specs and code identifiers; bilingual strings where UX requires it.
- Markdown relative links inside `/docs`.
- JSON fixtures must validate against current schema and cross-record rules.
- Proposed decisions marked as such until approved.
- Versioned examples must include whether they are illustrative or runtime results.
