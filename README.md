# dsgnly

JavaScript and CSS for the [DSGNLY](https://www.dsgnly.com) marketing site, built in Webflow.

---

## How it works

Webflow can't host custom JS/CSS directly. Instead, scripts in this repo are committed to GitHub and served to the live site via the [jsDelivr CDN](https://www.jsdelivr.com/), which automatically mirrors any public GitHub repo.

```
Edit src/ → build → commit & push → jsDelivr serves the new file
```

A `<script>` tag in Webflow's **Project Settings → Custom Code** loads the file:

```html
<script src="https://cdn.jsdelivr.net/gh/mxhfxz/dsgnly@main/dist/background-video.js"></script>
```

---

## Project structure

```
dsgnly/
├── src/
│   ├── site.js          # Main site interactions (minified → dist/site.min.js)
│   └── forms.js         # Form logic (minified → dist/forms.min.js)
├── dist/
│   ├── background-video.js   # Background video player (standalone, no build step)
│   ├── background-video.css  # Companion styles for background video
│   ├── site.min.js           # Built output — do not edit directly
│   └── forms.min.js          # Built output — do not edit directly
├── package.json
└── package-lock.json
```

> `dist/background-video.*` are standalone files — edit them directly, no build step needed.
> Files in `src/` require a build step before the changes are live.

---

## Setup

```bash
git clone https://github.com/mxhfxz/dsgnly.git
cd dsgnly
npm install
```

Open in VS Code:

```bash
code .
```

---

## Making changes

### For `src/` files (site.js, forms.js)

1. Edit the source file in `src/`
2. Build:
   ```bash
   npm run build        # builds site.js → dist/site.min.js
   npm run build:forms  # builds forms.js → dist/forms.min.js
   npm run build:all    # builds both
   ```
3. Commit and push:
   ```bash
   git add dist/ src/
   git commit -m "your message"
   git push
   ```

### For standalone `dist/` files (background-video.*)

1. Edit the file directly in `dist/`
2. Commit and push — no build step needed

### After pushing

jsDelivr caches files for **10–60 seconds** on a cache miss. Most changes appear within a minute. If they don't, purge the cache manually (see below).

---

## Purging the jsDelivr cache

Hit this URL in your browser, replacing the path with the file you updated:

```
https://purge.jsdelivr.net/gh/mxhfxz/dsgnly@main/dist/background-video.js
```

Pattern: `https://purge.jsdelivr.net/gh/<user>/<repo>@<branch>/<path>`

---

## Pinning to a specific commit (recommended for production)

Using `@main` in the jsDelivr URL always serves the latest commit on `main`. For production stability, pin to a specific commit SHA instead:

```html
<!-- Pinned — won't change until you update the URL -->
<script src="https://cdn.jsdelivr.net/gh/mxhfxz/dsgnly@7a9f01b/dist/background-video.js"></script>
```

To update the live site, change the SHA in Webflow's custom code settings to the new commit hash.

---

## Common issues

| Problem | Fix |
|---|---|
| Script not loading on Webflow | jsDelivr serves files with correct `Content-Type`. If it's wrong, check the file extension is `.js` (not `.ts`, `.mjs`, etc.) |
| Changes not appearing after push | Wait 60s, then purge the cache using the URL above |
| Build fails | Check Node version (`node -v`, recommend v18+). Run `npm install` to restore dependencies |
| `dist/site.min.js` not found | Run `npm run build` — the file is not committed until you build and push |

---

## Links

- **Live site:** [https://www.dsgnly.com](https://www.dsgnly.com)
- **Webflow project:** *(add link here)*
- **GitHub repo:** [https://github.com/mxhfxz/dsgnly](https://github.com/mxhfxz/dsgnly)
- **jsDelivr docs:** [https://www.jsdelivr.com/features](https://www.jsdelivr.com/features)
