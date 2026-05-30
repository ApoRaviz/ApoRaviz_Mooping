---
name: mooping-loyalty
description: Use when building or updating the MooPing Loyalty Angular project, including the 10-sticks loyalty rule, customer-selected rewards, iPad display, mock or real LINE OA notifications, project docs, teach notes, and progress tracking.
---

# MooPing Loyalty

## Project Defaults

- Use Angular 21 standalone components, strict TypeScript, and signals.
- Keep the project separate from ApoRaviz Portfolio; portfolio integration should be links and case-study content only.
- Keep docs updated in `docs/`, learning notes in `docs/teach/`, and status in `progress.md`.
- Prefer small, shop-friendly flows: staff should complete a sale update in a few taps.

## Business Rules

- Every 10 purchased sticks earns 1 reward.
- Extra sticks after a reward continue into the next round.
- Customers choose their own reward when a reward is available.
- Reward choices start with `หมูปิ้ง 1 ไม้`, `ข้าวเหนียว 1 ห่อ`, and `เก็บสิทธิ์ไว้ก่อน`.

## UX Direction

- Design for real shop use on desktop, tablet, and iPad display.
- Make totals, reward status, and next action readable at a glance.
- Keep the LINE OA panel as a mock in MVP; use backend-mediated LINE Messaging API only in production.

## Validation

Run with Node 24:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm run build
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm test -- --watch=false
```
