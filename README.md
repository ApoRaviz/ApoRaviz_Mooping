# ApoRaviz MooPing Reward

`ApoRaviz_Mooping` คือโปรเจ็ค Web Application สำหรับระบบสะสมสิทธิ์ร้านหมูปิ้งหน้าร้านจริง

Product display name:

```text
MooPing Reward
```

แนวคิดหลัก:

```text
ซื้อครบ 10 เลือกของแถมได้
แอด LINE แล้วร้านช่วยจำยอดสะสมให้ ไม่ต้องพกบัตร
```

ระบบนี้ไม่ได้ตั้งใจเป็น online ordering, cart, payment หรือ app ที่บังคับลูกค้าทุกคนต้องสมัครก่อนซื้อ

เป้าหมายคือช่วยร้านหมูปิ้งช่วงเช้าที่ลูกค้าส่วนใหญ่รีบไปทำงานหรือพาลูกไปโรงเรียน โดยให้การขายยังเร็วเหมือนเดิม และให้ LINE OA เป็นตัวช่วยสำหรับลูกค้าที่อยากสะสมข้ามรอบ

## Product Rule

```text
Fast sale first, reward optional, LINE only when useful.
```

แปลเป็น flow หน้าร้าน:

- ลูกค้าซื้อปกติได้ทันที
- ซื้อครบ 10 ไม้ในครั้งเดียว ได้ของแถมทันทีโดยไม่ต้องแอด LINE
- ลูกค้าที่ซื้อประจำสามารถแอด LINE เพื่อให้ร้านช่วยจำยอดสะสม
- Reward เลือกได้จาก หมูปิ้ง, น้ำเปล่า, ข้าวเหนียว
- LINE OA ใช้แจ้งเตือนยอดสะสม ไม่ใช่บังคับให้ซื้อออนไลน์

## Current State

โปรเจ็คตอนนี้มี Angular frontend prototype เดิมที่เคยใช้ทดลอง POS/reward/LINE mock flow

ทิศทางใหม่คือจะค่อย ๆ ปรับจาก demo ไปเป็นระบบหน้าร้านจริง:

- หน้า default ต้องเป็น quick sale สำหรับ iPad
- Mock visual ที่ไม่ช่วย flow หน้าร้านสามารถเอาออกได้
- Logic ต้องย้ายออกจาก `App` ไป service/store
- LINE integration จริงต้องผ่าน backend เท่านั้น
- Backend ระยะยาวใช้ NestJS + PostgreSQL/Supabase

## Tech Stack

- Angular 22
- Node 24 LTS
- TypeScript 6.0.x strict
- Tailwind CSS v4
- Standalone components
- Angular signals/computed state
- SSR-ready Angular scaffold

Planned production stack:

- NestJS backend
- PostgreSQL หรือ Supabase
- LINE Messaging API ผ่าน backend

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
- [Implementation Plan](docs/implementation-plan.md)
- [Commands](docs/commands.md)
- [Progress](progress.md)

## Learning Boundary

```text
ApoRaviz_Mooping/docs/                    = product spec, plan, commands ของ app นี้
ApoRaviz_Workspace_Docs/projects/mooping/ = case study และบทเรียนจากระบบหมูปิ้ง
ApoRaviz_Workspace_Docs/backend/          = LINE OA, webhook, backend security
ApoRaviz_Workspace_Docs/nestjs/           = NestJS concept กลาง
ApoRaviz_Workspace_Docs/postgresql/       = PostgreSQL/Supabase concept กลาง
```

โปรเจ็คนี้จะไม่มีโหมดเรียนแยกใน repo ตัวเอง ถ้าเจอบทเรียนที่ใช้ซ้ำได้ให้บันทึกกลับไป `ApoRaviz_Workspace_Docs`
