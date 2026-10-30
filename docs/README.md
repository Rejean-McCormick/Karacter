# Karacter documentation

**Latest:** [Karacter 7.0 release and rules](RELEASE_7_0.md) · [Implementation status](IMPLEMENTATION_STATUS.md).

The v6 specification and original JSON schemas remain below for historical context and compatibility.

> **Implementation status (6.0.0):** [Delivered code, test evidence and remaining work](IMPLEMENTATION_STATUS.md).

# Karacter 6 — Documentation source of truth

**Status:** Implementation specification (draft baseline, 29 October 2026).  
**Language:** English documentation; the product interface is bilingual English/French.  
**Software version described:** **target 6.0**, **not released**. The last inspected implementation is Karacter 5.0.  
**Goal:** Build Karacter 6 from these specifications; do not assume the documented v6 features already exist.

## Start here

1. [Vision and purpose](00_VISION.md) — what Karacter is and is not.
2. [Scope and release plan](01_SCOPE_AND_ROADMAP.md) — the v6 build contract.
3. [Requirements and acceptance criteria](product/02_REQUIREMENTS.md) — traceable implementation tasks.
4. [Domain model](domain/01_DOMAIN_MODEL.md) and [polarity model](domain/02_POLARITIES.md) — canonical semantics.
5. [Simulation engine](domain/05_SIMULATION_ENGINE.md) and [comparison](domain/06_COMPARISON.md) — product differentiators.
6. [Data contracts](technical/02_DATA_AND_STORAGE.md) and [JSON schemas](schemas/) — persistence and migrations.
7. [QA and release gates](quality/01_TEST_PLAN.md) — when the build is actually done.

## Documentation map

| Area | Pages | Purpose |
|---|---|---|
| Product | `product/` | Users, features, workflows and requirement IDs |
| Domain | `domain/` | Characters, polarities, narrative structure, scenes, simulations, comparisons |
| Visuals | `visuals/` | Prompt builder, thematic transformations, images and gallery |
| UX | `ux/` | Navigation, screen contracts, design system, bilingual and accessible UI |
| Technical | `technical/` | Architecture, persistence, import/export, migrations, security, performance |
| Quality | `quality/` | Automated/manual test matrix, fixtures, acceptance scenarios |
| Decisions | `decisions/` | Product/architecture decisions and unresolved design choices |
| Schemas | `schemas/` | Machine-readable proposed Karacter 6 document formats |
| Examples | `examples/` | King Klown and comparison reference fixtures |

## Normative language and priority

- **MUST** / **MUST NOT**: release-blocking requirements of the proposed v6 specification.
- **SHOULD**: strong recommendation; deviation must be documented.
- **MAY**: optional.
- **P0**: required for 6.0 release. **P1**: strongly desired, not a release blocker. **P2**: future.
- Requirement IDs such as `POL-03` remain stable even when text changes.
- `BASELINE (v5)` describes observed code/documentation; `TARGET (v6)` describes work to build.
- Decisions labelled **proposed** require approval before freezing contracts. User-confirmed rules are labelled **confirmed**.

## Authoritative order (if documents disagree)

1. Approved decisions in `decisions/DECISION_REGISTER.md`.
2. Validated [requirements](product/02_REQUIREMENTS.md) and [domain rules](domain/01_DOMAIN_MODEL.md).
3. [Data contracts](technical/02_DATA_AND_STORAGE.md) and `schemas/`.
4. Feature specifications and UX pages.
5. Examples and non-normative tips.

**Important:** Changes in the code must be accompanied by corresponding updates to documentation, schemas, examples and acceptance tests. Never quietly reinterpret an existing 0–6 axis, reverse a scale, overwrite portraits or translate user-written content.

## What already exists in v5

Local/offline HTML project; French/English switch; eight user-editable, complementary 0–6 polarity axes; Explorer/Studio views; character, emotion and story fields; relationships; eight situations and low/medium/high stakes; image prompts (portrait / four expressions / action); images imported and stored per theme/mode; TXT sheets and JSON/ZIP backups. See [v5 audit](02_V5_BASELINE_AUDIT.md) for known limitations.

## What changes in v6

Karacter becomes a **Create → Understand → Simulate** workspace. It clarifies the meaning of polarities, adds context-aware, explainable reaction *possibilities*, compares two characters under identical circumstances, supports an explicit character evolution timeline, improves relationships and batch/gallery workflows, and hardens file formats and recoverability.

## Implementation hand-off checklist

- [ ] Confirm the open decisions listed in the [register](decisions/DECISION_REGISTER.md).
- [ ] Implement the data schema and migration before expanding the UI.
- [ ] Preserve all v5 backups and portrait references during migration.
- [ ] Implement deterministic, explainable suggestions before considering generative AI.
- [ ] Provide FR/EN keys for every new UI string and accessible labels.
- [ ] Run full contract, compatibility, privacy, image and accessibility tests.
- [ ] Update this document's status to **Implemented** only once acceptance tests pass.


**Implementation update:** [6.1 release notes](RELEASE_6_1.md) · [status and verification](IMPLEMENTATION_STATUS.md).


**Implementation:** [6.2 stability notes](RELEASE_6_2.md) and [verification status](IMPLEMENTATION_STATUS.md).

### Kristal universe character pack (7.1)

See [release 7.1](RELEASE_7_1.md), [character profiles](universe/CHARACTER_INDEX.md), and [evidence and creative boundaries](universe/README.md).
