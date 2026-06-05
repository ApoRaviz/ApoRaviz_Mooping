# Commands

เอกสารนี้รวมคำสั่งของโปรเจกต์ `ApoRaviz_Mooping` ไว้ไฟล์เดียว เพราะตอนนี้คำสั่งยังสั้นและผูกกับ repo นี้โดยตรง

Command pattern กลางของ Angular และ Git อยู่ที่:

```text
_docs/angular/commands.md
_docs/git/commands.md
```

ไฟล์นี้เก็บรายละเอียดเฉพาะ MooPing เช่น repo URL, base-href, output path และ test coverage ของโปรเจกต์นี้

## Setup

```bash
npm install
```

ใช้ติดตั้ง dependencies จาก `package.json`

## Dev Server

```bash
npm start
```

Default local URL:

```text
http://localhost:4200
```

ถ้าต้องบังคับ Node 24 และระบุ port:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH ./node_modules/.bin/ng serve --host 127.0.0.1 --port 4200
```

## Build

```bash
npm run build
```

ใช้ build production และตรวจว่า Angular compile/prerender ผ่าน

## GitHub Pages Build

```bash
npm run build:gh-pages
```

GitHub Pages ใช้ base path:

```text
/ApoRaviz_Mooping/
```

Static files ถูกสร้างที่:

```text
dist/ApoRaviz_Mooping/browser
```

## Test

```bash
npm test -- --watch=false
```

หรือรันด้วย Node 24 แบบชัดเจน:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm test -- --watch=false
```

Current important test coverage:

- App renders the MooPing loyalty headline
- POS sale is staged first and must be confirmed before saving
- Undo latest sale restores the previous customer state
- Saving a reward for later moves it into saved rewards instead of losing it

## Git

```bash
git status --short --branch
git diff --cached --stat
git add .
git commit -m "Describe the change"
git push
```

Remote repository:

```text
https://github.com/ApoRaviz/ApoRaviz_Mooping.git
```

## CI/CD

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
https://aporaviz.github.io/ApoRaviz_Mooping/
```

Actions page:

```text
https://github.com/ApoRaviz/ApoRaviz_Mooping/actions
```

Local verification before pushing:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm test -- --watch=false
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm run build:gh-pages
```
