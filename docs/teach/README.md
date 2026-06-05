# Teach Notes

ชุดนี้เป็น learning path ของโปรเจกต์ MooPing Loyalty

เป้าหมายไม่ใช่แค่บันทึกว่าโปรเจกต์ทำอะไร แต่ใช้สอนแนวคิดจากระบบหน้าร้านจริง เช่น product thinking, business logic, UX สำหรับ POS, state modeling, LINE OA และ portfolio case study

ถ้าต้องการอ่าน concept กลางของ Angular ก่อน ให้เริ่มที่:

```text
_docs/angular/README.md
_docs/angular/teach/README.md
```

## Ownership

```text
_docs/angular/teach/               = Angular concept กลาง
ApoRaviz_Mooping/docs/teach/       = ตัวอย่างจริงจากระบบหมูปิ้ง
ApoRaviz_Mooping/docs/commands.md  = command เฉพาะ repo/base-href/output ของ MooPing
```

## Recommended Order

1. [Product Thinking จากปัญหาหน้าร้านจริง](01-project-idea.md)
2. [Angular Structure และการแยก Component](02-angular-structure.md)
3. [Business Logic ของระบบสะสมสิทธิ์](03-loyalty-logic.md)
4. [LINE OA และ Notification Design](04-line-oa-concept.md)
5. [วิธีเล่าโปรเจกต์นี้เป็น Portfolio Case Study](05-portfolio-case-study.md)
6. [POS Error Prevention และ Correction Flow](06-pos-correction-flow.md)
7. [State Modeling สำหรับ Saved Rewards](07-saved-rewards.md)
8. [Refactor จาก Demo ให้เป็นโครงที่ดูแลต่อได้](08-component-refactor.md)
9. [MooPing Demo Deploy Flow](09-github-pages-cicd.md)

## How To Read

ถ้าอ่านเพื่อเรียน Angular ให้เริ่มจาก `_docs/angular/teach/` ก่อน แล้วกลับมาอ่านตอน 2, 8 และ 9 เพื่อดูตัวอย่างจริงใน MooPing

ถ้าอ่านเพื่อทำ portfolio case study ให้เริ่มจากตอน 1, 5, 9

ถ้าอ่านเพื่อออกแบบระบบหน้าร้านจริง ให้เริ่มจากตอน 3, 4, 6, 7

## Update Rule

- ถ้าเป็น business rule, POS UX, LINE OA หรือ loyalty state ให้เก็บในโฟลเดอร์นี้
- ถ้าเป็น Angular concept ที่ใช้ได้ทุกโปรเจกต์ ให้สรุปกลับไป `_docs/angular/teach/`
- ถ้าเป็น command ที่มี repo URL, base-href หรือ output path เฉพาะ MooPing ให้เก็บใน `docs/commands.md`
- ถ้า command นั้นควรถูกสอนใน context ของระบบหมูปิ้ง ให้เพิ่ม purpose, verify step และ caution ในไฟล์ teach ที่เกี่ยวข้อง
