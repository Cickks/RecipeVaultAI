# AI Development Workflow

## Purpose

The repository is the source of truth. A new AI session must be able to resume without prior chat history, and chat claims never override implementation, Git, tests, or maintained project documents.

## Session Start

1. Read `C:\Apps\CODEX_WORKSPACE_GUIDE.md`.
2. Read repository instructions and these files:
   - `PROJECT_CONTEXT.md`
   - `SESSION_HANDOFF.md`
   - `FEATURE_STATUS.md`
   - `DECISION_LOG.md`
   - `docs/ROADMAP.md`
   - task-relevant architecture/security/database/design docs
3. Run `git status --short --branch`, inspect recent commits, and identify the active PR.
4. Inspect the real implementation before proposing or changing behavior.
5. Load only the agents, skills, prompts, and checklists relevant to the task, using `docs/WORKSPACE_SKILL_AGENT_USAGE.md`.

## Evidence Hierarchy

When sources disagree, use this order:

1. Current implementation, migrations, tests, and build configuration.
2. Git branch/commit and current PR/check state.
3. `PROJECT_CONTEXT.md`, `FEATURE_STATUS.md`, and `SESSION_HANDOFF.md`.
4. Detailed PRD, architecture, roadmap, security, database, and deployment docs.
5. Conversation history.

Correct stale documents when code or verified runtime evidence proves them wrong. Do not invent missing facts.

## Implementation Workflow

1. State the narrow objective and identify affected trust/ownership boundaries.
2. Confirm whether a settled decision in `DECISION_LOG.md` applies.
3. Implement the smallest production-quality slice using existing patterns.
4. Keep routes/screens thin and preserve feature, repository, and service boundaries.
5. Add tests proportional to risk and update migration/docs together when contracts change.
6. For user-owned data, test positive and negative authorization directly against the backend.
7. For endpoints, require authentication, authorization, schema/body bounds, shared atomic rate limits, safe logs, and failure tests.
8. For AI, keep static privileged instructions separate and encode/delimit untrusted user/tool content only in untrusted positions.

## Required Verification

Run the checks relevant to the change; for every significant app pass run:

```powershell
npm run typecheck
npm run test
npx expo install --check
```

Also perform:

- Android emulator smoke testing for changed user workflows.
- iOS/physical-device testing when release risk warrants it.
- Two-user RLS testing for every changed user-owned table/operation.
- Secret and staged-diff review before push/release.
- Security, accessibility, and production-readiness review proportional to the change.

Never report a check as passed unless it ran successfully in the current revision or the handoff clearly labels it as prior evidence.

## Git and Pull Requests

- Work on a focused branch; do not commit directly to `main`.
- Preserve unrelated user changes.
- Commit coherent slices with imperative messages.
- Push to the existing task PR when one exists; do not open duplicate PRs.
- Keep incomplete work as a draft PR.
- Mark ready only when the documented exit gate and CI/manual evidence pass.
- Merge before deleting the branch.

## Documentation Maintenance

After significant implementation work:

- Update `PROJECT_CONTEXT.md` only when architecture, milestone, standards, priorities, or debt changed.
- Append/update `DECISION_LOG.md` when a consequential decision is made or revisited.
- Update affected rows in `FEATURE_STATUS.md` based on real end-to-end state.
- Always update `SESSION_HANDOFF.md` before ending the coding session.
- Update `TECH_STACK.md` when dependencies, runtime, tools, deployment, or conventions change.
- Update detailed docs such as `docs/ROADMAP.md`, `docs/SECURITY.md`, or `docs/DATABASE.md` when their contracts change.

Preserve useful history. Make focused edits rather than rewriting stable sections.

## Session End Handoff

`SESSION_HANDOFF.md` must record:

- accomplishments and exact files changed;
- checks and commands actually run;
- branch, HEAD, PR, and CI state;
- blockers, bugs, and incomplete work;
- manual actions and safety constraints;
- recommended next specialist and one concrete next task.

End with a clean distinction between committed/pushed work and local uncommitted work. The next session should be able to start from the handoff without asking what happened previously.
