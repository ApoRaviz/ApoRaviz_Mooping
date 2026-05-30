# LINE OA Plan

## MVP

MVP ใช้ mock LINE OA panel ในหน้าเว็บก่อน เพื่อโชว์ concept และ user flow โดยยังไม่ต้องใช้ access token จริง

## Real Integration

ระยะต่อไปสามารถเชื่อม LINE Messaging API ได้ โดยใช้ backend เป็นตัวส่งข้อความเพื่อไม่เปิดเผย token ใน frontend

## Message Events

- ลูกค้าใกล้ครบ 10 ไม้
- ลูกค้าได้ reward ใหม่
- ลูกค้าเลือกของแถมแล้ว
- มีโปรโมชันพิเศษ
- ลูกค้าไม่ได้กลับมาซื้อนาน

## Example Message

```text
คุณสะสมหมูปิ้งแล้ว 8/10 ไม้ อีก 2 ไม้ก็เลือกของแถมได้แล้วครับ
```
