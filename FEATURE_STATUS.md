# Feature Status

Last verified: 2026-07-12. Status describes real end-to-end behavior, not screen presence.

Legend: Planned, Designing, Backend, Frontend, UI/UX, Security Review, QA, Complete, Deferred, Blocked.

| Feature | Status | Backend | Frontend / UI | Security / QA | Dependencies and next gate |
| --- | --- | --- | --- | --- | --- |
| Project foundation | Complete | Supabase client foundation | Expo Router shell and design system | CI checks green | Maintain compatibility and docs |
| Supabase environment setup | QA | Real project connected; migration reportedly applied | Missing-env local fallback | Env files ignored | Reconfirm environment separation before release |
| Registration and email verification | QA | Supabase signup/resend implemented | Auth and callback screens implemented | Real fresh verification callback still required | Exact redirect allowlist and Android link test |
| Login and session restoration | QA | Supabase password login/session restore | Signed-in boundaries implemented | Relaunch/device evidence required | Auth callback hardening |
| Logout | QA | Supabase sign-out called | Profile logout action available | Failure-path restoration remains residual risk | Emulator relaunch test |
| Password recovery | QA | Recovery email/update implemented | Recovery callback/password UI implemented | Real email link and intent binding required | Redirect URL plus callback transaction state |
| Auth callback correlation | Security Review | Provider credentials validated | Callback routes render | **Open Low finding:** no local transaction/route/type binding | Implement pending transaction and hostile-link tests |
| Recipe create | Security Review | Real recipe and child inserts implemented | Add screen implemented | Partial writes and unbounded input remain | Atomic RPC and server limits |
| Recipe list/detail | QA | Real PostgREST reads implemented under RLS | Recipe list/detail screens implemented | First-user flow observed; two-user denial pending | Direct two-user RLS test |
| Recipe update | Backend | Not implemented in repository | No verified complete workflow | Not tested | Repository mutation, UI, RLS tests |
| Recipe delete | Backend | Not implemented in repository | No verified complete workflow | Not tested | Repository mutation, confirmation UI, RLS tests |
| Recipe resource controls | Security Review | **Open Medium finding:** no practical schema/cardinality/per-user quota | Client trims only | Offline PoC/static audit complete | Migration constraints and atomic admission RPC |
| Favorites | Frontend | Schema field/read mapping exists | Display affordances exist | Mutation/RLS behavior unverified | Recipe update support |
| Search | Frontend | Current loaded recipes filtered client-side | Search screen exists | Performance/privacy not validated | Real dataset; later indexed server search |
| Collections and tags | Planned | Schema foundation exists | Product surfaces incomplete | No end-to-end tests | Phase 3 |
| Private recipe images | Deferred | Storage buckets/policies not implemented | Sample/fallback image used | Requires upload validation and owner policies | Phase 2 |
| Offline cookbook and sync | Designing | Repository boundary retained for future queue | Network/local foundations only | Conflict/data-loss tests absent | Phase 2 persistence and sync design |
| Grocery list | Frontend | Schema/merge utility foundation | Placeholder/product screen exists | Unit merge tests only | Phase 4 backend and offline behavior |
| Meal planner | Frontend | Schema foundation | Placeholder/product screen exists | No end-to-end tests | Phase 4 |
| AI recipe import | Designing | No provider endpoint or tool call | Local prompt preview only | Prompt boundary documented; not a shipped remote surface | Phase 5 protected backend, limits, schema evals |
| Analytics | Deferred | PostHog dependency/adapter exists | No verified event taxonomy | Privacy/consent/config not verified | Phase 6 |
| Crash reporting | Deferred | Sentry dependency exists | No verified production event | Redaction/source-map test required | Phase 6 |
| Accessibility hardening | Designing | N/A | Some labels/native controls exist | Full screen-reader/contrast/text-size review pending | Phase 6 and every feature DoD |
| Entitlements/payments | Planned | RevenueCat not installed/configured | Paid UX not active | Billing authorization not designed | Phase 7 |
| App Store / Play release | Planned | Environment separation incomplete | Store assets/checklists documented | Physical-device, privacy, release gates pending | Phase 7 |

## Phase 1 Dependencies

1. Callback transaction and recovery-intent binding.
2. Server-enforced recipe bounds and atomic creation.
3. Recipe update and delete implementation.
4. Real email verification and password recovery on Android.
5. Two-user direct RLS create/read/update/delete and child-link denial.
6. Required checks, Android smoke test, security/production review, PR evidence, and merge.
