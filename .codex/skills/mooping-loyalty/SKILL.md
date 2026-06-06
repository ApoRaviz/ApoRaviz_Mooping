---
name: mooping-loyalty
description: Use when building or updating the MooPing Loyalty Angular project, including the 10-sticks loyalty rule, customer-selected rewards, iPad display, mock or real LINE OA notifications, project docs, teach notes, and progress tracking.
---

# MooPing Loyalty

## Project Defaults

- Use Angular latest stable from `_docs/angular/commands.md`; current baseline is Angular 22, Node 24 LTS, TypeScript 6.0.x, Tailwind CSS v4, standalone components, and signals.
- Keep the project separate from ApoRaviz Portfolio; portfolio integration should be links and case-study content only.
- Keep docs updated in `docs/`, learning notes in `docs/teach/`, and status in `progress.md`.
- Prefer small, shop-friendly flows: staff should complete a sale update in a few taps.

## Business Rules

- Every 10 purchased sticks earns 1 reward.
- Extra sticks after a reward continue into the next round.
- Customers choose their own reward when a reward is available.
- Reward choices start with `หมูปิ้ง 1 ไม้`, `ข้าวเหนียว 1 ห่อ`, and `เก็บสิทธิ์ไว้ก่อน`.
- Choosing `เก็บสิทธิ์ไว้ก่อน` must move a pending reward into saved rewards; the right must stay visible and usable later.
- POS sales should be staged as a pending ticket first, then confirmed; staff must be able to clear, delete, or undo the latest sale.

## UX Direction

- Design for real shop use on desktop, tablet, and iPad display.
- Make totals, reward status, and next action readable at a glance.
- Keep the LINE OA panel as a mock in MVP; use backend-mediated LINE Messaging API only in production.

## Commenting Style

- Add short Thai comments when code introduces an idea we discussed, especially POS flow, loyalty calculation, reward handling, LINE OA mock/real integration, SSR safety, and Angular signals.
- Comments should explain what the block is used for or why it exists, not repeat obvious syntax.
- Follow the ApoRaviz Portfolio style: explain why semantic elements are used (`section`, `nav`, `article`, `aside`, `form`, `button`, `a`) and why a `div` is only a layout/visual wrapper.
- Prefer comments near semantic HTML, service/store boundaries, shared data arrays, computed state, event handlers with business rules, Tailwind layout decisions, and CSS animation sections that affect the shop workflow.
- For tricky interactions, use 1-2 Thai comment lines to explain the user-facing reason, such as preventing accidental sale commits, keeping reward rights visible, or making LINE OA mock messages traceable.
- Keep comments concise so the code stays easy to scan while still useful for learning later.

## Validation

Run with Node 24:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm run build
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm test -- --watch=false
```
