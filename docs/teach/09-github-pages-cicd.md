# 09 CI/CD และ GitHub Pages สำหรับ Demo Portfolio

ไฟล์นี้สอน CI/CD สำหรับโปรเจกต์ Angular ที่ต้อง deploy เป็น demo ให้เปิดดูได้จริง เช่น บน iPad หน้าร้านหรือใน portfolio

## CI/CD คืออะไร

`CI` คือการตรวจ code อัตโนมัติทุกครั้งที่ push หรือเปิด pull request

```text
install dependencies
run tests
build project
```

`CD` คือการ deploy อัตโนมัติหลังจากผ่านขั้นตอนตรวจแล้ว

```text
build ผ่าน
→ upload artifact
→ deploy ไป GitHub Pages
```

ข้อดีคือ demo ไม่ขึ้นอยู่กับเครื่องเรา คนอื่นเปิด URL แล้วดูได้ทันที

## ทำไม Demo Portfolio ควรมี CI/CD

สำหรับ portfolio การมี CI/CD แสดงให้เห็นว่าเราคิดไกลกว่า local demo

สิ่งที่สื่อถึงคนดู:

- โปรเจกต์เปิดดูได้จริง
- build/test ไม่ได้พึ่งเครื่องเราอย่างเดียว
- เข้าใจ deployment pipeline
- พร้อมต่อยอดเป็น production hosting ได้

## npm ci ต่างจาก npm install ยังไง

ใน CI ควรใช้:

```bash
npm ci
```

เพราะ `npm ci`:

- อ่าน dependency จาก `package-lock.json`
- ติดตั้งซ้ำได้ deterministic กว่า
- fail ถ้า lockfile ไม่ตรงกับ package.json

จำง่าย:

```text
npm install = ใช้ตอนพัฒนา
npm ci = ใช้ใน automation
```

## ทำไมต้อง test ก่อน deploy

workflow ที่ดีควรเป็น:

```text
npm ci
→ npm test
→ npm run build
→ deploy
```

ถ้า deploy โดยไม่ test อาจเอา bug ขึ้น demo โดยไม่รู้ตัว

สำหรับระบบ loyalty test สำคัญ เพราะ logic เกี่ยวกับสิทธิ์ลูกค้า ถ้าผิดจะกระทบความเชื่อใจ

## base-href คืออะไร

GitHub Pages แบบ project site มักอยู่ใต้ path ของ repo เช่น:

```text
https://aporaviz.github.io/ApoRaviz_Mooping/
```

ดังนั้น Angular ต้องรู้ว่า asset ควรถูกโหลดใต้ path:

```text
/ApoRaviz_Mooping/
```

จึงต้อง build ด้วย:

```bash
ng build --configuration production --base-href /ApoRaviz_Mooping/
```

ถ้าไม่ตั้ง `base-href` browser อาจหาไฟล์ CSS/JS ไม่เจอ และหน้าเว็บจะพังหรือสีหายได้

## .nojekyll คืออะไร

GitHub Pages มีระบบ Jekyll อยู่เบื้องหลัง

ไฟล์:

```text
public/.nojekyll
```

ใช้บอก GitHub Pages ว่า:

```text
เสิร์ฟไฟล์ static ตามที่ build มาได้เลย ไม่ต้องประมวลผลด้วย Jekyll
```

เป็นไฟล์เล็ก ๆ แต่ช่วยลดปัญหากับ static artifact ในอนาคต

## Artifact คืออะไร

artifact คือ output ที่ build เสร็จแล้วและพร้อม deploy

สำหรับ Angular SSR/static output ของโปรเจกต์นี้ artifact อยู่ที่:

```text
dist/MooPing_Loyalty/browser
```

workflow จึงต้อง upload folder นี้ ไม่ใช่ upload ทั้ง repo

## สิ่งที่ควรเรียนจากไฟล์นี้

CI/CD ไม่ใช่แค่เรื่อง DevOps ใหญ่ ๆ แต่เป็น skill สำคัญของ portfolio project

ถ้าทำ demo ที่เปิดได้จริง พร้อม test/build อัตโนมัติ โปรเจกต์จะดูน่าเชื่อถือกว่าการส่ง screenshot อย่างเดียว
