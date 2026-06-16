---
name: mooping-loyalty
description: Use when building or updating the MooPing Reward Angular project in ApoRaviz_Mooping, including the 10-sticks reward rule, customer-selected rewards, saved rewards, iPad/shop display, mock or real LINE OA notifications, project docs, learning capture, and progress tracking. The skill folder keeps the old mooping-loyalty name for compatibility, but the product display name is MooPing Reward.
---

# MooPing Reward

## Project Defaults

- Use the product display name `MooPing Reward`.
- Keep the repository/project path as `ApoRaviz_Mooping`.
- Use Angular latest stable from `ApoRaviz_Workspace_Docs/angular/commands.md`; current baseline is Angular 22, Node 24 LTS, TypeScript 6.0.x, Tailwind CSS v4, standalone components, and signals.
- Keep the project separate from `ApoRaviz_Portfolio`; portfolio integration should be links and case-study content only.
- Keep project-specific docs in `docs/` and status in `progress.md`.
- Do not create new `docs/teach/` notes in this repo by default.
- Send reusable learning back to `ApoRaviz_Workspace_Docs`.
- Prefer small, shop-friendly flows: staff should complete a sale update in a few taps.

## Learning Capture

When MooPing work teaches something reusable, update Workspace Docs:

```text
Angular concept/API              -> ApoRaviz_Workspace_Docs/angular/
Tailwind/layout pattern          -> ApoRaviz_Workspace_Docs/angular/tailwind/
Angular command/run flow         -> ApoRaviz_Workspace_Docs/angular/commands.md or angular/teach/
Node.js/Fastify/backend concept  -> ApoRaviz_Workspace_Docs/nodejs/ or backend/
NestJS architecture              -> ApoRaviz_Workspace_Docs/nestjs/
PostgreSQL/Supabase concept      -> ApoRaviz_Workspace_Docs/postgresql/ or backend/
MooPing business/UX case study   -> ApoRaviz_Workspace_Docs/projects/mooping/
MooPing product spec/plan        -> ApoRaviz_Mooping/docs/
```

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
- Keep the LINE OA panel as a mock in MVP.
- Use backend-mediated LINE Messaging API only in production.
- Do not store LINE token, Supabase service role key, or other secrets in frontend code.

## Backend Direction

- Default long-term backend stack is NestJS + PostgreSQL/Supabase on Node.js 24+.
- Fastify is allowed when intentionally chosen for a small API/webhook prototype.
- If Fastify is chosen, document the reason in `docs/implementation-plan.md` or architecture docs.
- Keep business logic outside route handlers so it can move to NestJS service later if needed.

## Commenting Style

- Add short Thai comments when code introduces an idea we discussed, especially POS flow, loyalty calculation, reward handling, LINE OA mock/real integration, SSR safety, and Angular signals.
- Comments should explain what the block is used for or why it exists, not repeat obvious syntax.
- Explain why semantic elements are used (`section`, `nav`, `article`, `aside`, `form`, `button`, `a`) and why a `div` is only a layout/visual wrapper.
- Prefer comments near semantic HTML, service/store boundaries, shared data arrays, computed state, event handlers with business rules, Tailwind layout decisions, and CSS animation sections that affect the shop workflow.
- Keep comments concise so the code stays easy to scan while still useful for learning later.

## Validation

Run with Node 24:

```powershell
$env:PATH='C:\Users\tanon\AppData\Local\nvm\v24.16.0;' + $env:PATH
npm.cmd run build
npm.cmd test -- --watch=false
```

If running outside Windows, use the project-local Node 24 command pattern from `ApoRaviz_Workspace_Docs/angular/commands.md`.

