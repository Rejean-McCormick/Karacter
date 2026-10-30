# UX microcopy, user education and empty/error states

## Key English / French strings (approved intent; final wording is editable)

| Key | English | Français |
|---|---|---|
| `nav.create` | Create | Créer |
| `nav.understand` | Understand | Comprendre |
| `nav.simulate` | Simulate | Simuler |
| `nav.gallery` | Gallery | Galerie |
| `polarity.explanation` | These values describe a preference in context, not a strength or a flaw. | Ces valeurs indiquent une préférence selon le contexte, pas une qualité ni un défaut. |
| `polarity.midpoint` | Both approaches are equally available as preferences. | Les deux approches occupent une place équivalente dans les préférences. |
| `sim.hypothesis` | Possible response — edit it to fit your character. | Réaction possible — modifie-la selon ton personnage. |
| `sim.why` | Why this might happen | Pourquoi cette réaction est possible |
| `compare.shared` | Same situation, different perspectives | Même situation, perspectives différentes |
| `backup.local` | Saved in this browser; export a backup to keep a separate copy. | Enregistré dans ce navigateur; exporte une sauvegarde pour garder une copie distincte. |
| `prompt.external` | Copy this prompt into an external image generator. | Copie ce prompt dans un générateur d’images externe. |
| `upload.confirm` | Replace the existing image in this slot? | Remplacer l’image existante dans cet emplacement? |

## Empty states

- No characters: "Create your first character or import a TXT sheet." / "Crée ton premier personnage ou importe une fiche TXT."
- No image: "No image saved for this character, theme and mode." / "Aucune image enregistrée pour ce personnage, ce thème et ce mode."
- No relationship: "Add another character to explore a relationship." / "Ajoute un autre personnage pour explorer une relation."
- No scenario result: "Choose a scenario to explore possible reactions." / "Choisis une situation pour explorer des réactions possibles."
- Missing narrative details: "Suggestions use the details you've provided; add motivations for richer explanations." / "Les suggestions utilisent les informations fournies; ajoute des motivations pour obtenir davantage de nuances."

## Destructive action copy

- Delete character: mention number of linked images, relationships and saved references; offer cancel.
- Import full backup: mention collection replacement, show differences and offer export-current-first.
- Rebuild prompt: warn if user manually edited current text.
- Regenerate simulation: warn if an existing choice is edited/locked; don't discard it silently.

## Pedagogical note

Avoid labeling children or real people. The explainer should say: "These are invented characters and narrative choices. A person can behave differently in different situations."
