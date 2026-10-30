# Proposed Karacter 6 architecture

## Constraints

- **Local-first and offline**: basic use by opening extracted `index.html`, with no mandatory account, build step or server.
- Avoid external runtime dependencies for core features unless pinned, bundled and justified.
- Use a modular separation even if shipping plain JS and a single HTML entry point.
- Keep readable portable files and explicit data backup/restore.

## Suggested project layout (outside this documentation package)

```text
Karacter/
├── index.html
├── assets/
│   └── logo.svg
├── css/
│   ├── tokens.css
│   ├── components.css
│   └── app.css
├── js/
│   ├── main.js                 # application bootstrap
│   ├── model/                  # validation, character, polarity, relationships
│   ├── engine/                 # scenarios, candidate generation, evidence, comparison
│   ├── visuals/                # theme, prompts, image slots
│   ├── storage/                # local persistence, backups, migrators
│   ├── ui/                     # view components and interactions
│   └── i18n/                   # English and French message catalogs
├── fiches/
├── portraits/
├── sauvegardes/
├── tests/
└── docs/                     # this documentation source of truth
```

These file names are architectural proposals. Implementers may choose classic scripts, bundled modules or a lightweight build if the resulting distributed app still works without a server. Test `file://` before adopting browser-only module imports that may be blocked by local-file origin policy.

## Layers and responsibilities

1. **Domain:** pure validation and derived values; no DOM or storage access.
2. **Simulation:** pure deterministic transformation from snapshots to candidates, with provenance.
3. **Visual prompt builder:** pure function from character/theme/mode/scene to brief text.
4. **Persistence:** atomic saves, image blob store, backup encode/decode, migrations.
5. **Presentation:** accessible views/controls, locale-aware labels and explicit user commands.
6. **Infrastructure:** error reporting, state changes, feature flags, version metadata.

## Reference pure-function signatures

```ts
normalizeCharacter(input: unknown): CharacterResult
validateWorkspace(input: unknown): ValidationResult<Workspace>
updatePole(axis: PolarityAxis, side: 'left'|'right', value: number): PolarityAxis
interpretPolarity(axis: PolarityAxis, context: ScenarioContext): PolarityInterpretation
buildSimulation(input: SimulationInput): SimulationRun
compareCharacters(input: ComparisonInput): Comparison
buildImagePrompt(input: PromptInput): PromptResult
migrateBackup(source: unknown): MigrationResult
```

No function above should mutate its inputs or read localStorage directly. In particular, `buildSimulation` must not call an external model or modify the character.

## UI state boundaries

- **Domain state:** saved characters, relationships, scenes, themes and chosen reaction artifacts.
- **Transient view state:** active tab, scroll, open edit panel, drag hover, user-entered in-progress prompt.
- **Persistent preference state:** locale, work depth, selected collection/theme/mode, consented recent settings.
- **Image state:** metadata in the workspace + blobs by stable asset ID.

## Event/command approach

Write handlers in terms of explicit commands (`CHARACTER_UPDATED`, `POLARITY_CHANGED`, `IMPORT_CONFIRMED`, `IMAGE_REPLACED`, `SIMULATION_SAVED`). Persist domain changes only after validation; keep undo history for destructive user interactions.

## No hidden APIs

Karacter 6 does not need server endpoints. If a backend is added later, version it separately; keep schema contracts and no-cloud default. Any AI provider use requires explicit user activation, privacy statement and failure fallback.

## Dependency policy

- Core model and import/export should remain testable under Node (or an equivalent JavaScript test runtime) without DOM.
- A single rendering framework is optional; avoid a second state model for the same character.
- Keep the app runnable from the distributed ZIP, not just from developer hot-reload tooling.
