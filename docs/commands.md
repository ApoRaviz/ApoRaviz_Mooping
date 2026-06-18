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

โปรเจกต์นี้ปิด Angular persistent disk cache ใน `angular.json` เพราะ native LMDB cache เคยทำให้ Node abort บน macOS/Node environment ปัจจุบัน การปิด cache อาจทำให้ build ช้าลงเล็กน้อย แต่ไม่เปลี่ยน output ของ app

## Prototype Data

Member state ของ frontend prototype ถูกเก็บใน browser `localStorage` เพื่อให้ refresh แล้วข้อมูลทดลองยังอยู่

```text
localStorage = ข้อมูลจำลองเฉพาะ browser เครื่องนั้น
ไม่ใช่ production database
ไม่ใช้เก็บ secret, access token หรือ LINE userId จริง
```

ถ้าต้องการกลับค่าเริ่มต้น ให้เข้าโหมด `สมาชิก LINE` แล้วกด `รีเซ็ตข้อมูลทดลอง`

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
- Quick Sale earns and claims rewards without LINE
- Member Sale accumulation remains separate from Quick Sale
- Undo latest member sale restores the previous customer state
- Reward calculation covers 9, 10, 20, and existing 7 + new 5 sticks
- `LoyaltyStoreService` handles quick sale, member sale, undo, and reward claiming

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
