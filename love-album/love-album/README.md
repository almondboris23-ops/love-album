# Pink Vintage Love Album

Static site. No database, no build step.

## Structure
```
love-album/
├── index.html          page shell
├── vercel.json         Vercel config
├── css/style.css       all styling and animation
├── js/config.js        YOUR content (names, messages, letter, photo paths)
├── js/main.js          album logic (ribbon, page flip, navigation)
└── assets/photos/      put your photos here (01.jpg, 02.jpg, ...)
```

## Customize
1. Add photos to `assets/photos/` (portrait photos around 1000x1300 px, under 400 KB each).
2. Edit `js/config.js`: names, titles, messages, letter. Add or remove page objects freely.
3. Open `index.html` in a browser to preview.

## Deploy on Vercel
- Dashboard: push the folder to GitHub, import it in Vercel, Framework Preset "Other", leave build and output settings empty, Deploy.
- CLI: `npm i -g vercel`, then run `vercel --prod` in this folder.
