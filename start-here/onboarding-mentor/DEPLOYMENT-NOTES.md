# Onboarding Mentor — Deployment Notes

## Target deployment path

```
satoshium.ai/start-here/onboarding-mentor/
```

## What to copy

Copy the **entire contents** of this folder (not the folder itself) into your site repo at:

```
start-here/onboarding-mentor/
```

Final file tree inside your repo:

```
start-here/
  onboarding-mentor/
    index.html
    favicon.svg
    opengraph.jpg
    mentor-return-banner.js
    banner-demo.html
    DEPLOYMENT-NOTES.md
    assets/
      index-*.css
      index-*.js
```

## Base path assumption

All asset references in `index.html` are hardcoded to:

```
/start-here/onboarding-mentor/
```

The app **must** be served from exactly that path. Serving from any other path (e.g. `/mentor/` or `/`) will break asset loading.

If the target path ever changes, re-run the production build with the correct `BASE_PATH` env var:

```bash
BASE_PATH=/your/new/path/ PORT=3000 pnpm --filter @workspace/onboarding-mentor run build
```

## Static files included

| File | Purpose |
|---|---|
| `index.html` | App entry point — serves the React SPA |
| `assets/index-*.js` | Bundled JavaScript (React, Framer Motion, all app logic) |
| `assets/index-*.css` | Bundled CSS (Tailwind, all styles) |
| `favicon.svg` | Browser tab icon |
| `opengraph.jpg` | Social sharing image |
| `mentor-return-banner.js` | Standalone zero-dependency banner script for destination Satoshium pages |
| `banner-demo.html` | Drop-in adoption example for the return banner |

## No backend required

This is a fully static build. There is:

- No server-side logic
- No API dependency
- No auth dependency
- No database

All state is stored in `localStorage` under the key `satoshiumMentorState`.

## Serving the banner script on other domains

`mentor-return-banner.js` can be referenced from any Satoshium domain once the app is live:

```html
<script src="https://satoshium.ai/start-here/onboarding-mentor/mentor-return-banner.js" defer></script>
```

Pages that include this tag will automatically render the return banner and orientation map when a visitor arrives via a mentor context URL (`?mentor_source=onboarding-mentor&...`).

## Testing locally after deployment

To verify the build works locally before committing to your site repo:

```bash
# Serve from the correct nested path using any static file server
# Option A — Python (built-in)
mkdir -p /tmp/satoshium-test/start-here/onboarding-mentor
cp -r ./* /tmp/satoshium-test/start-here/onboarding-mentor/
cd /tmp/satoshium-test && python3 -m http.server 8080

# Option B — npx serve
npx serve . --listen 8080
# then visit: http://localhost:8080/start-here/onboarding-mentor/
```

Open: `http://localhost:8080/start-here/onboarding-mentor/`

Expected: the Onboarding Mentor wizard loads, dark theme is applied, the step flow advances correctly, and saved state persists across page reloads.

To test the return banner specifically, visit:

```
http://localhost:8080/start-here/onboarding-mentor/banner-demo.html?mentor_source=onboarding-mentor&mentor_stage=systems&mentor_path=track-whats-happening-in-satoshium&mentor_intent=contributor
```

Expected: the orientation map progress bar and banner strip appear at the top, the suggestion panel renders below them with contributor+systems suggestions.
