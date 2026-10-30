# ADR-001: Linked polarity scales represent preferences, not abilities

**Status:** Confirmed core user requirement; contextual interpretation is the v6 refinement.  
**Context:** Earlier Karacter versions used one-sided trait strength or signed/1..7 scales. User requested two equal poles with linked numeric sliders 0–6.

## Decision

Retain two equally presented sliders: `leftScore in [0..6]`, `rightScore = 6-leftScore`. 3/3 is balanced. They represent **usual emphasis in a specific choice context**. Neither number means virtue, talent, incompetence, diagnosis or invariable conduct.

## Consequences

- Persist one numeric value, derive the other to prevent drift.
- Do not use red/green or positive/negative style coding.
- Every axis requires context for responsible interpretation.
- Alternate scene behavior can favor the less-preferred pole without changing baseline.
- Existing v5 paired scores remain exactly portable.

## Alternatives rejected

- A single 1–7 slider: creates an apparent hierarchy and hides equal poles.
- Signed -3..+3 scale: user explicitly rejected positive/negative signs.
- Two independently adjustable 0–6 trait strengths: breaks the linked design choice; could be considered later as a *different* concept, not silently substituted.
