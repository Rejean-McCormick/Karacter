# Fiches TXT, sauvegardes et importations

## Quel format choisir ?

| Commande | Ce qui est téléchargé | Portraits inclus ? | Usage principal |
|---|---|---|---|
| **Fiche TXT** | La fiche modifiable d’un personnage | Non | Lire, éditer et réimporter un personnage |
| **Fiches TXT** | Une archive ZIP contenant une fiche TXT par personnage | Non | Classer les fiches séparément |
| **Prompts TXT** | Les instructions d’images de la collection affichée | Non | Générer les portraits dans un autre outil |
| **JSON** | La sauvegarde complète de la collection et des images | Oui | Restaurer ou transférer la collection |
| **Sauvegarde ZIP** | Un JSON complet et des copies TXT des fiches et prompts | Oui, dans le JSON contenu dans le ZIP | Conserver l’ensemble du travail |

Les dossiers du projet sont des emplacements de rangement **manuel**. Les fichiers sont téléchargés par le navigateur, puis déplacés si tu le souhaites dans `fiches/`, `portraits/` ou `sauvegardes/`.

## Exporter une fiche TXT

1. Dans **Atelier**, sélectionne le personnage.
2. Clique sur **Fiche TXT**.
3. Conserve le fichier téléchargé où tu le souhaites.

Le TXT est lisible et peut être modifié avec un éditeur de texte. Les sections de polarités contiennent aussi des données structurées pour préserver les nuances visuelles et les contextes. **Ne supprime pas les balises** si tu veux le réimporter.

## Restaurer une sauvegarde complète

1. Ouvre l’application cible.
2. Clique sur **Importer**.
3. Sélectionne la **Sauvegarde ZIP** créée par Karacter, ou le fichier **JSON** complet.
4. Confirme le remplacement de la collection actuelle lorsque l’application le demande.
5. Vérifie personnages, polarités et portraits dans la Galerie.

**Attention :** importer une sauvegarde JSON ou ZIP complète **remplace la collection courante**. Exporte donc une sauvegarde de la collection actuelle avant l’opération.

## Importer des fiches TXT

Utilise **Importer** avec un ou plusieurs fichiers `.txt` créés par Karacter. Si l’identifiant existe déjà, l’application propose de remplacer les informations du personnage en conservant ses portraits. Un nouveau personnage est ajouté si son identifiant n’existe pas.

La fonction accepte aussi les archives ZIP de fiches produites par Karacter. Les archives ZIP compressées par d’autres outils peuvent nécessiter d’être **décompressées d’abord** avant d’importer les TXT ou JSON.

## Migrer d’une ancienne version

1. Dans l’ancienne version, clique sur **Sauvegarde ZIP**.
2. Garde une copie du fichier téléchargé.
3. Ouvre **`index.html`** de Karacter 4.4.
4. Clique sur **Importer** et sélectionne la sauvegarde.
5. Révise les valeurs des polarités : certaines anciennes échelles sont converties approximativement.

Le stockage d’un fichier ouvert avec `file://` dépend du navigateur et parfois du chemin du fichier : **ne compte pas sur une migration automatique**.

[← Accueil du wiki](ACCUEIL.md) · [Dépannage](DEPANNAGE.md)
