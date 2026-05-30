# CI/CD Commands

GitHub Actions workflow:

```text
.github/workflows/deploy-pages.yml
```

The workflow runs on every push to `main`:

```text
npm ci
npm test -- --watch=false
npm run build:gh-pages
deploy to GitHub Pages
```

Production URL:

```text
https://aporaviz.github.io/mooping/
```

Actions page:

```text
https://github.com/ApoRaviz/mooping/actions
```

Local verification before pushing:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm test -- --watch=false
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm run build:gh-pages
```
