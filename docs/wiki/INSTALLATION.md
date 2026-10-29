# Installation and launch

1. Extract the entire Karacter ZIP into a directory of your choice.
2. Keep `index.html` and its neighboring `css/`, `js/` and `assets/` folders together.
3. Double-click `index.html` to open the application in a browser.
4. Use **FR / EN** in the top bar to choose the interface language.

No account, installation or build tools are required. The app itself works without a network connection. To generate new images, copy its prompt into ChatGPT or another image generator separately.

## Browser storage

Character data uses `localStorage` and portraits use `IndexedDB` when available. Local-file storage behavior depends on the browser and can change when the folder or file path changes. **Export a Backup ZIP before moving or replacing the project.** The application cannot automatically write files into its own project folders.

If a browser blocks the local-file storage features, use a compatible browser or open the project through a simple local web server; your saved data may live under a different origin in each case.

[Wiki home](HOME.md) · [Troubleshooting](TROUBLESHOOTING.md)
