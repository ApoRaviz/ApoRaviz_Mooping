# Commands

ไฟล์นี้รวมคำสั่งเฉพาะของ `ApoRaviz_Mooping`

ตอนนี้คำสั่งในไฟล์นี้ยังเป็นคำสั่งสำหรับ Angular frontend prototype ปัจจุบัน

ทิศทางระบบหน้าร้านจริงอ่านได้ที่:

```text
docs/product-spec.md
docs/implementation-plan.md
```

คำสั่งของ NestJS, PostgreSQL/Supabase, และ LINE OA production จะเพิ่มภายหลังเมื่อเริ่มทำ backend จริง

## Setup

```bash
npm install
```

ใช้ติดตั้ง dependencies จาก `package.json`

โปรเจ็คนี้ใช้ Angular 22 + Tailwind CSS v4 ตามกติกากลางใน `ApoRaviz_Workspace_Docs/angular/commands.md`

## Dev Server

```bash
npm start
```

Default local URL:

```text
http://localhost:4200
```

ถ้าต้องบังคับ Node 24 บน Windows:

```powershell
$env:PATH='C:\Users\tanon\AppData\Local\nvm\v24.16.0;' + $env:PATH
npm.cmd start
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

หรือรันด้วย Node 24 บน Windows:

```powershell
$env:PATH='C:\Users\tanon\AppData\Local\nvm\v24.16.0;' + $env:PATH
npm.cmd test -- --watch=false
```

Current prototype test coverage:

- App renders the MooPing Reward headline
- POS sale is staged first and must be confirmed before saving
- Undo latest sale restores the previous customer state
- Saving a reward for later moves it into saved rewards instead of losing it

หมายเหตุ:

```text
ชุด test นี้ยังสะท้อน prototype เดิม
เมื่อเริ่ม quick-sale-first refactor ต้องปรับ test ให้ตรงกับ product spec ใหม่
```

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

```powershell
$env:PATH='C:\Users\tanon\AppData\Local\nvm\v24.16.0;' + $env:PATH
npm.cmd test -- --watch=false
npm.cmd run build:gh-pages
```
