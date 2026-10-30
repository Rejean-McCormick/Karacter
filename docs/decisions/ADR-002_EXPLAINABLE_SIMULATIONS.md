# ADR-002: Explanation-first scenario simulation

**Status:** Proposed for v6.

## Decision

Use a deterministic, locally executable scenario engine that generates multiple **plausible hypotheses** grounded in a frozen snapshot. Every suggestion has an explanation linking to actual supplied character/context data. The user can edit or reject any suggestion.

## Why

The existing v5 heuristic output can feel repetitive and unconvincing. A black-box AI prediction could overstate psychological certainty and create privacy dependencies. A transparent engine is easier to test and refine.

## Consequences

- Maintain versioned rules and example fixtures.
- Treat narrative/story constraints as important as numerical preferences.
- Support low information gracefully instead of hallucinating history.
- Reject moral ranking and simulated certainty percentages.
- Optional model-provider integration is future scope only.

See [simulation engine](../domain/05_SIMULATION_ENGINE.md).
