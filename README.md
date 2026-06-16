# ApoRaviz MooPing Reward

`ApoRaviz_Mooping` คือ web app demo สำหรับระบบขายและสะสมสิทธิ์ร้านหมูปิ้ง

โจทย์หลักคือร้านมีโปรโมชัน:

```text
ซื้อครบ 10 ไม้ รับ reward 1 สิทธิ์
```

ระบบนี้ช่วยให้พนักงานหน้าร้านบันทึกยอดขายเร็วขึ้น ลูกค้าเห็นยอดสะสมชัดขึ้น และเจ้าของร้านเห็นแนวทางต่อยอดไปสู่ LINE OA / backend จริง

ตอนนี้โปรเจกต์นี้หยุดไว้ก่อนตามแผน workspace ใหม่ ถ้าจะเรียนจากบทเรียนของ MooPing ให้อ่านที่ `ApoRaviz_Workspace_Docs/projects/mooping/`

## What This Project Does

- เลือกลูกค้าและบันทึกยอดซื้อผ่าน POS demo
- ใช้ loyalty rule: ครบทุก 10 ไม้ ได้ reward 1 สิทธิ์
- รองรับ pending rewards และ saved rewards เพื่อไม่ให้สิทธิ์ลูกค้าหาย
- มี iPad-style display panel สำหรับโชว์สถานะให้ลูกค้าดูหน้าร้าน
- มี mock LINE OA message panel เพื่อสื่อทิศทาง notification ใน production

## Current MVP Features

- Quick sale buttons
- Confirm before commit
- Clear draft
- Undo latest sale
- Reward choice
- Save reward for later
- Mock LINE OA messages
- GitHub Pages deploy workflow

## Tech Stack

- Angular 22
- Node 24 LTS
- TypeScript 6.0.x strict
- Tailwind CSS v4
- Standalone components
- Angular signals/computed state
- SSR-ready Angular scaffold

## Development

```bash
npm install
npm start
```

Open:

```text
http://localhost:4200/
```

## Verify

```bash
npm test -- --watch=false
npm run build:gh-pages
```

## Documentation

- [Product Spec](docs/product-spec.md)
- [Commands](docs/commands.md)
- [Implementation Plan](docs/implementation-plan.md)
- [Progress](progress.md)

## Learning Boundary

```text
ApoRaviz_Mooping/docs/                  = app-specific spec, plan, commands
ApoRaviz_Workspace_Docs/projects/mooping/ = MooPing learning case study
ApoRaviz_Workspace_Docs/angular/          = Angular/Tailwind concept กลาง
```
