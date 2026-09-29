# capstone-demo1-playwright

Automated end-to-end tests for the **CyberSoft movie ticket booking demo site** ([demo1.cybersoft.edu.vn](https://demo1.cybersoft.edu.vn/)), built with **[Playwright](https://playwright.dev/)**.

In plain terms: instead of a person manually clicking through the website every time to check that login, sign-up, ticket booking, etc. still work, this project does it automatically with a script — and tells you exactly what passed and what broke.

## Table Of Contents
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [What Gets Tested](#what-gets-tested)
- [Tech Stack And Libraries](#tech-stack-and-libraries)
- [Viewing Test Results](#viewing-test-results)
- [Troubleshooting](#troubleshooting)
- [Environment Variables Reference](#environment-variables-reference)
- [All Ways To Run Tests](#all-ways-to-run-tests)
- [Adding New Tests (for developers)](#adding-new-tests-for-developers)
- [Beyond A Standard Playwright Setup (for developers)](#beyond-a-standard-playwright-setup-for-developers)
- [CI Integration (GitHub Actions)](#ci-integration-github-actions)

<br>

## Project Structure

```
apis/                       # Functions to call backend APIs directly
  └── userApi.ts              # Login API request helper
components/                 # Reusable UI components shared across pages
  ├── LoadingScreen.ts         # Global page-loading overlay
  ├── TopNavigation.ts         # Top nav bar (login/register/logout, section links, profile)
  └── inputField.ts            # Shared form field validation/error-message helpers
config/
  └── folderReporter.ts       # Custom Playwright reporter — saves attachments of failed tests
constants/                  # Static values used across tests
  ├── commonVariables.ts       # UI text, locators, error/success messages (Vietnamese)
  ├── envVariables.ts          # Typed wrapper around required environment variables
  └── userInfo.ts               # Randomly generated user info (via Faker) for Register tests
fixtures/
  └── customFixtures.ts        # Custom Playwright test fixtures (page objects injected into tests)
pages/                      # Page Object Model classes
  ├── base/
  │   ├── BasePage.ts            # Shared low-level actions (click, fill, filter, click by role...)
  │   ├── BaseTest.ts             # Shared beforeAll/afterAll hook setup
  │   └── CommonPage.ts           # Base class for full pages; wires up shared TopNavigation
  ├── main/
  │   ├── home/
  │   │   ├── HomePage.ts           # Full homepage class
  │   │   └── components/            # Homepage-only sections (App section, News section)
  │   ├── LoginPage.ts
  │   ├── RegisterPage.ts
  │   ├── BookingPage.ts            # Movie/cinema selection, seat selection, booking actions
  │   └── ProfilePage.ts            # Update-profile form actions
  └── modals/
      └── CommonModal.ts             # Success/error popup dialog class
routes/
  └── publicRoutes.ts          # Base URL and public/private route path constants
tests/
  ├── auth/                    # Login, Logout, Register test specs
  ├── invalidation/            # Negative/validation test specs (Login, Register)
  ├── booking/
  │   ├── usual/                 # Full booking journey (movie → showtime → seat)
  │   ├── selection-option/       # Booking via the homepage "select option" dropdowns
  │   ├── cinema/                 # Booking via the cinema section
  │   └── history/                # Booking history (guest vs. logged-in)
  ├── home/
  │   ├── app/                    # App-download section tests
  │   └── news/                   # News/tab-switching section tests
  └── profile/                  # Update-profile test specs
utils/
  ├── beforeEachHandlers.ts      # (legacy) shared beforeEach setup helpers
  ├── bookingHandlers.ts          # Reusable booking flows (guest/logged-in/login-while-booking, seat selection)
  ├── commonActionHandlers.ts     # Reusable navigation/login flows shared across test suites
  ├── envHandlers.ts               # Reads and validates required env variables
  └── userHandlers.ts               # Faker-based random data generators
.env.development            # Environment variables for the development/test environment
playwright.config.ts        # Playwright configuration file
tsconfig.json                 # TypeScript compiler configuration (path alias `~/*` → project root)
package.json                    # Project dependencies and npm scripts
allure-report/                   # Generated Allure HTML report (after running the report script)
allure-results/                   # Raw Allure results
playwright-report/                 # Playwright HTML report + failed-test attachments (via FolderReporter)
```

### TypeScript Path Alias (`~/*`)
Imports in this project use `~/` instead of long relative paths (e.g. `~/pages/main/LoginPage` instead of `../../../pages/main/LoginPage`). This is configured in `tsconfig.json`:

```json
"compilerOptions": {
  "paths": {
    "~/*": ["./*"]
  }
}
```

`~/*` maps to `./*` — the project's root folder — so an import always resolves the same way no matter how deeply nested the file doing the importing is. Playwright Test reads this `paths` mapping from `tsconfig.json` automatically at run time; no extra package (like `tsconfig-paths`) and no changes to `playwright.config.ts` are needed for it to work.

To adjust it:
- **Change the alias prefix** (e.g. `~/` → `@/`): edit the key under `paths`, e.g. `"@/*": ["./*"]`, then update existing imports to match.
- **Add a narrower, second alias** (e.g. a shortcut straight to the pages folder): add another entry, e.g. `"@pages/*": ["pages/*"]`, alongside the existing one.
- **Point the alias at a different root** (e.g. if source files move under a `src/` folder): change the target path, e.g. `"~/*": ["src/*"]`.

No other file needs to change for the alias itself — just `tsconfig.json`.

### Test Data Strategy
- **Login** (`Auth` + `Invalidation` + a setup step for Booking/Profile): uses the **fixed** account from `USERNAME_TEST`/`PASSWORD_TEST`, wired straight into `LoginPage.login()` — no parameters needed. The same account is reused as a setup step (`loginOnBaseUrl` in `utils/commonActionHandlers.ts`) whenever a Booking or Profile test needs to start already logged in.
- **Register**: generates a **fresh random account** every run via `@faker-js/faker` plus a custom UUID-based generator (`constants/userInfo.ts` + `utils/userHandlers.ts`), so re-running the suite never collides with a previous run's account.
- **Booking**: split by entry path (usual movie flow / homepage dropdowns / cinema section) and by user state (guest / logged-in beforehand / login-while-booking). Driven by the `MOVIE_*`/`CINEMA_*`/`SHOWTIME_*` variables, which must match what's currently listed on the live demo site.
- **Profile**: logs in with the fixed test account, then submits the `NEW_*` values as the updated profile.

<br>

## Quick Start

**Step 1 — Install Node.js.** This project needs [Node.js](https://nodejs.org/) (any LTS version). If you're not sure whether you have it, open a terminal and run:
```bash
node -v
```
If you see a version number (e.g. `v20.x.x`), you're good. If not, download and install it from [nodejs.org](https://nodejs.org/) first (just click through the installer — no special options needed).

**Step 2 — Get the project onto your computer.**
```bash
git clone https://github.com/thanghoang0163/capstone-demo1-playwright.git
cd capstone-demo1-playwright
```
(If you don't have `git`, you can also click the green **Code → Download ZIP** button on the GitHub page instead, then unzip it and open a terminal inside that folder.)

**Step 3 — Install the project's dependencies.** This downloads all the libraries the tests need (only needs to be done once, or whenever these libraries change):
```bash
npm install
npx playwright install
```
The second command downloads the actual browsers (Chrome, etc.) that Playwright will control — it's normal for this to take a minute or two the first time.

**Step 4 — Check the configuration file (already included).** The project already ships with a `.env.development` file in its root folder (same level as `package.json`) — you don't need to create anything. This file just tells the tests which website to open and which test account/movie/cinema to use, and you can leave it exactly as-is to get started. You'd only ever need to open and edit it if: you want to test with a different account, or the `MOVIE_*`/`CINEMA_*`/`SHOWTIME_*` values no longer match what's currently listed on the live demo site (see [Troubleshooting](#troubleshooting)). See [Environment Variables Reference](#environment-variables-reference) below for what each line in the file means.

**Step 5 — Run the tests!**
```bash
npm run test
```
Playwright will open (invisibly, in the background) a browser, click through the site exactly like a real user, and print a pass/fail summary in your terminal when it's done. To watch it happen live in a visible browser window instead, run `npm run test:headed` instead.

That's it — you've run the whole automated test suite. See [Viewing Test Results](#viewing-test-results) below for a nicer, clickable report of what passed and what failed.

<br>

## What Gets Tested
The suite covers the full main journey of the booking site:

| Area | What it checks |
|---|---|
| **Login / Logout** | Signing in and out with a valid account works correctly |
| **Register** | Creating a brand-new account succeeds (a fresh, randomly generated account is used every run) |
| **Invalidation** | The site correctly rejects bad input — empty fields, wrong password, duplicate username, etc. — on Login and Register |
| **Booking** | Booking a movie ticket through 3 different paths on the site (the usual movie-first flow, the homepage quick-select dropdowns, and the cinema-first flow), each tried both as a guest and as a logged-in user |
| **Home page** | The app-download section and the news section on the homepage behave correctly |
| **Profile** | Updating an existing account's profile information |

<br>

## Tech Stack And Libraries
- **[Playwright](https://playwright.dev/)** — the engine that actually opens a browser and clicks/types on the page, the way a real user would.
- **[TypeScript](https://www.typescriptlang.org/)** — the programming language the tests are written in (a stricter version of JavaScript).
- **[Node.js](https://nodejs.org/)** — the runtime that executes the test code on your machine.
- **[Allure](https://docs.qameta.io/allure/)** (`allure-playwright`) — turns raw test results into a nice, browsable HTML report with charts and history.
- **[dotenv](https://github.com/motdotla/dotenv)** — reads your `.env.development` configuration file.
- **[@faker-js/faker](https://fakerjs.dev/)** — generates realistic random data (names, phone numbers...) for sign-up tests.
- **[npm-run-all2](https://github.com/bcomnes/npm-run-all2)** — runs the `test:report` command's multiple steps (clean → test → build report → open report) in sequence, one after another.

<br>

## Viewing Test Results

Running `npm run test` alone only gives a plain terminal summary. For a full, clickable report, use:

```bash
npm run test:report
```
This single command runs a complete pipeline, one step after another: it deletes any old `allure-results`/`allure-report` folders (script: `pretest:report`) → runs the whole test suite (script: `test`) → builds a fresh Allure report from the results (script: `allure:generate`) → opens that report in your browser (script: `allure:open`). The report is a colorful, clickable dashboard showing every test, its status, and (for any failure) the exact step, screenshot, and video of what went wrong.

Other report-related commands, if you need them individually:
```bash
npm run allure:generate   # just build the report from the last test run
npm run allure:open       # just open the most recently built report
npm run allure:serve      # build + view a report without saving it to disk
```

> **Tip:** Every **failed** test also gets its screenshot/video automatically saved into a `test-results/` folder on your computer (organized by test name), even if you never open the Allure report — handy for a quick look without waiting for a report to build.

<br>

## Troubleshooting

- **`'npx' is not recognized` / `'npm' is not recognized`** — Node.js isn't installed (or your terminal needs to be reopened after installing it). Re-check Step 1 of the Quick Start.
- **`Error: BASE_URL is required` (or similar) when running tests** — The `.env.development` file ships with the repo, so this usually means it got renamed, moved, or a line was deleted by accident. Re-check Step 4 — the file must be named exactly `.env.development` and sit in the project's root folder (next to `package.json`), with every variable listed there still present.
- **Browser-related errors on first run** (e.g. `Executable doesn't exist`) — You skipped `npx playwright install` in Step 3. Run it and try again.
- **Booking tests fail but Login/Register tests pass** — The movie/cinema/showtime names in `.env.development` (the `MOVIE_*`, `CINEMA_*`, `SHOWTIME_*` values) may no longer exist on the live demo site, since it's a shared, constantly-changing environment. Open the site in a browser and update those values to match something currently listed.
- **Tests behave differently on your machine vs. a teammate's** — Make sure you're both on the same Node.js version and have both run `npm install` after the latest `git pull`.

<br>

## Environment Variables Reference
Every variable below is read from `.env.development` and is **required** — the project checks for all of them at startup and will stop with a clear error if one is missing.

| Variable | Meaning |
|---|---|
| `BASE_URL` | The website under test |
| `USER_API_URL` | The backend API address used to verify login directly (not just through the UI) |
| `GROUP_CODE` | The CyberSoft class/group code used to scope test data on the API |
| `USERNAME_TEST` / `PASSWORD_TEST` | An existing, valid account on the site — used by Login/Logout tests and as a "log in first" step for Booking/Profile tests |
| `FULL_NAME_TEST` / `PHONE_NUMBER_TEST` / `EMAIL_TEST` | Profile details tied to that same test account |
| `ADMIN_ROLE` / `CUSTOMER_ROLE` | The exact role labels the site uses (in Vietnamese), used to check role-based behavior |
| `NEW_USERNAME_TEST` / `NEW_PASSWORD_TEST` / `NEW_FULL_NAME_TEST` / `NEW_PHONE_NUMBER_TEST` / `NEW_EMAIL_TEST` | The new values submitted by the Update Profile test |
| `MOVIE_TEST` / `SHOWTIME_TEST` | A movie + showtime currently available on the site, used by the "usual" booking flow |
| `MOVIE_OPTION_TEST` / `CINEMA_OPTION_TEST` / `SHOWTIME_OPTION_TEST` | IDs used by the homepage's quick-select dropdown booking flow |
| `CINEMA_TEST` / `CINEMA_PLACE_TEST` / `CINEMA_SHOWTIME` | A cinema, specific branch, and showtime used by the cinema-first booking flow |

> Because `MOVIE_*`, `CINEMA_*`, and `SHOWTIME_*` point at data on a live, shared demo site, they may need to be refreshed from time to time to match whatever is currently listed there.

> **Note:** `.env.development` is intentionally committed alongside the source code (`.gitignore`'s `.env*` exclusion block is commented out) so that anyone who clones the repo can run the tests immediately without extra setup.

<br>

## All Ways To Run Tests

- Run everything:
```bash
npx playwright test
```
Runs headless (no visible browser window) by default. Add `--headed` to watch it run, or use the shortcut:
```bash
npm run test:headed
```

- Run only one browser project (only `chromium` is enabled by default; Firefox/WebKit are pre-configured but commented out in `playwright.config.ts`):
```bash
npx playwright test --project=chromium
```

- Run only one feature area:
```bash
npx playwright test tests/booking/
npx playwright test tests/booking/usual/
```

- Run one specific file:
```bash
npx playwright test login.spec.ts
```

- Run tests whose name matches a keyword:
```bash
npx playwright test --grep "Login"
```

### Using VS Code instead of the terminal
Install the [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension for a point-and-click experience:
- **Testing Sidebar** — see, run, and debug every test without touching the terminal.
- **Gutter icons** — click the green triangle next to any test in the editor to run just that one.
- **Debugging** — set breakpoints and step through a test live.

<br>

## Adding New Tests (for developers)

This project combines the classic Page Object Model (POM) pattern with Playwright's **custom fixtures**, so page objects don't need to be instantiated manually inside every test:

- **BasePage** — abstract class with shared low-level actions (`click`, `fill`, `clickByRole`, `filter`, `selectOption`, `getMessageText`, etc.) used by every page/component/modal.
- **CommonPage** — base class for full pages; automatically wires up the shared `TopNavigation` component.
- **Pages** — full pages (e.g., `LoginPage`, `RegisterPage`, `HomePage`, `BookingPage`, `ProfilePage`), each with its own locators and actions.
- **Components / Modals** — reusable UI pieces that appear across multiple pages (`TopNavigation`, `LoadingScreen`, `CommonModal`, `InputField`, and homepage-only sections like `AppSection`/`NewsSection`).
- **Fixtures** (`fixtures/customFixtures.ts`) — extend Playwright's base `test` to inject ready-to-use page objects (`loginPage`, `registerPage`, `homePage`, `bookingPage`, `profilePage`, `topNavigation`, `commonModal`, `loadingScreen`, `inputField`) directly into each test's arguments.
- **Shared flows** (`utils/commonActionHandlers.ts`, `utils/bookingHandlers.ts`) — higher-level, reusable sequences (e.g. "go to base URL and wait for the loading screen to disappear", "log in with the existing account", "select movie/cinema/showtime and verify the booking result") composed from page-object methods once and reused across many specs, wrapped in `test.step` for readable reports.

**Example:**

```typescript
// pages/main/LoginPage.ts
export class LoginPage extends CommonPage {
  public async login(): Promise<void> {
    await this.enterUsername();
    await this.enterPassword();
    await this.clickToLogin();
  }
}

// tests/auth/login.spec.ts
import { test, expect } from "~/fixtures/customFixtures";
import { pageVariables } from "~/constants/commonVariables";
import { goToLoginPage } from "~/utils/commonActionHandlers";

test.beforeEach(async ({ page, homePage }) => {
  await goToLoginPage(page, homePage);
});

test.describe("LOGIN", async () => {
  test("Verify Login Successfully", async ({ commonModal, loginPage }) => {
    await loginPage.enterUsername();
    await loginPage.enterPassword();
    await loginPage.clickToLogin();

    const recordedDialogMsg = await commonModal.getMessageText();
    expect(recordedDialogMsg).toEqual(pageVariables.login.notification.success);
  });
});
```

When adding a new page, folder, or spec, refer to the [Project Structure](#project-structure) above to decide where it belongs. Register any new page object as a fixture in `fixtures/customFixtures.ts` if you want it auto-injected into tests. For a multi-step flow reused across several specs (like booking or "login as setup"), add it to `utils/commonActionHandlers.ts` or a dedicated `utils/*Handlers.ts` file rather than duplicating the same steps inside each spec.

Group related tests with `test.describe`, and break a flow into logical, reportable steps with `test.step` (used throughout `utils/commonActionHandlers.ts` and `utils/bookingHandlers.ts`):

```typescript
test.describe("INVALIDATION - LOGIN", () => {
  test("Verify Empty Value In Input Fields", async ({ page }) => {
    // ...test code...
  });
});
```
```typescript
await test.step("Enter username and password, and then Click 'Đăng nhập' button", async () => {
  await loginPage.login();
});
```

<br>

## Beyond A Standard Playwright Setup (for developers)
*(Optional reading — this explains what makes this project's structure more advanced than a typical "just install Playwright and write specs" starter, for anyone maintaining or reviewing the code.)*

- **Dependency-injected page objects, not manual instantiation.** Instead of writing `const loginPage = new LoginPage(page);` at the top of every test, `fixtures/customFixtures.ts` extends Playwright's base `test` so page objects (`loginPage`, `bookingPage`, `commonModal`, etc.) arrive pre-built as test arguments.
- **A real page-object inheritance chain, not one flat class per page.** `BasePage` (raw actions) → `CommonPage` (auto-wires the shared `TopNavigation`) → concrete pages. Shared components (`TopNavigation`, `LoadingScreen`, `InputField`) are composed into pages rather than each page re-implementing its own nav/loading logic.
- **A reusable "flow" layer above the page objects.** `utils/commonActionHandlers.ts` and `utils/bookingHandlers.ts` hold multi-step business flows composed from page-object calls once and reused across dozens of specs, instead of copy-pasting the same steps into every test file.
- **TypeScript path aliasing (`~/*`).** `tsconfig.json` maps `~/*` to the project root, so imports read `import { LoginPage } from "~/pages/main/LoginPage"` instead of brittle relative paths like `../../../pages/main/LoginPage`.
- **Fail-fast, typed environment variables.** `utils/envHandlers.ts`'s `requiredEnv()` throws immediately at startup if a required `.env.development` variable is missing, and `constants/envVariables.ts` centralizes every variable into one typed object, instead of scattering raw `process.env.SOMETHING` calls (possibly `undefined`) throughout test files.
- **Dynamic, collision-free test data, not hardcoded fixtures.** Register tests generate a fresh account every run via `@faker-js/faker` plus a custom UUID-based username generator, so re-running the suite against the same shared/live demo site never fails on "account already exists."
- **Hybrid UI + API testing.** `apis/userApi.ts` calls the backend login endpoint directly via Playwright's `request` context, so login can be validated at the API layer as well as through the UI.
- **A custom failure-artifact reporter, on top of Allure.** `config/folderReporter.ts` is a hand-written Playwright reporter that mirrors each failed test's folder structure under `test-results/` and copies its screenshots/videos/traces there, so failures are browsable by file path, not just by report UI.
- **A one-command, failure-tolerant reporting pipeline.** `npm run test:report` chains cleanup → test run → Allure generation → Allure open via `npm-run-all2` (`run-s --continue-on-error`), so the pipeline still finishes and hands you a fresh report even when some tests fail — instead of a failed `npm run test` aborting the whole chain before the report step ever runs.
- **Multiple reporters running simultaneously.** `playwright.config.ts` combines the HTML reporter, the `list` console reporter, `allure-playwright`, and the custom `FolderReporter` in one run, instead of picking just one reporting format.

<br>

## CI Integration (GitHub Actions)

A GitHub Actions workflow at `.github/workflows/playwright.yml` runs the whole suite automatically, without anyone needing to run it by hand:

- Sets up Node.js and installs dependencies via `npm ci`
- Installs Playwright's browsers with `npx playwright install --with-deps`
- Runs the full test suite with `npx playwright test`
- Uploads the Playwright HTML report (`playwright-report/`) as a downloadable workflow artifact (kept for 30 days), even if the run fails

**Triggers:** every push to `main`/`master`, and every pull request opened or updated against `main`/`master`.

**Viewing CI results:**
1. Go to the **Actions** tab of the repository.
2. Open the relevant **Playwright Tests** run.
3. Scroll to **Artifacts** and download `playwright-report` — view it locally with `npx playwright show-report`, or open `playwright-report/index.html` directly.

> **Note:** Allure report generation and multi-browser/multi-environment execution aren't wired into CI yet — it currently runs the default `chromium` project only, matching the local `playwright.config.ts` setup. Since Booking tests depend on specific movies/cinemas/showtimes currently listed on the live demo site, they may occasionally fail in CI if that data has changed since `.env.development` was last updated.
