# 02 Angular Structure

MVP ตอนแรกเริ่มจาก component เดียวเพื่อให้เห็น business flow ชัดเจน ตอนนี้แยกเป็น components แล้วเพื่อให้ใกล้โครงใช้งานจริงมากขึ้น:

- `app.ts` เป็น container ถือ mock data, state และ business logic
- `components/top-nav` แสดง navigation
- `components/display-panel` แสดง iPad storefront preview
- `components/pos-panel` แสดง POS flow และ emit action กลับขึ้น `app.ts`
- `components/reward-panel` แสดง reward choice และสิทธิ์ที่เก็บไว้
- `components/line-panel` แสดง mock LINE OA messages
- `app.html` จัด section หลัก `home`, `demo`, และ `line-oa`
- `app.css` ใช้ dark premium + orange accent ให้ไปทิศทางเดียวกับ ApoRaviz Portfolio
- iPad display มี CSS animation สำหรับ grill stage, heat lines, progress rail และ stamp glow โดยเคารพ `prefers-reduced-motion`

โครงนี้ยังใช้ mock data แต่แยก presentation components ออกจาก business logic แล้ว จึงต่อยอดเป็น service, localStorage หรือ backend ได้ง่ายขึ้น
