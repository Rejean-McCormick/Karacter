# Dépannage

## Je vois encore l’ancienne échelle `1 ↔ 7`

Vérifie l’adresse affichée dans ton navigateur. Ouvre bien **`index.html` de Karacter 4.4**, et non un ancien fichier comme `karacter_v4.html`. Dans la version actuelle, les deux curseurs vont de **0 à 6** et la somme de leurs valeurs reste **6**.

## Le style ou l’interface n’apparaît pas

Conserve l’arborescence complète : `index.html` doit pouvoir accéder à `css/main.css`, `js/data.js`, `js/app.js` et `assets/logo.svg`. Ne déplace pas uniquement `index.html` dans un autre dossier.

## Mes personnages ont disparu après le déplacement du projet

Les données locales peuvent dépendre de l’adresse `file://` et du navigateur. Réouvre l’ancienne version, exporte **Sauvegarde ZIP**, puis utilise **Importer** dans la nouvelle. Une sauvegarde externe est beaucoup plus fiable qu’un simple enregistrement local.

## Mon image n’apparaît pas

Vérifie le personnage **et le thème actif** : chaque univers a sa propre image. Le fichier doit être une image compatible et ne pas dépasser **30 Mo**. Si le navigateur bloque son stockage d’images, la sauvegarde ne pourra pas la conserver localement.

## Je ne vois pas les images dans la fiche TXT

C’est normal : les fiches TXT décrivent le personnage et référencent les portraits, **sans intégrer les images**. Exporte **JSON** ou **Sauvegarde ZIP** pour conserver les portraits.

## Le prompt ne change pas après un réglage

Tu as peut-être modifié le prompt à la main. Clique sur **Régénérer** pour reprendre les valeurs actuelles de la fiche et du thème. Attention : cela remplace les modifications manuelles du texte.

## L’importation ZIP refuse mon fichier

Karacter accepte ses propres sauvegardes ZIP. Une archive ZIP créée ou recompressée par un outil tiers peut ne pas être compatible. Décompresse-la et tente d’importer le **JSON** ou les **fiches TXT** directement.

## La sauvegarde locale échoue

Vérifie que le navigateur autorise le stockage local pour la page. Exporte les données que tu peux encore récupérer et conserve une **Sauvegarde ZIP** en dehors du navigateur. Ne supprime pas les données du site ou du navigateur avant d’avoir vérifié ton export.

[← Accueil du wiki](ACCUEIL.md)
