# Decision register and unresolved product questions

This register distinguishes **confirmed conversation requirements** from **proposed v6 implementation policies**. Items marked proposed are defaults to revisit before coding begins; they are not assertions of previous user approval.

| ID | Decision | Status | Rationale |
|---|---|---|---|
| D-001 | Karacter is the product name; keep supplied logo and teal identity | **Confirmed** | Product identity and supplied assets |
| D-002 | Each polarity uses two linked 0..6 values summing to 6; center 3/3 | **Confirmed** | Both sides are equal in moral value |
| D-003 | Themes may transform appearance without changing personality | **Confirmed** | Continuity across universes |
| D-004 | FR/EN bilingual interface; English-facing documentation and wiki | **Confirmed** | User requested both |
| D-005 | Editable individual TXT sheets; full backup preserves image bytes | **Confirmed** | Portability and archival |
| D-006 | Organized project; single root `index.html`, code/docs in folders | **Confirmed** | Maintainability |
| D-007 | Create / Understand / Simulate as conceptual navigation | **Proposed for v6** | Makes product positioning clear |
| D-008 | No mandatory backend or direct image API in v6 | **Proposed for v6** | Offline-first, scope control |
| D-009 | Simulation returns 3 explainable response possibilities | **Proposed for v6** | Distinctive contextual engine |
| D-010 | Comparison uses two characters and one common scenario | **Proposed for v6** | Educational/author utility |
| D-011 | Relationships stored canonically at workspace level | **Proposed for v6** | Referential integrity |
| D-012 | Milestones preserve baseline; no auto-change of axes | **Proposed for v6** | Authentic author control |
| D-013 | Schema version 6, separate from marketing release version | **Proposed for v6** | Stable import/export design |
| D-014 | Default locale detected from browser (`en` fallback) | **Open** | Current preference may differ |
| D-015 | Exact v6 import UX: replace-only P0 vs safe merge | **Open** | Merge complexity/data safety |
| D-016 | Detailed custom-axis validation (warn vs reject) | **Open** | Avoid patronizing or blocking creativity |
| D-017 | Exactly which starter scenarios and emotional vocabulary ship | **Open** | Content and pedagogy review |
| D-018 | P1 relationship graph and batch gallery import timing | **Open** | Avoid scope creep |

## How to resolve

For any changed decision, record date, approver, options, rationale, implementation consequences, and affected docs/tests. Do not silently update implementation to a preference without changing this register.

## Proposed approval questions for development kickoff

1. Should v6 keep the offline single-file launch behavior or may it require a local server?
2. Should importing a full backup only replace the workspace, or must merge-by-ID be implemented at launch?
3. Are three suggested reactions per simulation enough for the initial version?
4. Should `Create / Understand / Simulate` replace the existing `Editor / Gallery / Archetypes / Situations` tabs?
5. Does the product prioritize parent/child learning language or professional authoring as the default landing mode?

Until answered, the default specifications choose **offline**, **safe replace**, **three alternatives**, **three pillars**, and **Explorer as the first-visit mode**, but these are not irrevocably approved.
