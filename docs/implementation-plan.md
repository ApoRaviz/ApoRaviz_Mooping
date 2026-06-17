# MooPing Reward Implementation Plan

ไฟล์นี้คือแผนทำงานใหม่ของ `ApoRaviz_Mooping` หลังปรับทิศทางเป็นระบบหน้าร้านจริง

หลักของระบบ:

```text
Fast sale first, reward optional, LINE only when useful.
```

## Working Rules

- Product display name ใช้ `MooPing Reward`
- Repo path ใช้ `ApoRaviz_Mooping`
- โปรเจ็คนี้ไม่มีโหมดเรียนแบบจับมือทำ
- ความรู้กลาง เช่น LINE OA, NestJS, PostgreSQL, webhook, security ให้บันทึกใน `ApoRaviz_Workspace_Docs`
- เอกสาร product spec, implementation plan, commands, progress อยู่ใน repo นี้
- Comment ใน code ใช้เฉพาะจุดสำคัญที่ช่วยเข้าใจ function, business rule, หรือ flow
- Frontend ใช้ Angular 22, Tailwind CSS v4, signals, standalone components, strict TypeScript
- Backend ระยะยาวใช้ NestJS + PostgreSQL/Supabase + Node.js 24+
- LINE Messaging API ต้องผ่าน backend เท่านั้น
- ห้ามเก็บ secret ใน frontend
- ทุก flow ต้องออกแบบให้ staff ขายตอนเช้าได้เร็วกว่า หรืออย่างน้อยไม่ช้ากว่าบัตร stamp กระดาษ

## Current Baseline

- [x] Angular frontend scaffold พร้อม SSR/prerender config
- [x] Tailwind CSS v4 setup
- [x] GitHub Pages workflow สำหรับ frontend artifact
- [x] POS/reward/display/LINE mock components รุ่น demo
- [x] Business rule เดิม: ซื้อครบ 10 ไม้ได้ 1 reward
- [x] Pending sale ก่อน confirm
- [x] Undo latest sale
- [x] Saved reward concept
- [x] Workspace Docs มีบทเรียน MooPing เดิม
- [x] Product name เปลี่ยนเป็น `MooPing Reward`

## Step 1 - Reframe Product From Demo To Real Shop

- [x] 1.1 กำหนดว่า product ไม่ใช่ online ordering
- [x] 1.2 กำหนดว่า LINE เป็น optional helper ไม่ใช่ gate
- [x] 1.3 กำหนดลูกค้า 4 กลุ่ม: quick buyer, regular buyer, bulk buyer, reward-sensitive buyer
- [x] 1.4 กำหนด reward options ใหม่: หมูปิ้ง, น้ำเปล่า, ข้าวเหนียว
- [x] 1.5 กำหนดหลัก `Fast sale first, reward optional, LINE only when useful`
- [x] 1.6 ปรับ README ให้สื่อว่าเป็นระบบหน้าร้านจริง ไม่ใช่ demo showcase
- [x] 1.7 ปรับ progress ให้แยก completed demo baseline กับ new real-shop roadmap
- [x] 1.8 ปรับ project skill ให้ย้ำว่า learning กลางต้องไป Workspace Docs

## Step 2 - Remove Or Demote Demo Mock UX

- [x] 2.1 เอา first screen แบบ showcase/demo ออก
- [ ] 2.2 เอา animation หมูปิ้งใน `display-panel` ออกหรือย้ายเป็น optional brand decoration
- [ ] 2.3 เอา `LINE OA Mock` panel ออกจากหน้า default cashier flow
- [x] 2.4 เปลี่ยน wording จาก `Demo`, `Mock`, `POS Workspace` ให้เป็นภาษาหน้าร้านจริง
- [ ] 2.5 เก็บ mock เฉพาะใน data adapter/test ไม่ใช่ให้เป็น concept หลักของ UI
- [x] 2.6 ปรับ navigation ให้เหมาะกับ iPad POS ไม่ใช่ landing page

## Step 3 - Quick Sale First UI

- [x] 3.1 ทำหน้า default เป็น `Quick Sale`
- [x] 3.2 ปุ่มหลักต้องใหญ่และกดง่าย: `+1`, `+5`, `+10`, `+20`
- [x] 3.3 มีปุ่ม correction ชัดเจน: ลบ 1, ล้างรายการ, undo/void
- [x] 3.4 แสดง pending ticket ก่อน confirm
- [x] 3.5 ถ้าครบ 10 ให้ขึ้น reward choice ทันที
- [x] 3.6 ลูกค้า quick sale ต้องจบรายการได้โดยไม่ต้องเลือก customer
- [x] 3.7 รองรับซื้อ 10, 20, 30 ไม้ แล้วคำนวณ reward หลายสิทธิ์
- [ ] 3.8 ตรวจ iPad landscape viewport เป็นหลัก
- [ ] 3.9 ตรวจ mobile/desktop เป็นรอง
- [ ] 3.10 เพิ่ม empty/offline/loading/error state ที่ staff เข้าใจเร็ว

## Step 4 - Reward Choice System

- [x] 4.1 เปลี่ยน reward type เป็น `pork-stick`, `water`, `sticky-rice`
- [x] 4.2 เอา `save-later` ออกจาก reward choice ของ quick sale
- [x] 4.3 สำหรับ member sale ให้รองรับ reward ค้างอยู่แยกจากการเลือกของแถม
- [x] 4.4 แยก reward earning กับ reward claiming เป็นคนละ event
- [ ] 4.5 ทำ state สำหรับ reward: pending, claimed, voided
- [ ] 4.6 เพิ่ม audit note เมื่อ staff claim/void reward
- [ ] 4.7 ทดสอบซื้อครบ 10, เกิน 10, หลาย reward, เลือกของแถม, void

## Step 5 - Member Sale And LINE Optional Flow

- [x] 5.1 เพิ่มโหมด `Member Sale` แยกจาก `Quick Sale`
- [ ] 5.2 ค้นหาลูกค้า member จากชื่อเล่น, เบอร์ท้าย 4 หลัก, หรือ LINE display name
- [ ] 5.3 แสดง LINE status: linked, unlinked, blocked/unknown
- [ ] 5.4 เพิ่ม callout สั้น ๆ สำหรับลูกค้าที่ยังไม่แอด LINE
- [ ] 5.5 ออกแบบ staff-assisted link code สำหรับ v1
- [ ] 5.6 ผูก LINE userId กับ customer profile ผ่าน backend
- [x] 5.7 ไม่บังคับให้ quick buyer เข้า member flow
- [ ] 5.8 มี unlink/stop notification path ในแผน admin

## Step 6 - Frontend Architecture Refactor

- [ ] 6.1 ย้าย mock customer data ออกจาก `App`
- [ ] 6.2 สร้าง `LoyaltyStoreService` สำหรับ state หลัก
- [ ] 6.3 สร้าง pure helper สำหรับคำนวณ reward
- [ ] 6.4 แยก `QuickSalePanel`
- [ ] 6.5 แยก `MemberSalePanel`
- [ ] 6.6 แยก `RewardChoicePanel`
- [ ] 6.7 แยก `ShiftStatusPanel`
- [ ] 6.8 แยก repository interface: mock adapter ก่อน, HTTP adapter ภายหลัง
- [ ] 6.9 ลด logic ใน `App` ให้เหลือ composition และ event wiring
- [ ] 6.10 เพิ่ม SSR-safe persistence เฉพาะข้อมูล draft ที่ไม่ใช่ secret

## Step 7 - Local Prototype Persistence

- [ ] 7.1 เพิ่ม localStorage เฉพาะ development/prototype
- [ ] 7.2 guard browser API ด้วย SSR-safe pattern
- [ ] 7.3 เก็บเฉพาะข้อมูลจำลองที่ไม่มี secret
- [ ] 7.4 เพิ่มปุ่ม reset prototype data
- [ ] 7.5 เขียน docs ว่า localStorage ไม่ใช่ production database

## Step 8 - Backend API Contract

- [ ] 8.1 กำหนด API contract ก่อนเริ่ม NestJS
- [ ] 8.2 `POST /sales/quick` สำหรับ quick sale
- [ ] 8.3 `POST /sales/member` สำหรับ member sale
- [ ] 8.4 `POST /rewards/:id/claim` สำหรับแลก reward
- [ ] 8.5 `POST /transactions/:id/void` สำหรับ void รายการ
- [ ] 8.6 `GET /customers/search` สำหรับค้นหา member
- [ ] 8.7 `POST /customers` สำหรับสร้าง member
- [ ] 8.8 `POST /line/webhook` สำหรับ LINE webhook
- [ ] 8.9 response ของ sale ต้องคืน remaining stamps, earned rewards, pending rewards, และ notification status
- [ ] 8.10 ทุก API ที่เปลี่ยนข้อมูลต้อง validate input

## Step 9 - Database Design

- [ ] 9.1 ออกแบบตาราง `customers`
- [ ] 9.2 ออกแบบตาราง `sale_transactions`
- [ ] 9.3 ออกแบบตาราง `reward_claims`
- [ ] 9.4 ออกแบบตาราง `line_accounts`
- [ ] 9.5 ออกแบบตาราง `line_notification_logs`
- [ ] 9.6 ออกแบบตาราง `staff_users`
- [ ] 9.7 ออกแบบตาราง `audit_logs`
- [ ] 9.8 ใช้ database transaction ตอนบันทึก sale + reward
- [ ] 9.9 เพิ่ม index สำหรับ line_user_id, customer search, created_at
- [ ] 9.10 กำหนด retention policy เบื้องต้นสำหรับ log

## Step 10 - NestJS Backend

- [ ] 10.1 สร้าง backend workspace หรือ folder strategy ให้ชัดเจน
- [ ] 10.2 เพิ่ม modules: sales, rewards, customers, line, admin, audit
- [ ] 10.3 Business logic อยู่ใน services ไม่อยู่ใน controllers
- [ ] 10.4 เพิ่ม DTO/schema validation
- [ ] 10.5 เพิ่ม config module สำหรับ env
- [ ] 10.6 เพิ่ม database service/repository layer
- [ ] 10.7 เพิ่ม test สำหรับ reward calculation
- [ ] 10.8 เพิ่ม test สำหรับ sale transaction
- [ ] 10.9 เพิ่ม test สำหรับ void/idempotency
- [ ] 10.10 เพิ่ม health check endpoint

## Step 11 - LINE OA Production Integration

- [ ] 11.1 สร้าง LINE Messaging API channel
- [ ] 11.2 ตั้งค่า webhook URL ไปที่ backend
- [ ] 11.3 เก็บ `LINE_CHANNEL_SECRET` ใน backend env
- [ ] 11.4 เก็บ `LINE_CHANNEL_ACCESS_TOKEN` ใน backend env
- [ ] 11.5 ตรวจ webhook signature ก่อน process
- [ ] 11.6 รับ follow event เพื่อเก็บ line userId
- [ ] 11.7 กัน duplicate webhook ด้วย `webhookEventId`
- [ ] 11.8 process webhook แบบ asynchronous เท่าที่ทำได้
- [ ] 11.9 ส่ง push message หลัง sale เฉพาะ member ที่ linked แล้ว
- [ ] 11.10 log request id/status ของการส่ง message
- [ ] 11.11 จัดการกรณี user block/unfollow
- [ ] 11.12 เตรียม account linking หรือ link code flow สำหรับรอบถัดไป

## Step 12 - Notification Policy

- [ ] 12.1 ส่ง purchase summary หลัง member sale
- [ ] 12.2 ส่ง near-reward เฉพาะเมื่อเหลือ 1-2 ไม้
- [ ] 12.3 ส่ง reward-earned เมื่อได้ reward ใหม่
- [ ] 12.4 ส่ง reward-claimed เมื่อเลือกของแถมแล้ว
- [ ] 12.5 จำกัดความถี่ reminder เพื่อไม่ให้รบกวน
- [ ] 12.6 ไม่ส่งข้อความสำหรับ quick sale anonymous
- [ ] 12.7 ไม่ใส่ข้อมูลส่วนตัวเกินจำเป็นใน message
- [ ] 12.8 ทำ message template สั้นและสุภาพ

## Step 13 - Admin And Security

- [ ] 13.1 เพิ่ม admin login เฉพาะ owner/staff
- [ ] 13.2 แยก role owner กับ staff
- [ ] 13.3 Staff เห็นเฉพาะ flow ที่จำเป็นต่อหน้าร้าน
- [ ] 13.4 Owner ดูรายงานและตั้งค่า reward ได้
- [ ] 13.5 ทุก void/undo สำคัญต้องบันทึก audit log
- [ ] 13.6 Mask ข้อมูลส่วนตัว เช่น เบอร์โทร
- [ ] 13.7 ห้าม secret อยู่ใน frontend หรือ GitHub
- [ ] 13.8 ตั้ง CORS เฉพาะ origin ที่ใช้จริง
- [ ] 13.9 เพิ่ม rate limit ให้ webhook/admin login/API สำคัญ
- [ ] 13.10 เพิ่ม backup/export strategy ขั้นต้น

## Step 14 - Real Shop Trial Checklist

- [ ] 14.1 ทดสอบ quick sale ตอนคิวแน่น
- [ ] 14.2 ทดสอบซื้อ 10 ไม้แล้วรับ reward โดยไม่แอด LINE
- [ ] 14.3 ทดสอบ member sale สำหรับลูกค้าประจำ
- [ ] 14.4 ทดสอบ link LINE กับ customer
- [ ] 14.5 ทดสอบ LINE message หลังซื้อ
- [ ] 14.6 ทดสอบ internet ช้า/หลุด
- [ ] 14.7 ทดสอบ staff กดผิดและ void
- [ ] 14.8 ทดสอบ owner ดูรายการย้อนหลัง
- [ ] 14.9 วัดเวลาขายต่อรายการเทียบกับบัตร stamp กระดาษ
- [ ] 14.10 เก็บ feedback จาก staff และลูกค้า

## Step 15 - Portfolio Case Study Later

- [ ] 15.1 เขียน problem/constraint จากร้านเช้าจริง
- [ ] 15.2 เล่า decision ว่าทำไมไม่บังคับ LINE
- [ ] 15.3 เล่า architecture Angular + NestJS + PostgreSQL + LINE OA
- [ ] 15.4 โชว์ screenshot เฉพาะ mock data
- [ ] 15.5 ไม่เปิดเผยข้อมูลลูกค้าจริง
- [ ] 15.6 ย้ายบทเรียน reusable ไป `ApoRaviz_Workspace_Docs/projects/mooping/`

## Definition Of Done For Current Planning Round

- [x] Product direction เปลี่ยนเป็น real-shop hybrid reward
- [x] LINE ถูกวางเป็น optional helper
- [x] Reward options ใหม่ถูกระบุใน docs
- [x] Admin/security ถูกวางในแผน
- [x] Workspace learning capture ถูกระบุ
- [x] README/progress/skill/docs ทั้งหมดตรงกับแผนใหม่
- [x] ลงมือปรับ frontend pass 1 แล้ว: quick sale เป็น default, member เป็น secondary, reward choice ตรงกับ v1
