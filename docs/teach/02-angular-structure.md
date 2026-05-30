# 02 Angular Structure

MVP เริ่มจาก component เดียวก่อนเพื่อให้เห็น business flow ชัดเจน แต่ใน HTML แยกเป็น semantic sections แล้ว:

- `app.ts` เก็บ state และ loyalty logic
- `app.html` แยก `home`, `demo`, `reward`, และ `line-oa` เพื่อให้ navigation และ case study อ่านง่าย
- `app.css` ใช้ dark premium + orange accent ให้ไปทิศทางเดียวกับ ApoRaviz Portfolio
- iPad display มี CSS animation สำหรับ grill stage, heat lines, progress rail และ stamp glow โดยเคารพ `prefers-reduced-motion`

เมื่อระบบโตขึ้น ค่อยแยกเป็น standalone components เช่น POS panel, reward panel, iPad display และ line notification panel
