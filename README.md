# MooPing Loyalty

ระบบสะสมยอดซื้อหมูปิ้งสำหรับหน้าร้านจริง: ซื้อครบ 10 ไม้ รับ reward 1 สิทธิ์ และลูกค้าเลือกของแถมเองได้ เช่น หมูปิ้ง ข้าวเหนียว หรือเก็บสิทธิ์ไว้ใช้รอบหน้า

## Project Goals

- สร้าง web app สำหรับพนักงานบันทึกยอดขายหน้าร้านอย่างรวดเร็ว
- ทำ iPad display สำหรับโชว์สถานะสะสมให้ลูกค้าดูหน้าร้าน
- จำลอง LINE OA notification สำหรับแจ้งเตือนใกล้ครบ 10 ไม้และยืนยัน reward
- ทำเป็นโปรเจกต์แยกจาก ApoRaviz Profile แต่พร้อมนำ link ไปโชว์ใน portfolio

## MVP Features

- POS demo สำหรับเพิ่มยอดซื้อด้วยปุ่มเร็ว
- Loyalty rule: ครบ 10 ไม้ ได้ reward 1 สิทธิ์ทันที
- Customer reward choice: ลูกค้าเลือกของแถมเองเมื่อมีสิทธิ์
- Mock LINE OA message panel
- เอกสาร `docs/`, `docs/teach/`, และ `progress.md` สำหรับเรียนรู้และติดตามงาน

## Tech Stack

- Angular 21
- Standalone components
- Angular signals/computed state
- CSS responsive layout
- SSR-ready Angular scaffold

## Commands

```bash
npm install
npm start
npm run build
```

## Documentation

- [Overview](docs/overview.md)
- [Requirements](docs/requirements.md)
- [User Flow](docs/user-flow.md)
- [Data Model](docs/data-model.md)
- [LINE OA Plan](docs/line-oa.md)
- [Teach Notes](docs/teach/01-project-idea.md)
- [Progress](progress.md)
