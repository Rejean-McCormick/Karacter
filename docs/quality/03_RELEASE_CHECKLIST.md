# Release checklist — Karacter 6.0

## Documentation and contracts

- [ ] Decision register reviewed by product owner; open blocking decisions resolved.
- [ ] All P0 feature requirements have implementation links.
- [ ] JSON schemas match runtime validation and example fixtures.
- [ ] Release notes explain new behavior and v5 compatibility.

## Functionality

- [ ] Linked 0–6 axes pass bidirectional change tests.
- [ ] Narrative and milestones persist without unwanted score changes.
- [ ] Simulation produces distinct, explainable possible reactions.
- [ ] A/B comparison is neutral and shareable.
- [ ] Portrait/expression/action slots are independent.
- [ ] Manual prompts/reactions are never silently overwritten.

## Data protection

- [ ] v5 full ZIP imports correctly, including artwork.
- [ ] v6 backup exports and restores on a second browser/device.
- [ ] Hash comparison succeeds for sample image assets.
- [ ] Corrupt imports fail without replacing existing collection.
- [ ] Local storage limitation and backup reminders are visible.

## Quality

- [ ] All [acceptance cases](02_ACCEPTANCE_CASES.md) pass.
- [ ] FR and EN interface labels complete.
- [ ] Full keyboard test and screen-reader spot check completed.
- [ ] Mobile, large zoom, file:// use and offline test completed.
- [ ] No external secret, tracking or uncontrolled network dependency.

## Publishing

- [ ] Distribution ZIP verified (extract, open, read, export, re-import).
- [ ] Version/release metadata displayed correctly.
- [ ] Known limitations documented honestly.
- [ ] GitHub Wiki links and README links checked.
