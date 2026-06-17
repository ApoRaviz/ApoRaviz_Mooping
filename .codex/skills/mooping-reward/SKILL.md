---
name: mooping-reward
description: Use when building or updating the MooPing Reward project in ApoRaviz_Mooping, including quick-sale-first iPad POS flow, optional LINE OA member rewards, 10-sticks reward rules, customer-selected rewards, NestJS/PostgreSQL backend planning, project docs, progress tracking, and reusable learning capture to ApoRaviz_Workspace_Docs.
---

# MooPing Reward

Use this skill only when working on `ApoRaviz_Mooping`.

The old skill name `mooping-loyalty` has been replaced by `mooping-reward`.

## Project Defaults

- Product display name is `MooPing Reward`.
- Repository/project path stays `ApoRaviz_Mooping`.
- This project does not have a special learning mode.
- `ApoRaviz_Portfolio` is the only project with a hand-holding learning mode.
- Keep project-specific product specs, implementation plans, commands, and progress in `ApoRaviz_Mooping/docs/` and `progress.md`.
- Put reusable learning in `ApoRaviz_Workspace_Docs`.
- Keep code comments short and important: explain business rules, function intent, security boundaries, or non-obvious flow.
- Do not create `docs/teach/` inside this repo by default.

## Core Product Direction

```text
Fast sale first, reward optional, LINE only when useful.
```

This product is for a real morning Moo Ping shop:

- Customers may be rushing to work or school.
- Quick buyers must not be forced to scan, log in, or enter phone numbers.
- LINE OA is optional for regular customers who want the shop to remember accumulated rewards.
- A customer who buys 10 sticks in one sale must receive a reward even without adding LINE.

## Business Rules

- Every 10 purchased sticks earns 1 reward.
- Extra sticks after a reward continue into the next round.
- Reward choices for v1 are:
  - `หมูปิ้ง 1 ไม้`
  - `น้ำเปล่า 1 ขวด`
  - `ข้าวเหนียว 1 ห่อ`
- Quick sale can be anonymous.
- Member sale can accumulate across visits through LINE OA linking.
- Reward earning and reward claiming are separate events.
- POS sales should be staged as a pending ticket first, then confirmed.
- Staff must be able to clear, delete, undo, or void mistaken sales.

## UX Direction

- Default iPad screen should be `Quick Sale`.
- Do not make LINE scan the first screen.
- Do not block sales behind customer search.
- Use large touch targets for morning rush flow.
- Keep member/LINE tools available but secondary.
- Make totals, pending reward status, and next action readable at a glance.
- Remove or demote demo-only mock visuals when moving toward the real shop system.

## Backend Direction

- Default long-term backend stack is NestJS + PostgreSQL/Supabase on Node.js 24+.
- LINE Messaging API must be called from backend only.
- Keep LINE channel secret, LINE channel access token, Supabase service role key, and all secrets out of Angular frontend.
- Verify LINE webhook signature before processing events.
- Handle webhook redelivery/idempotency with `webhookEventId`.
- Use database transactions for sale + reward changes when backend/database are added.
- Fastify is allowed only for an intentionally small webhook/API prototype and must be documented in project docs.

## Learning Capture

When MooPing work teaches something reusable, update Workspace Docs:

```text
Angular concept/API              -> ApoRaviz_Workspace_Docs/angular/
Tailwind/layout pattern          -> ApoRaviz_Workspace_Docs/angular/tailwind/
Angular command/run flow         -> ApoRaviz_Workspace_Docs/angular/commands.md or angular/teach/
Node.js/Fastify/backend concept  -> ApoRaviz_Workspace_Docs/nodejs/ or backend/
LINE OA/webhook concept          -> ApoRaviz_Workspace_Docs/backend/
NestJS architecture              -> ApoRaviz_Workspace_Docs/nestjs/
PostgreSQL/Supabase concept      -> ApoRaviz_Workspace_Docs/postgresql/ or backend/
MooPing business/UX case study   -> ApoRaviz_Workspace_Docs/projects/mooping/
MooPing product spec/plan        -> ApoRaviz_Mooping/docs/
```

## Validation

For code changes, run with Node 24:

```powershell
$env:PATH='C:\Users\tanon\AppData\Local\nvm\v24.16.0;' + $env:PATH
npm.cmd run build
npm.cmd test -- --watch=false
```

For docs-only changes, run markdown/diff checks where useful and report that build was not needed.
