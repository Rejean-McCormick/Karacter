# Structure technique du projet

Karacter 4.4 est une application web locale **sans compilation, sans dépendances externes et sans serveur obligatoire**.

```text
index.html       — structure de l’interface
css/main.css     — styles, mise en page et adaptation mobile
js/data.js       — référentiels : thèmes, styles, polarités, archétypes et exemples
js/app.js        — logique : événements, édition, prompts, import/export, sauvegardes
assets/logo.svg  — logo de l’application
fiches/          — exemples de fiches texte à importer
portraits/       — dossier pour ranger manuellement les images originales
sauvegardes/     — dossier pour classer manuellement les exports
docs/wiki/       — documentation française
```

## Ordre de chargement

`index.html` charge les styles et les scripts nécessaires. Le fichier `js/data.js` fournit les référentiels à `js/app.js`, qui construit ensuite les vues et connecte les interactions. Les fichiers sont locaux : aucun service distant n’est appelé pour générer un portrait.

## Données et fichiers

- **`localStorage`** conserve l’état des personnages et les préférences de l’interface si le navigateur l’autorise.
- **`IndexedDB`** conserve les images ajoutées à Karacter si disponible.
- **TXT** permet de déplacer et modifier les fiches séparément.
- **JSON** contient l’état complet et les images encodées.
- **ZIP** regroupe le JSON complet et des copies TXT.

Le projet ne peut pas écrire librement sur le disque : les exports sont téléchargés par le navigateur.

## Modification du projet

Pour ajuster une couleur ou une disposition, modifie `css/main.css`. Pour modifier les thèmes ou les modèles de polarités, consulte `js/data.js`. Pour changer le comportement des boutons, le format des exports ou le prompt, consulte `js/app.js`.

**Conseil :** avant de modifier les structures de données, conserve une sauvegarde ZIP créée par l’application et vérifie ensuite l’importation d’anciennes fiches.

[← Accueil du wiki](ACCUEIL.md)
