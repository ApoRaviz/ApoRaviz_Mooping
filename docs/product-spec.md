# MooPing Reward Product Spec

ไฟล์นี้คือ product spec ของ `ApoRaviz_Mooping` หลังปรับทิศทางจาก demo ไปเป็นระบบหน้าร้านจริง

ชื่อที่ใช้แสดงผลกับคนทั่วไปคือ `MooPing Reward`

## Product Direction

MooPing Reward ไม่ใช่ระบบสั่งหมูปิ้งออนไลน์ และไม่ใช่ระบบที่บังคับลูกค้าทุกคนต้องสมัครสมาชิกก่อนซื้อ

ระบบนี้คือเครื่องมือช่วยร้านหมูปิ้งช่วงเช้าที่ลูกค้าส่วนใหญ่รีบไปทำงานหรือพาลูกไปโรงเรียน โดยยึดหลัก:

```text
Fast sale first, reward optional, LINE only when useful.
```

แปลแบบหน้าร้าน:

```text
ขายให้เร็วที่สุดก่อน
ของแถมต้องรับได้ง่าย
LINE มีไว้ช่วยจำยอดให้คนที่อยากสะสมข้ามรอบ
```

## Problem

ร้านหมูปิ้งทั่วไปมักมีโปรโมชันแบบ:

```text
ซื้อครบ 10 ไม้ แถมหมูปิ้ง 1 ไม้
```

ปัญหาที่เห็น:

- ลูกค้าต้องซื้อครบครั้งละ 10 ไม้จึงได้สิทธิ์ชัดเจน
- ของแถมมักเป็นหมูปิ้งอย่างเดียว
- คนซื้อประจำที่ซื้อครั้งละ 3-5 ไม้สะสมข้ามรอบยาก
- บัตร stamp กระดาษใช้ง่าย แต่หายง่าย ลืมพกง่าย และร้านตรวจย้อนหลังยาก
- ถ้าทำระบบดิจิทัลยุ่งเกินไป ลูกค้าจะรู้สึกว่าลำบากกว่าบัตรกระดาษ

## Product Promise

ข้อความที่ควรสื่อกับลูกค้า:

```text
ซื้อครบ 10 เลือกของแถมได้
แอด LINE แล้วร้านช่วยจำยอดสะสมให้ ไม่ต้องพกบัตร
```

นี่คือ benefit ไม่ใช่เงื่อนไขบังคับ

## Customer Types

### 1. Quick Buyer

ลูกค้าที่รีบมาก ซื้อแล้วไปทันที

- ไม่ต้องแอด LINE
- ไม่ต้องกรอกเบอร์
- ไม่ต้องแตะ iPad
- ถ้าซื้อครบ 10 ไม้ในครั้งเดียว ต้องได้ของแถมทันที

### 2. Regular Buyer

ลูกค้าที่ซื้อประจำ แต่ซื้อครั้งละไม่ถึง 10 ไม้

- เหมาะกับการแอด LINE OA
- ระบบช่วยจำยอดสะสมข้ามรอบ
- แจ้งเตือนเมื่อใกล้ครบ 10 ไม้
- ไม่ต้องพกบัตร stamp กระดาษ

### 3. Bulk Buyer

ลูกค้าที่ซื้อ 10 ไม้ขึ้นไปในครั้งเดียว

- ได้ reward ทันที
- เลือกของแถมได้เลย
- ไม่จำเป็นต้องสมัครสมาชิก

### 4. Reward-sensitive Buyer

ลูกค้าที่สนใจสิทธิ์หรือของแถม

- อาจยอมแอด LINE เพราะเลือกของแถมได้มากกว่าร้านทั่วไป
- ต้องเห็นประโยชน์เร็วและไม่รู้สึกถูกบังคับ

## Core Rules

- ซื้อครบทุก `10 ไม้` ได้ `1 reward`
- ถ้าซื้อเกิน 10 ไม้ เศษต้องสะสมต่อรอบถัดไป
- ถ้าซื้อ 20 ไม้ ได้ 2 rewards
- Reward ที่เลือกได้ใน v1:
  - หมูปิ้ง 1 ไม้
  - น้ำเปล่า 1 ขวด
  - ข้าวเหนียว 1 ห่อ
- ลูกค้าไม่แอด LINE ก็ยังรับ reward ได้ ถ้าซื้อครบในครั้งเดียว
- ลูกค้าแอด LINE เพื่อสะสมข้ามรอบและรับแจ้งเตือน
- Reward ที่ยังไม่ใช้ต้องไม่หาย
- Staff ต้อง undo/void รายการล่าสุดได้เมื่อกดผิด

## Non-goals For V1

สิ่งที่ยังไม่ควรทำใน v1:

- Online ordering
- Cart/checkout/payment online
- Customer username/password
- Inventory เต็มระบบ
- ระบบสมาชิกซับซ้อน
- ระบบแต้มหลายระดับ
- Broadcast promotion หนัก ๆ
- Analytics/tracking ที่เก็บข้อมูลเกินจำเป็น

## Main Front-of-shop Flow

### Flow A - ขายเร็ว ไม่สะสม

ใช้เมื่อคิวแน่นหรือลูกค้ารีบ

```text
1. Staff กดจำนวนไม้
2. Staff รับเงิน/ทอนเงินตาม flow ร้าน
3. ถ้าครบ 10 ไม้ ให้ถามของแถมทันที
4. จบรายการ
```

ต้องไม่มีขั้นตอนบังคับ:

- ค้นหาลูกค้า
- สแกน QR
- กรอกเบอร์
- Login
- กดหลายหน้าจอ

### Flow B - ซื้อครบ 10 ในครั้งเดียว

```text
1. Staff กด +10 หรือจำนวนที่ซื้อ
2. ระบบขึ้นว่าได้ reward กี่สิทธิ์
3. Staff ถาม: รับเป็นหมูปิ้ง น้ำเปล่า หรือข้าวเหนียวครับ
4. Staff กด reward ที่ลูกค้าเลือก
5. จบรายการ
```

ลูกค้าไม่จำเป็นต้องแอด LINE

### Flow C - ลูกค้าอยากสะสมข้ามรอบ

```text
1. Staff บอกสั้น ๆ ว่า แอด LINE ไว้ได้ ระบบช่วยจำยอดให้
2. ลูกค้าสแกน QR เพิ่มเพื่อน LINE OA
3. ระบบผูก LINE userId กับ customer profile
4. Staff บันทึกยอดซื้อเข้าลูกค้าคนนั้น
5. ระบบส่งข้อความสะสมผ่าน LINE เมื่อเหมาะสม
```

ข้อความหน้าร้านควรเป็น:

```text
แอด LINE ไว้ ระบบช่วยจำยอดสะสมให้ครับ ไม่ต้องพกบัตร
```

ห้ามสื่อสารแบบ:

```text
ต้องแอด LINE ก่อนถึงจะสะสมได้
```

เพราะจะทำให้ลูกค้ารู้สึกว่าถูกบังคับ

## iPad Role

iPad หน้าร้านเป็นเครื่องหลักของ staff

หน้าจอ default ควรเป็น `Quick Sale` ไม่ใช่หน้า scan QR หรือหน้า demo

หน้าจอควรมี 2 โหมดหลัก:

```text
Quick Sale      = ขายเร็ว ไม่ผูกลูกค้า
Member Sale     = ลูกค้าที่แอด LINE/สะสมข้ามรอบ
```

### Quick Sale

ควรมีปุ่มใหญ่:

- +1
- +3
- +5
- +10
- ลบ 1
- ล้างรายการ
- ยืนยันขาย
- เลือก reward ถ้าครบ 10

### Member Sale

ใช้เมื่อมีเวลาหรือเป็นลูกค้าประจำ

- ค้นหาลูกค้าจากชื่อเล่น/เบอร์ท้าย/LINE display name
- แสดงยอดสะสมปัจจุบัน
- บันทึกยอดซื้อ
- แสดง reward ที่มี
- แสดงสถานะ LINE linked/unlinked

## LINE OA Role

LINE OA เป็นตัวช่วย ไม่ใช่หน้าร้านหลัก

ใช้เพื่อ:

- เพิ่มเพื่อนกับร้าน
- ผูกลูกค้ากับยอดสะสม
- แจ้งเตือนยอดสะสมหลังซื้อ
- แจ้งว่าใกล้ครบ 10 ไม้
- แจ้งว่ามี reward ค้างอยู่
- แจ้ง reward ที่ลูกค้าเลือกแล้ว

ไม่ใช้เพื่อ:

- บังคับซื้อออนไลน์
- บังคับ login
- ส่ง spam
- ส่งโปรโมชันถี่เกินไป

## LINE Message Events

ส่งเฉพาะ event ที่มีประโยชน์:

- หลังบันทึกยอดซื้อของ member
- เมื่อลูกค้าเหลืออีก 1-2 ไม้จะครบ 10
- เมื่อลูกค้าได้ reward ใหม่
- เมื่อลูกค้าเลือกของแถมแล้ว
- เมื่อลูกค้ามี reward ค้างอยู่และไม่ได้กลับมานาน ตาม policy ที่กำหนด

ไม่ควรส่งทุกครั้งถ้าทำให้รบกวน

## Customer Identity

ระบบต้องตอบให้ได้ว่า:

```text
LINE userId นี้คือยอดสะสมของใคร
```

แนวทาง v1 ที่แนะนำ:

- เมื่อลูกค้าแอด LINE OA ให้ backend รับ `follow` webhook
- backend เก็บ `line_user_id`
- ใน iPad staff สร้างหรือเลือก customer profile
- ผูก customer profile กับ LINE userId ด้วย flow ที่ปลอดภัย

ทางเลือกการ link:

1. Staff-assisted link code
   - ระบบแสดง code สั้น ๆ บน iPad
   - ลูกค้าส่ง code ใน LINE หรือ staff กรอก code
   - เหมาะกับ v1 เพราะเข้าใจง่าย

2. LINE account linking
   - ปลอดภัยและเป็นมาตรฐานกว่า
   - ซับซ้อนกว่า
   - เหมาะกับรอบหลังเมื่อ backend นิ่ง

3. LIFF
   - เหมาะกับหน้าจอใน LINE
   - ยังไม่จำเป็นใน v1 ถ้าเป้าหมายคือหน้าร้านเร็ว

## Admin Requirements

Admin ไม่ควรขวางหน้าร้าน แต่ต้องมีเพื่อความถูกต้อง

ควรมี:

- Login สำหรับ owner/staff
- Staff role
- Owner/admin role
- ดูยอดขายวันนี้
- ดูรายการขายล่าสุด
- void/undo พร้อมเหตุผล
- ดูลูกค้า member
- ดู reward ค้างอยู่
- ตั้งค่า reward options
- ดู notification log
- export รายงานเบื้องต้น

ยังไม่จำเป็นใน v1 แรก:

- Dashboard ซับซ้อน
- Permission หลายชั้น
- Multi-branch
- Inventory เต็มระบบ

## Data Model Draft

```ts
type RewardType = 'pork-stick' | 'water' | 'sticky-rice';

type SaleMode = 'quick' | 'member';

type Customer = {
  id: string;
  displayName: string;
  phoneLast4?: string;
  lineUserId?: string;
  stampCount: number;
  pendingRewardCount: number;
  totalPurchased: number;
  createdAt: string;
  updatedAt: string;
};

type SaleTransaction = {
  id: string;
  mode: SaleMode;
  customerId?: string;
  stickCount: number;
  earnedRewardCount: number;
  remainingStampCount: number;
  createdByStaffId: string;
  createdAt: string;
  voidedAt?: string;
  voidReason?: string;
};

type RewardClaim = {
  id: string;
  customerId?: string;
  transactionId?: string;
  rewardType: RewardType;
  status: 'pending' | 'claimed' | 'voided';
  claimedAt?: string;
  createdAt: string;
};

type LineNotificationLog = {
  id: string;
  customerId: string;
  lineUserId: string;
  eventType: 'purchase-summary' | 'near-reward' | 'reward-earned' | 'reward-claimed' | 'saved-reward-reminder';
  status: 'pending' | 'sent' | 'failed' | 'skipped';
  messagePreview: string;
  lineRequestId?: string;
  createdAt: string;
};
```

## Security And Privacy

ข้อมูลที่ควรเก็บให้น้อยที่สุด:

- LINE userId
- ชื่อที่ใช้เรียกหน้าร้าน หรือ LINE display name
- เบอร์ท้าย 4 หลัก ถ้าจำเป็น
- ยอดสะสม
- ประวัติซื้อ/แลก reward

ข้อมูลที่ไม่ควรเก็บใน v1:

- ที่อยู่
- วันเกิด
- เลขบัตร
- ข้อมูลจ่ายเงินละเอียด
- ข้อมูลส่วนตัวที่ไม่ช่วย reward flow

ข้อบังคับทางเทคนิค:

- LINE channel secret และ access token ต้องอยู่ backend เท่านั้น
- Supabase service role key ต้องอยู่ backend เท่านั้น
- Frontend ห้ามมี secret
- LINE webhook ต้องตรวจ signature ก่อน process
- Webhook redelivery ต้องกัน duplicate ด้วย `webhookEventId`
- Admin action สำคัญต้องมี audit log
- ข้อความ LINE ต้องไม่ใส่ข้อมูลส่วนตัวเกินจำเป็น

## Backend Direction

ค่า default ระยะยาว:

```text
Angular frontend
NestJS backend
PostgreSQL หรือ Supabase database
LINE Messaging API ผ่าน backend
```

Fastify ใช้ได้เฉพาะถ้าตั้งใจทำ webhook prototype เล็ก ๆ ก่อน แต่ production direction ของโปรเจ็คนี้ให้ยึด NestJS

## Success Criteria

ระบบถือว่า v1 พร้อมทดลองกับร้านจริงเมื่อ:

- Staff ขายแบบ quick sale ได้ในไม่กี่ tap
- ลูกค้าไม่แอด LINE ก็ยังรับ reward ได้เมื่อซื้อครบ 10
- ลูกค้า member สะสมข้ามรอบได้
- Reward เลือกได้ 3 แบบ
- Undo/void รายการผิดได้
- LINE token ไม่อยู่ frontend
- Webhook ตรวจ signature
- มีประวัติขายและ reward claim
- คิวเช้าไม่ช้ากว่าการใช้บัตร stamp กระดาษ
