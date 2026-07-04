# Front Test Automation Practice

Навчальний frontend-проєкт для практики UI та E2E тестування з Playwright на прикладі простої форми логіну та dashboard без реального бекенду.

## Tech Stack

- `React` `19.2.5`
- `React DOM` `19.2.5`
- `TypeScript` `6.0.2`
- `Vite` `8.0.10`
- `@playwright/test` `1.59.1`
- `@axe-core/playwright` `4.12.1`
- `ESLint` `10.2.1`
- `dotenv` `17.4.2`

## Архітектура тестів

- `POM` (`tests/pages`) - інкапсулює локатори та дії сторінок у `LoginPage` і `DashboardPage`.
- `fixtures` (`tests/fixtures`) - розширюють базовий `test` готовими об'єктами `loginPage`, `dashboardPage` і `credentials`.
- `factories` (`tests/factories`) - створюють тестові дані та набори невалідних кейсів для параметризованих перевірок.
- `projects` (`playwright.config.ts`) - розділяють запуск на `setup`, `chromium` (authenticated) і `chromium-guest` (unauthenticated).

## Як запустити

### Розробка

```bash
npm install
```

```bash
npm run dev
```

### Тести

```bash
npx playwright test
```

```bash
npx playwright test tests/e2e/unauthenticated/unauthenticated.spec.ts
```

```bash
npx playwright test --ui
```

```bash
npx playwright show-report
```

Примітка: під час `npx playwright test` dev server піднімається автоматично через `webServer` у конфігурації Playwright.

## Структура тестів

```text
tests/
├── .auth/
│   └── user.json                       # storageState для вже автентифікованого користувача
├── e2e/
│   ├── authenticated/
│   │   ├── accessibility.spec.ts      # accessibility-перевірки для dashboard
│   │   ├── authenticated.spec.ts      # logout та базові authenticated flows
│   │   └── counter.spec.ts            # перевірки лічильника на dashboard
│   ├── setup/
│   │   └── global.setup.ts            # логінить користувача і зберігає auth state
│   └── unauthenticated/
│       ├── accessibility.spec.ts      # accessibility-перевірки сторінки логіну
│       ├── network.spec.ts            # мережеві / mock-сценарії для guest flow
│       ├── unauthenticated.spec.ts    # валідація логіну, успішний та негативні сценарії
│       └── visual.spec.ts             # візуальні snapshot-перевірки
├── factories/
│   └── user.factory.ts                # валідні та невалідні тестові користувачі
├── fixtures/
│   └── index.ts                       # кастомний test і спільні fixtures
└── pages/
    ├── base.page.ts                   # базовий page object
    ├── dashboard.page.ts              # POM для dashboard
    └── login.page.ts                  # POM для login form
```

## Теги

| Тег | Для чого використовується | Приклад запуску |
| --- | --- | --- |
| `@smoke` | Критичні базові сценарії, які швидко перевіряють, що головний функціонал працює | `npx playwright test --grep @smoke` |
| `@regression` | Ширший набір перевірок для повторного прогону після змін | `npx playwright test --grep @regression` |
| `@visual` | Візуальні regression-перевірки через `toHaveScreenshot()` | `npx playwright test --grep @visual` |
| `@a11y` | Accessibility-перевірки через `axe-core` | `npx playwright test --grep @a11y` |

### Як фільтрувати

```bash
npx playwright test --grep @smoke
```

```bash
npx playwright test --grep @regression
```

```bash
npx playwright test --grep @visual
```

```bash
npx playwright test --grep @a11y
```

```bash
npx playwright test --grep ".*@smoke.*|.*@regression.*"
```

```bash
npx playwright test --grep-invert @smoke
```
