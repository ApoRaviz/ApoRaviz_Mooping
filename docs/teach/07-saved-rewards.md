# 07 Saved Rewards

ตอนลูกค้าเลือก `เก็บสิทธิ์ไว้ก่อน` สิทธิ์ไม่ควรหายไป

ระบบจึงแยก reward เป็น 2 สถานะ:

```text
pendingRewards = สิทธิ์ที่พร้อมให้ลูกค้าเลือกตอนนี้
savedRewards = สิทธิ์ที่ลูกค้าขอเก็บไว้ใช้ครั้งหน้า
```

## Example

```text
pendingRewards 1
savedRewards 0

ลูกค้าเลือกเก็บสิทธิ์ไว้ก่อน

pendingRewards 0
savedRewards 1
```

เมื่อกลับมาใช้ภายหลัง ลูกค้าควรแลกของแถมจาก `savedRewards` ได้เหมือน reward ปกติ
