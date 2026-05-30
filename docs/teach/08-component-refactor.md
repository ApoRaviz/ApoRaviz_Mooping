# 08 Component Refactor

โปรเจกต์นี้เริ่มจาก component เดียวเพื่อให้เห็น business flow เร็วที่สุด

หลังจาก flow เริ่มชัด จึงแยกออกเป็น focused components:

```text
app.ts = container, mock data, business logic
top-nav = navigation
display-panel = iPad storefront preview
pos-panel = staff POS workflow
reward-panel = customer reward choice
line-panel = mock LINE OA messages
models = shared TypeScript types
```

## Why Keep Logic In App For Now

ข้อมูลยังเป็น mock data จึงให้ `app.ts` ถือ state กลางก่อน เพื่อให้ดู flow ง่ายและไม่สร้าง service เร็วเกินไป

เมื่อเพิ่ม localStorage หรือ backend ค่อยย้าย logic ไป service เช่น:

```text
LoyaltyService
CustomerStore
NotificationService
```
