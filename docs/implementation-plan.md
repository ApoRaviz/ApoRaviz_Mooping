# MooPing Reward Implementation Plan

ไฟล์นี้เป็นแผนกลางสำหรับไล่งานทีละ step ของโปรเจกต์ MooPing Reward ให้เราใช้ติดตามร่วมกันระหว่างออกแบบ UI, จัดโครงสร้าง Angular, ทำ LINE OA และต่อ backend จริง

## Working Rules

- ทำทีละ step และติ๊ก `[x]` เฉพาะเมื่อ build/test ผ่านหรือมีเหตุผลชัดเจนว่าเป็นงานเอกสารล้วน
- ให้ UI และ business flow นิ่งก่อนเริ่ม backend จริง
- ฝั่ง frontend ต้องเก็บ token หรือ secret ไม่ได้ โดยเฉพาะ LINE OA และ Supabase service role key
- ใช้ Angular latest stable, Node 24 LTS, Tailwind CSS v4, standalone components, signals/computed, strict TypeScript และ browser API แบบ SSR-safe
- เวลาเพิ่มหรือแก้โค้ด ให้ใส่ comment ภาษาไทยสั้น ๆ ในสไตล์เดียวกับ `ApoRaviz_Portfolio`: อธิบายว่า block นั้นใช้ทำอะไร ทำไมเลือก semantic element นั้น หรือเกี่ยวกับ flow ที่เราคุยกันไว้อย่างไร
- ถ้าเปลี่ยน UI สำคัญ ต้องเปิดดูบน desktop และ mobile/tablet viewport ก่อนถือว่าเสร็จ
- ถ้าเจอบทเรียนใหม่จาก MooPing ให้เพิ่มที่ `ApoRaviz_Workspace_Docs/projects/mooping/` ไม่สร้าง `docs/teach/` ใหม่ใน repo นี้

## Step 0 - Project Baseline

- [x] 0.1 สร้าง Angular project รุ่นตั้งต้นสำหรับ MooPing Reward พร้อม routing และ SSR
- [x] 0.1.1 Upgrade baseline ปัจจุบันเป็น Angular 22 + TypeScript 6.0.x + Tailwind CSS v4 ตาม `ApoRaviz_Workspace_Docs`
- [x] 0.2 เพิ่มเอกสารพื้นฐานใน `docs/`
- [x] 0.3 เพิ่ม business requirements: ซื้อครบ 10 ไม้ได้ reward 1 สิทธิ์
- [x] 0.4 เพิ่ม user flow สำหรับพนักงานและลูกค้า
- [x] 0.5 เพิ่ม mock POS, reward panel, iPad display และ LINE OA panel
- [x] 0.6 แยก component หลักเป็น `top-nav`, `display-panel`, `pos-panel`, `reward-panel`, `line-panel`
- [x] 0.7 เพิ่ม GitHub Pages CI/CD workflow
- [x] 0.8 เพิ่ม implementation checklist กลางสำหรับเดินงานรอบต่อไป
- [x] 0.9 รวม command docs ที่สั้นเกินไปเป็น `docs/commands.md`
- [x] 0.10 รวม overview, requirements, user flow, data model และ LINE OA plan เป็น `docs/product-spec.md`
- [x] 0.11 ลบ generic UI skill copy ที่ซ้ำกับกติกากลาง เหลือ project-specific skill ของ MooPing
- [x] 0.12 ย้าย MooPing teach notes ไป `ApoRaviz_Workspace_Docs/projects/mooping/`
- [x] 0.13 เชื่อม `docs/commands.md` กลับไป workspace docs กลาง
- [x] 0.14 ปรับ deploy teach ให้เป็น MooPing-specific demo deploy flow ไม่ใช่ CI/CD กลางซ้ำ
- [x] 0.15 ปรับ README ให้สื่อ project purpose และ MVP features ชัดเจน
- [x] 0.16 rename teach files ให้ชื่อสื่อบทเรียนเฉพาะระบบหมูปิ้งชัดเจน

## Step 1 - POS UI Ready For Real Use

- [x] 1.0 ย้าย layout/style หลักของ POS workspace จาก `app.css` ไปเป็น Tailwind utility classes โดยคง CSS ไว้เฉพาะ global theme, animation หรือ visual effect ที่จำเป็น
- [x] 1.1 เปลี่ยนหน้าแรกจาก portfolio/demo hero เป็น POS workspace ที่ใช้งานได้ทันที
- [x] 1.2 จัด layout สำหรับ iPad landscape: customer column, sale keypad, stamp/reward column
- [x] 1.3 เพิ่ม customer search field แทนการใช้ select อย่างเดียว
- [x] 1.4 เพิ่ม customer profile card พร้อมชื่อ เบอร์ สถานะ LINE และยอดสะสม
- [x] 1.5 เพิ่ม keypad หรือ quick buttons ที่กดง่ายสำหรับหน้าร้าน
- [x] 1.6 แสดง checkout preview ก่อนยืนยัน: ยอดหลังบันทึก, reward ใหม่, ยอดคงเหลือ
- [x] 1.7 ทำปุ่มลบ 1 ไม้, ล้างรายการ, ยืนยัน, undo ให้มองเห็นชัดและไม่สับสน
- [ ] 1.8 เพิ่ม visual state สำหรับ reward ready, no customer selected, empty sale และ loading
- [ ] 1.9 ตรวจ responsive บน mobile, desktop และ iPad-like viewport
- [x] 1.10 รัน build หลังปรับ UI รอบแรก

## Step 2 - Frontend State And Architecture

- [ ] 2.1 ย้าย mock customer data ออกจาก `App` ไปอยู่ใน service หรือ data file
- [ ] 2.2 สร้าง `LoyaltyStoreService` สำหรับ selected customer, pending sale, last sale และ line messages
- [ ] 2.3 สร้าง pure helper สำหรับคำนวณ stamp/reward เพื่อให้ test ง่าย
- [ ] 2.4 เพิ่ม unit tests ให้ loyalty calculation: ครบ 10, เกิน 10, ได้หลาย reward, undo
- [ ] 2.5 เพิ่ม localStorage persistence แบบ SSR-safe
- [ ] 2.6 เพิ่ม purchase history mock
- [ ] 2.7 เพิ่ม reward claim history mock
- [ ] 2.8 ลด logic ใน `App` ให้เหลือ composition และ event wiring

## Step 3 - Customer Management MVP

- [ ] 3.1 เพิ่ม flow สร้างลูกค้าใหม่
- [ ] 3.2 เพิ่ม form validation สำหรับชื่อและเบอร์โทร
- [ ] 3.3 เพิ่ม edit customer เบื้องต้น
- [ ] 3.4 เพิ่ม duplicate phone guard ใน mock state
- [ ] 3.5 เพิ่ม customer list state: active, empty result, no LINE
- [ ] 3.6 เพิ่ม staff note หรือ cashier note สำหรับรายการขาย

## Step 4 - LINE OA Mock Layer

- [ ] 4.1 เพิ่ม LINE status ให้ customer model: linked, unlinked, display name
- [ ] 4.2 เพิ่ม QR/Add LINE callout สำหรับลูกค้าที่ยังไม่ link LINE
- [ ] 4.3 ทำ mock message templates แยกตาม event
- [ ] 4.4 ส่ง mock message เมื่อซื้อใกล้ครบ 10 ไม้
- [ ] 4.5 ส่ง mock message เมื่อได้ reward ใหม่
- [ ] 4.6 ส่ง mock message เมื่อเลือกของแถมแล้ว
- [ ] 4.7 ส่ง mock message เมื่อเก็บสิทธิ์ไว้ใช้รอบหน้า
- [ ] 4.8 เพิ่ม preview panel ที่หน้าตาใกล้ LINE chat จริงขึ้น

## Step 5 - API Contract Preparation

- [ ] 5.1 ปรับ model ให้รองรับ backend field name: `stamp_count`, `total_stamps_lifetime`, `line_user_id`
- [ ] 5.2 กำหนด `Customer`, `Transaction`, `Reward`, `TransactionResult` ให้ตรงกับ Supabase/API
- [ ] 5.3 สร้าง frontend service interface สำหรับ customers, transactions, rewards
- [ ] 5.4 แยก mock adapter กับ future HTTP adapter
- [ ] 5.5 เพิ่ม environment files สำหรับ API URL
- [ ] 5.6 เพิ่ม error state ใน UI สำหรับ API failure

## Step 6 - Backend And Database

- [ ] 6.1 สร้าง backend workspace ด้วย Node.js + Fastify + TypeScript
- [ ] 6.2 เพิ่ม Supabase migration สำหรับ customers, transactions, rewards
- [ ] 6.3 เพิ่ม database function หรือ service สำหรับ process transaction
- [ ] 6.4 เพิ่ม customer routes: search, get by id, create, update
- [ ] 6.5 เพิ่ม transaction route สำหรับบันทึกยอดขาย
- [ ] 6.6 เพิ่ม reward routes สำหรับเลือก/แลกของรางวัล
- [ ] 6.7 เพิ่ม request validation ด้วย schema
- [ ] 6.8 เพิ่ม CORS config สำหรับ local และ GitHub Pages
- [ ] 6.9 เพิ่ม backend tests สำหรับ business rules

## Step 7 - Real LINE OA Integration

- [ ] 7.1 สร้าง LINE Messaging API channel
- [ ] 7.2 เก็บ `LINE_CHANNEL_SECRET` และ `LINE_CHANNEL_ACCESS_TOKEN` ใน backend env เท่านั้น
- [ ] 7.3 เพิ่ม webhook route สำหรับ follow/unfollow event
- [ ] 7.4 ทำ signature validation ของ LINE webhook
- [ ] 7.5 ผูก LINE user id กับ customer
- [ ] 7.6 ส่ง push message หลังบันทึกยอดขาย
- [ ] 7.7 ส่ง push message เมื่อได้รับ reward
- [ ] 7.8 ส่ง push message เมื่อเลือกของแถม
- [ ] 7.9 ทดสอบ local webhook ด้วย tunnel

## Step 8 - Deployment

- [ ] 8.1 Deploy frontend ไป GitHub Pages
- [ ] 8.2 Deploy backend ไป Railway หรือ platform ที่เลือก
- [ ] 8.3 ตั้งค่า production API URL
- [ ] 8.4 ตั้งค่า Supabase secrets และ LINE secrets
- [ ] 8.5 ทดสอบ end-to-end จาก frontend ถึง backend
- [ ] 8.6 ทดสอบ LINE OA จริงกับ test user

## Step 9 - Portfolio Case Study

- [ ] 9.1 เขียน case study: problem, constraints, decisions, result
- [ ] 9.2 เพิ่ม screenshots ของ POS, reward flow และ LINE mock/real flow
- [ ] 9.3 เพิ่ม architecture diagram แบบอ่านง่าย
- [ ] 9.4 เพิ่ม link demo และ GitHub repo ใน ApoRaviz Portfolio
- [ ] 9.5 เขียน lessons learned เป็นภาษาไทยที่ `ApoRaviz_Workspace_Docs/projects/mooping/`
