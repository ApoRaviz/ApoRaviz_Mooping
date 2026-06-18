# Progress

## Phase 1: Demo Foundation

- [x] Create initial Angular project with SSR and routing
- [x] Upgrade current frontend baseline to Angular 22, TypeScript 6.0.x, and Tailwind CSS v4
- [x] Define project documentation structure
- [x] Build first interactive loyalty demo
- [x] Verify production build
- [x] Initialize separate Git repository
- [x] Add project-specific Codex skill
- [x] Align visual direction with ApoRaviz dark-orange brand
- [x] Restructure page into semantic sections with anchor navigation
- [x] Add animated iPad display for storefront demo
- [x] Add POS confirmation, clear, delete, and undo latest sale flow
- [x] Split UI into focused Angular components
- [x] Track saved rewards when customers choose to keep reward rights for later
- [x] Add GitHub Pages CI/CD workflow for mock demo deployment
- [x] Add implementation plan with step/substep checklist
- [x] Consolidate MooPing command docs into one `docs/commands.md`
- [x] Consolidate small product docs into one `docs/product-spec.md`
- [x] Remove duplicated generic UI skill copy and keep project-specific MooPing skill

## Phase 2: Demo Cleanup And Workspace Alignment

- [x] Redesign first screen into POS workspace prototype
- [x] Split POS, reward, display, and LINE panels into standalone components
- [x] Migrate existing POS workspace layout from legacy component CSS to Tailwind-first templates
- [x] Add teach notes for POS correction, saved rewards, component refactor, and CI/CD
- [x] Move MooPing teach notes into `ApoRaviz_Workspace_Docs/projects/mooping/`
- [x] Add command docs for test, git, and CI/CD
- [x] Feed MooPing learning rules back into the workspace `NEW_PROJECT_GUIDE.md`
- [x] Link MooPing demo and GitHub repo as Quest 1 in ApoRaviz Portfolio
- [x] Link MooPing commands back to central workspace docs
- [x] Clarify that MooPing app repo keeps product docs while learning case study lives in `ApoRaviz_Workspace_Docs/projects/mooping/`
- [x] Refocus deploy teach note into MooPing-specific demo deploy flow
- [x] Rewrite README to explain POS, loyalty, iPad display, mock LINE OA, and current MVP features
- [x] Rename MooPing teach files to be more domain/project-specific

## Phase 3: Real Shop Replan

- [x] Reframe product as a real front-of-shop reward system
- [x] Decide that LINE OA is optional helper, not a required gate
- [x] Define quick buyer, regular buyer, bulk buyer, and reward-sensitive buyer
- [x] Define new reward options: หมูปิ้ง, น้ำเปล่า, ข้าวเหนียว
- [x] Set product rule: `Fast sale first, reward optional, LINE only when useful`
- [x] Decide that quick sale must be default on iPad
- [x] Decide that online ordering/cart/payment are out of v1 scope
- [x] Decide long-term backend stack: NestJS + PostgreSQL/Supabase + LINE Messaging API through backend
- [x] Update product spec and implementation plan for the new direction
- [x] Update README and progress for the new real-shop direction
- [x] Rename project skill from `mooping-loyalty` to `mooping-reward`
- [x] Add reusable LINE OA/webhook learning to `ApoRaviz_Workspace_Docs/backend/`
- [x] Add real-shop hybrid reward case study to `ApoRaviz_Workspace_Docs/projects/mooping/`
- [x] Add quick/member sale mode split in the current Angular prototype
- [x] Make quick sale the default frontend flow
- [x] Remove `save-later` from reward choices and add water reward
- [x] Rename frontend model file from `loyalty.models.ts` to `reward.models.ts`
- [x] Update frontend tests for walk-in reward claim and member undo flow
- [x] Remove or demote demo mock wording from default app
- [x] Refactor frontend state and business actions out of `App` into `LoyaltyStoreService`
- [x] Add pure reward calculation helper with focused unit tests
- [x] Reduce `App` to component composition and event forwarding
- [x] Split Quick Sale and Member Sale presentation into focused components
- [x] Keep shared quantity/confirm/undo controls owned by `PosPanelComponent`
- [x] Add TypeScript 6 `rootDir` config for app source layout
- [x] Disable Angular persistent disk cache to avoid native LMDB crash on the current macOS/Node environment
- [x] Build quick sale first UI
- [ ] Build member sale and LINE linking flow
- [ ] Prepare NestJS backend contract
- [ ] Prepare database schema
- [ ] Integrate LINE OA production webhook and push messages
- [ ] Build admin/security layer
- [ ] Trial with real morning-shop flow
