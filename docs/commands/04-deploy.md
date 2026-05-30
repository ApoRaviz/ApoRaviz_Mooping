# Deploy Commands

GitHub Pages uses the `/mooping/` base path because this app is deployed from the `ApoRaviz/mooping` repository.

```bash
npm run build:gh-pages
```

Static files are generated at:

```text
dist/MooPing_Loyalty/browser
```

The workflow file is:

```text
.github/workflows/deploy-pages.yml
```
