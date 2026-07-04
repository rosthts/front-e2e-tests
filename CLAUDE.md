# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Type-check and build for production
npm run lint       # Run ESLint
npx playwright test                          # Run all E2E tests (starts dev server automatically)
npx playwright test tests/e2e/auth.spec.ts  # Run a single test file
npx playwright test --ui                     # Open interactive Playwright UI
npx playwright show-report                   # Open last HTML test report
```

## Architecture

React 19 + TypeScript + Vite. Minimal login/dashboard flow — no routing library, navigation via conditional rendering in `App.tsx` based on `isLoggedIn` state.

**Auth:** no backend — any non-empty email/password succeeds after 500ms simulated delay. Test credentials: `test@example.com` / `password`.

**State management** lives entirely in `App.tsx`. Passes all form state down as props to presentational components.

**Component structure:**
- `App.tsx` — stateful root; renders either `<LoginForm>` or `<Dashboard>` based on `isLoggedIn`
- `src/components/LoginForm.tsx` — stateless form UI, props-driven
- `src/components/Dashboard.tsx` — stateless, receives `onLogout` callback

## E2E Test structure

```
tests/
├── e2e/
│   ├── authenticated/
│   │   └── authenticated.spec.ts   — Logout (runs with storageState)
│   ├── setup/
│   │   └── global.setup.ts         — saves localStorage auth state
│   └── unauthenticated/
│       └── unauthenticated.spec.ts — Login page, Successful login, Invalid credentials
├── factories/user.factory.ts       — createUser(), VALID_USER, INVALID_CREDENTIALS_CASES
├── fixtures/index.ts               — extended test: loginPage, dashboardPage, credentials
└── pages/
    ├── base.page.ts                — abstract BasePage, protected page: Page
    ├── login.page.ts               — LoginPage extends BasePage
    └── dashboard.page.ts           — DashboardPage extends BasePage
```

**Import rule:** always import `test` and `expect` from `'../fixtures'` (or `'../../fixtures'`), never from `@playwright/test` directly.

**Auth state:** `src/App.tsx` persists `isLoggedIn` to `localStorage`. `global.setup.ts` logs in, waits for Dashboard, saves `storageState` to `tests/.auth/user.json`. The `chromium` project loads this state — tests start already authenticated.

**Projects:**
- `setup` — runs `global.setup.ts`, no dependencies
- `chromium` — authenticated tests, depends on `setup`, uses `storageState`
- `chromium-guest` — unauthenticated tests, no storageState

## Playwright patterns established

- No `test.each` in Playwright — use `for...of` loops for parametrized tests
- Fixture with no dependencies: use `{}` (not `_`) with `//eslint-disable-next-line no-empty-pattern`
- `DashboardPage.open()` throws — dashboard has no direct URL, always reach it via login
- Constructor in POM subclass: no access modifier (`constructor(page: Page)`, not `private` or `readonly`) to avoid shadowing `protected page` from BasePage
- `fixtures/index.ts` naming allows `import { test } from '../fixtures'` without specifying filename

## Locator priority (highest to lowest stability)

1. `getByRole` — tests accessibility semantics
2. `getByLabel` — tied to label element
3. `getByTestId` — explicit QA contract
4. `getByText` — brittle if copy changes
5. CSS selectors — most brittle

## ESLint notes

- `react-hooks/rules-of-hooks` is disabled for `tests/**` — Playwright uses `use` as a fixture callback parameter name which triggers the React hooks lint rule
- `no-empty-pattern` is disabled per-line on fixtures with no dependencies

## Course progress

This project is a learning course (Junior → Senior QA). Mentor mode: Claude explains and reviews, user implements.

| Module | Topic | Status |
|--------|-------|--------|
| 00 | Setup, POM, fixtures, factories | ✅ Done |
| 01 | Locator strategies | ✅ Done |
| 02 | playwright.config.ts | ✅ Done |
| 03 | Global setup & authentication state | ✅ Done |
| 04 | CI/CD with GitHub Actions | ✅ Done |
| 05 | Test data management & env vars | ✅ Done |
| 06 | Dashboard page & counter tests | ✅ Done |
| 07 | Visual regression testing | ✅ Done |
| 08 | Network interception & mocking | ✅ Done |
| 09 | Accessibility testing | ✅ Done |
| 10 | Test tags & filtering | ✅ Done |
| 11 | README | ✅ Done |
| 12–14 | TBD | — |
