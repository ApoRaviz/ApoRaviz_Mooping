# 09 GitHub Pages CI/CD

โปรเจกต์นี้ deploy mock demo ด้วย GitHub Actions และ GitHub Pages

เพราะ repo ชื่อ `mooping` URL จึงอยู่ใต้ path:

```text
https://aporaviz.github.io/mooping/
```

Angular ต้อง build ด้วย base href:

```bash
ng build --configuration production --base-href /mooping/
```

## Workflow

```text
push to main
npm ci
run tests
build static artifact
upload GitHub Pages artifact
deploy
```

## Why `.nojekyll`

GitHub Pages มี Jekyll processing เป็นค่าเริ่มต้นบางกรณี

การใส่ `.nojekyll` ทำให้ Pages เสิร์ฟไฟล์ static จาก Angular โดยไม่ตีความไฟล์พิเศษของ Jekyll
