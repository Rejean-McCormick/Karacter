# Publishing Karacter 6.2 to GitHub

The ZIP is a portable source tree and the `.bundle` preserves the **original Karacter 6 baseline commit plus the 6.1 release commit**. No GitHub remote has been created or pushed for you.

## Using the source ZIP

1. Extract `Karacter_6_2_Repository.zip`.
2. Create an empty repository on GitHub.
3. In the extracted `Karacter6` folder run:

```bash
git init -b main
git add .
git commit -m "Karacter 6.2 release"
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

## Preserving original Git history (recommended)

```bash
git clone Karacter_6_2.bundle Karacter6
git -C Karacter6 remote set-url origin https://github.com/OWNER/REPOSITORY.git
git -C Karacter6 push -u origin main
```

Replace `OWNER/REPOSITORY` and choose the repository visibility deliberately. No license has been supplied by the owner; choose one only with the owner's approval. Character designs, screenshots, images and creative writing may have their own rights.

## Build and manual checks

```bash
npm test
python -m http.server 8080
```

Open `http://localhost:8080`. For important data, use **Backup / Import → Full ZIP** after creating characters. See `docs/RELEASE_6_2.md` and `docs/IMPLEMENTATION_STATUS.md` for the remaining native browser storage and accessibility checks.
