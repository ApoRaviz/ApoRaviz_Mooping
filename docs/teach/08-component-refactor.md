# 08 Refactor จาก Demo ให้เป็นโครงที่ดูแลต่อได้

ไฟล์นี้สอนวิธีคิดตอน refactor: เมื่อไหร่ควรแยกไฟล์ เมื่อไหร่ยังไม่ควรเพิ่ม abstraction และจะทำให้ code อ่านง่ายขึ้นได้อย่างไร

## Refactor คืออะไร

Refactor คือการปรับโครงสร้าง code โดยไม่เปลี่ยนพฤติกรรมหลักของระบบ

เป้าหมายไม่ใช่ทำให้ code ดูซับซ้อนขึ้น แต่ทำให้:

- อ่านง่ายขึ้น
- test ง่ายขึ้น
- แก้จุดหนึ่งแล้วไม่กระทบทั้งหน้า
- คนอื่นเข้าใจ intent ได้เร็ว

## สัญญาณว่าเริ่มควรแยก Component

ควรพิจารณาแยก component เมื่อ:

- HTML ยาวจนหา section ยาก
- state หลายชุดปนกัน
- UI ส่วนหนึ่งมีหน้าที่เฉพาะ
- ต้อง reuse layout หรือ behavior
- test หรือ debug เริ่มยาก

ใน MooPing Loyalty สัญญาณเหล่านี้เกิดเมื่อหน้าเริ่มมีทั้ง:

```text
hero
iPad display
POS
reward choice
LINE OA mock
```

## Refactor ที่ดีควรทำทีละชั้น

ลำดับที่ดี:

```text
1. ทำ feature ให้ flow ถูกก่อน
2. ตั้งชื่อ model/type ให้ชัด
3. แยก presentation components
4. ค่อยพิจารณา service เมื่อมี data source จริง
5. เพิ่ม tests กัน regression
```

ถ้าแยก service เร็วเกินไป อาจได้ abstraction ที่ไม่ตรงกับปัญหาจริง

## ทำไม TypeScript Models สำคัญ

ไฟล์ model เช่น:

```text
src/app/models/loyalty.models.ts
```

ช่วยบอกว่า object สำคัญในระบบหน้าตาเป็นอย่างไร

ตัวอย่าง concept:

```ts
export interface Customer {
  id: number;
  name: string;
  sticks: number;
  pendingRewards: number;
  savedRewards: number;
}
```

ข้อดี:

- component เห็น contract เดียวกัน
- typo ถูกจับได้เร็วขึ้น
- test อ่านง่าย
- เวลาเพิ่ม backend จะ map data ได้ชัดขึ้น

## อย่าให้ Component ลูกถือ Business Logic มากเกินไป

component ลูกควร emit event เช่น:

```text
confirmSale
clearDraft
redeemReward
saveRewardForLater
```

ส่วนการคำนวณว่า reward เพิ่มเท่าไร หรือ state ต้องเปลี่ยนอย่างไร ควรอยู่ใน container หรือ service

เหตุผล:

- business logic อยู่จุดเดียว
- ลดการคำนวณซ้ำ
- test ง่าย
- เปลี่ยน UI ได้โดยไม่ต้องเปลี่ยนกฎธุรกิจ

## สิ่งที่ควรเรียนจากไฟล์นี้

refactor ที่ดีคือการทำให้ intent ของระบบชัดขึ้น

จำง่าย:

```text
แยกตาม responsibility ไม่ใช่แยกเพราะไฟล์ยาวอย่างเดียว
เพิ่ม abstraction เมื่อมันลดความสับสนจริง
```
