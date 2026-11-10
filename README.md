# capstone-demo1-playwright

Automated end-to-end tests for the **CyberSoft movie ticket booking demo site** ([demo1.cybersoft.edu.vn](https://demo1.cybersoft.edu.vn/)), built with **[Playwright](https://playwright.dev/)**.

In plain terms: instead of a person manually clicking through the website every time to check that login, sign-up, ticket booking, etc. still work, this project does it automatically with a script — and tells you exactly what passed and what broke.

## Table Of Contents
- [Tech Stack And Libraries](#tech-stack-and-libraries)
- [Project Structure](#project-structure)
- [What Gets Tested](#what-gets-tested)
- [Test Data Strategy](#test-data-strategy)
- [Setup And Run Tests](#setup-and-run-tests)
- [Environment Variables Reference](#environment-variables-reference)
- [Adding New Tests (for developers)](#adding-new-tests-for-developers)
- [Viewing Test Results](#viewing-test-results)
- [Troubleshooting](#troubleshooting)
- [Beyond A Standard Playwright Setup (for developers)](#beyond-a-standard-playwright-setup-for-developers)
- [CI Integration (GitHub Actions)](#ci-integration-github-actions)

<br>

## Tech Stack And Libraries
- **[Playwright](https://playwright.dev/)** — the engine that actually opens a browser and clicks/types on the page, the way a real user would.
- **[TypeScript](https://www.typescriptlang.org/)** — the programming language the tests are written in (a stricter version of JavaScript).
- **[Node.js](https://nodejs.org/)** — the runtime that executes the test code on your machine.
- **[Allure](https://docs.qameta.io/allure/)** (`allure-playwright`) — turns raw test results into a nice, browsable HTML report with charts and history.
- **[dotenv](https://github.com/motdotla/dotenv)** — reads your `.env.development` configuration file.
- **[@faker-js/faker](https://fakerjs.dev/)** — generates realistic random data (names, phone numbers...) for sign-up tests.
- **[npm-run-all2](https://github.com/bcomnes/npm-run-all2)** — runs the `test:report` command's multiple steps (clean → test → build report → open report) in sequence, one after another.
- **[rimraf](https://github.com/isaacs/rimraf)** — deletes the old `allure-results` / `allure-report` folders at the start of `test:report`, on any operating system.

<br>

## Project Structure

```
apis/                       # Functions that call the backend API directly
  ├── apisRoutes.ts            # Every API endpoint URL in one place (built from API_URL)
  ├── userApi.ts               # Register / Login requests
  ├── movieApi.ts              # Movie list and movie detail
  ├── cinemaApi.ts             # Cinema systems, branches, schedules, showtimes of a movie
  └── bookingApi.ts            # Seat list of a showtime
components/                 # Reusable UI components shared across pages
  ├── LoadingScreen.ts         # Global page-loading overlay
  ├── TopNavigation.ts         # Top nav bar (login/register/logout, section links, profile)
  └── inputField.ts            # Shared form field validation/error-message helpers
config/
  └── folderReporter.ts       # Custom Playwright reporter — saves attachments of failed tests
constants/                  # Static values used across tests
  ├── timeoutConstant.ts       # Shared timeout values (DEFAULT / SHORT / MEDIUM / LONG)
  ├── userConstant.ts          # Randomly generated user info (via Faker) for Register/Booking tests
  └── variables/
      ├── generalVariables.ts   # Shared locator IDs, button labels, common messages (Vietnamese)
      ├── routeVariables.ts     # BASE_URL / API_URL read from .env.development
      ├── userVariables.ts      # Fixed test-account values read from .env.development
      ├── profileVariables.ts   # Update-profile values read from .env.development
      ├── movieVariables.ts     # Movie values read from env (currently not used by any test)
      └── cinemaVariables.ts    # Cinema values read from env (currently not used by any test)
fixtures/
  └── customFixtures.ts        # Custom Playwright test fixtures (page objects injected into tests)
pages/                      # Page Object Model classes
  ├── base/
  │   ├── BasePage.ts            # Shared low-level actions (click, fill, select) and assertion helpers
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
  │   ├── usual/                 # Movie-first booking: guest, logged-in, login-while-booking, no-seat-selected
  │   ├── selection-option/       # Same 4 scenarios via the homepage "select option" dropdowns
  │   ├── cinema/                 # Same 4 scenarios via the homepage cinema section
  │   └── history/                # Booking history (guest vs. logged-in)
  ├── home/
  │   ├── app/                    # App-download section tests
  │   └── news/                   # News/tab-switching section tests
  └── profile/                  # Update-profile test specs
utils/
  ├── apiHandlers.ts              # Generic HTTP helpers (fetchApi, getApi, postApi, putApi, patchApi, deleteApi)
  ├── bookingHandlers.ts          # Reusable booking flows (pick movie/cinema/showtime from API data, seat selection, verifications)
  ├── commonHandlers.ts           # Reusable navigation, register and login flows shared across test suites
  ├── envHandlers.ts               # requiredEnv(): reads an env variable or stops with a clear error
  └── userHandlers.ts               # Faker-based random data generators
.env.development            # Environment variables for the development/test environment
playwright.config.ts        # Playwright configuration file
tsconfig.json                 # TypeScript compiler configuration (path alias `~/*` → project root)
package.json                    # Project dependencies and npm scripts
allure-report/                   # Generated Allure HTML report (after running the report script)
allure-results/                   # Raw Allure results
playwright-report/                 # Playwright HTML report
test-results/                       # Screenshots/videos/traces of failed tests (copied by FolderReporter)
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

<br>

## What Gets Tested
The suite covers the full main journey of the booking site:

| Area | What it checks |
|---|---|
| **Login / Logout** | Signing in and out with a valid account works correctly |
| **Register** | Creating a brand-new account succeeds (a fresh, randomly generated account is used every run) |
| **Invalidation** | The site correctly rejects bad input — empty fields, wrong password, duplicate username, etc. — on Login and Register |
| **Booking** | Booking a movie ticket through 3 different paths on the site (the usual movie-first flow, the homepage quick-select dropdowns, and the homepage cinema section). Each path is tried as a guest (asked to log in), as an already logged-in user, as a user who logs in in the middle of booking, and with no seat selected (error shown) |
| **Booking history** | Viewing booking history as a guest and as a logged-in user |
| **Home page** | The app-download section and the news section on the homepage behave correctly |
| **Profile** | Updating an existing account's profile information |

<br>

## Test Data Strategy

### Test Accounts: Fixed And Fresh
The tests use two kinds of user accounts:

- **Fixed test account** (`USERNAME_TEST` / `PASSWORD_TEST` and related values in `.env.development`): an account that already exists on the demo site. It is used wherever a known, stable user is needed — Login, Logout, Booking History (logged in), and as the "already existing" username/email in the Register Invalidation tests. The Update Profile test logs in with a second set of values (`UPDATE_*`) and submits the new profile details from the same set.
- **Fresh account per test**: the Register test, and every Booking test that needs a logged-in user (logged in beforehand, no seat selected, log in while booking), registers a brand-new account through the Register page in `beforeEach` (`createNewUser` in `utils/commonHandlers.ts`). Username, password, full name and email are generated randomly with `@faker-js/faker` and a UUID-based generator (`constants/userConstant.ts` + `utils/userHandlers.ts`), and the generated credentials are reused to log in. Because every test gets its own user, tests stay isolated and do not conflict when they run in parallel. Guest tests need no account.

The Register test also verifies the new account by calling the login API directly (`apis/userApi.ts`).

> Accounts created during a run are not deleted afterwards — random usernames keep them from clashing with later runs. Setup/cleanup hooks (`pages/base/BaseTest.ts`) exist only as placeholders for now.

### Movie, Cinema And Showtime Data From The API
Movies, cinemas and showtimes are not created by the tests and are not stored in `.env.development`. Instead, the Booking helpers (`utils/bookingHandlers.ts`) call the site's API (`apis/`) at run time and pick an entry by its position in the response:

| Booking flow | Data picked from the API response |
|---|---|
| Usual (movie-first) | The 5th movie in the movie list and that movie's first showtime |
| Homepage "select option" dropdowns | The 7th movie in the movie list, plus the first cinema and first showtime of that movie |
| Homepage cinema section | The 5th cinema system, its 3rd branch, and the first showtime of the 2nd movie shown at that branch |

The seat is chosen in the browser at run time: the first available seat on the seat map. Since this data comes from a live, shared demo site, a booking test can fail when the data changes (for example, no showtime or no free seat left). A successful booking creates a real booking for the test user on the demo site, and it is not reverted afterwards.

This approach may change in future iterations (for example, creating accounts through the API and cleaning them up after each test).

### Static Test Inputs
Values that never change are defined next to the tests that use them, not in `.env.development`: the invalid inputs of the Invalidation tests (e.g. `abc`, `12345`, `@`) and the expected Vietnamese messages (in each spec or in `constants/variables/generalVariables.ts`), plus the fixed links and titles checked by the Home page App and News tests.

<br>

## Setup And Run Tests

**Step 1 — Check the system requirements and install Node.js.** Make sure your computer meets the requirements below (they come from the [Playwright installation guide](https://playwright.dev/docs/intro) and from the libraries this project uses):

| Requirement | What you need |
|---|---|
| **Node.js** | **22.x (22.22.2 or newer), 24.x (24.15.0 or newer) or 26.x.** Playwright's guide lists the latest 22.x, 24.x or 26.x, and the `npm-run-all2` library used by this project asks for the minimum versions above. Older versions such as Node.js 20 are **not** enough. |
| **npm** | 10 or newer — it is installed together with Node.js, so you don't install it separately. |
| **Operating system** | Windows 11+, Windows Server 2019+ or Windows Subsystem for Linux (WSL); macOS 14 (Sonoma) or later; Debian 12 / 13 or Ubuntu 22.04 / 24.04 / 26.04 (x86-64 or arm64). |
| **Internet connection** | Needed to download the project's libraries and the Playwright browsers (Step 3), and to reach the demo website and its API while the tests run. |
| **Git** *(optional)* | Only for cloning the repository in Step 2 — you can download a ZIP instead. |

To check what you already have, open a terminal and run:
```bash
node -v
npm -v
```
If `node -v` shows a version that matches the table (for example `v22.22.2` or higher), you're good. If it shows an older version, or the command isn't found, download and install a supported version from [nodejs.org](https://nodejs.org/) first (just click through the installer — no special options needed), then close and reopen your terminal and run the two commands again.

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

**Step 4 — Check the configuration file (already included).** The project already ships with a `.env.development` file in its root folder (same level as `package.json`) — you don't need to create anything. This file just tells the tests which website and API to use and which test account to log in with, and you can leave it exactly as-is to get started. You'd only need to open and edit it if you want to test with a different account or a different environment. See [Environment Variables Reference](#environment-variables-reference) below for what each line in the file means.

**Step 5 — Run the tests!**
```bash
npm run test
```
Playwright will open (invisibly, in the background) a browser, click through the site exactly like a real user, and print a pass/fail summary in your terminal when it's done. Tests run headless (no visible browser window) by default. To watch it happen live in a visible browser window instead, run:
```bash
npm run test:headed
```

You can also run only part of the suite:

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

**Using VS Code instead of the terminal:** install the [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension for a point-and-click experience:
- **Testing Sidebar** — see, run, and debug every test without touching the terminal.
- **Gutter icons** — click the green triangle next to any test in the editor to run just that one.
- **Debugging** — set breakpoints and step through a test live.

**Run everything and get a report in one command.** Running `npm run test` alone only gives a plain terminal summary. For a full, clickable report, use:

```bash
npm run test:report
```
This single command runs a complete pipeline, one step after another: it deletes any old `allure-results`/`allure-report` folders (script: `pretest:report`) → runs the whole test suite (script: `test`) → builds a fresh Allure report from the results (script: `allure:generate`) → opens that report in your browser (script: `allure:open`). The report is a colorful, clickable dashboard showing every test, its status, and (for any failure) the exact step, screenshot, and video of what went wrong.

That's it — you've run the whole automated test suite and opened its report. See [Viewing Test Results](#viewing-test-results) below for the individual report commands.

<br>

## Environment Variables Reference
Every variable below is read from `.env.development` and is **required** — the project checks for each one when it is first used and stops with a `Missing environment variable: <NAME>` error if it is missing.

| Variable | Meaning |
|---|---|
| `BASE_URL` | The website under test |
| `API_URL` | The backend API address, used to call the API directly (verify login, load movie/cinema/showtime data for Booking tests) |
| `USERNAME_TEST` / `PASSWORD_TEST` | An existing, valid account on the site — used by Login, Logout and Booking History tests |
| `FULL_NAME_TEST` / `PHONE_NUMBER_TEST` / `EMAIL_TEST` | Profile details of that same account; the Invalidation tests reuse them as "already existing" values |
| `UPDATE_USERNAME_TEST` / `UPDATE_PASSWORD_TEST` | The account the Update Profile test logs in with |
| `UPDATE_FULL_NAME_TEST` / `UPDATE_PHONE_NUMBER_TEST` / `UPDATE_EMAIL_TEST` | The new values the Update Profile test submits |

> The class/group code (`GP09`) and the account role labels (`QuanTri` / `KhachHang`) are built into the code (`apis/apisRoutes.ts`, `pages/main/ProfilePage.ts`), so they are not env variables.

> **Note:** `.env.development` is intentionally committed alongside the source code (`.gitignore`'s `.env*` exclusion block is commented out) so that anyone who clones the repo can run the tests immediately without extra setup.

<br>

## Adding New Tests (for developers)

This project combines the classic Page Object Model (POM) pattern with Playwright's **custom fixtures**, so page objects don't need to be instantiated manually inside every test:

- **BasePage** — abstract class with shared low-level actions (`click`, `fill`, `clickByRole`, `filter`, `selectOption`, `getMessageText`, etc.) and assertion helpers (`equalExpect`, `toBeVisibleExpect`, `toHaveUrlExpect`, `toBeInViewportExpect`) used by every page/component/modal. Timeouts come from `constants/timeoutConstant.ts`.
- **CommonPage** — base class for full pages; automatically wires up the shared `TopNavigation` component.
- **Pages** — full pages (e.g., `LoginPage`, `RegisterPage`, `HomePage`, `BookingPage`, `ProfilePage`), each with its own locators and actions.
- **Components / Modals** — reusable UI pieces that appear across multiple pages (`TopNavigation`, `LoadingScreen`, `CommonModal`, `InputField`, and homepage-only sections like `AppSection`/`NewsSection`).
- **Fixtures** (`fixtures/customFixtures.ts`) — extend Playwright's base `test` to inject ready-to-use page objects (`loginPage`, `registerPage`, `homePage`, `bookingPage`, `profilePage`, `topNavigation`, `commonModal`, `loadingScreen`, `inputField`) directly into each test's arguments.
- **Shared flows** (`utils/commonHandlers.ts`, `utils/bookingHandlers.ts`) — higher-level, reusable sequences (e.g. "go to base URL and wait for the loading screen to disappear", "register a new user and log in", "select movie/cinema/showtime and verify the booking result") composed from page-object methods once and reused across many specs.
- **API layer** (`apis/` + `utils/apiHandlers.ts`) — functions that call the backend directly (e.g. `loginRequest`, `getMovieList`), used to verify results or to fetch test data without clicking through the UI.
- **Constants** (`constants/variables/`) — locator IDs, button labels and expected messages shared across pages and specs, plus the values read from `.env.development`.

**Example:**

```typescript
// pages/main/LoginPage.ts (excerpt)
export class LoginPage extends CommonPage {
  public async enterUsername(username = this.accessibleVars.username.value): Promise<void> {
    await this.fill(this.accessibleVars.username.id, username);
  }

  public async enterPassword(password = this.accessibleVars.password.value): Promise<void> {
    await this.fill(this.accessibleVars.password.id, password);
  }

  public async clickToLogin(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.button.login);
  }
}

// tests/auth/login.spec.ts
import { test } from "~/fixtures/customFixtures";
import { generalVariables } from "~/constants/variables/generalVariables";
import { goToLoginPage } from "~/utils/commonHandlers";

test.beforeEach(async ({ page, homePage }) => {
  await goToLoginPage(page, homePage);
});

test.describe("LOGIN", async () => {
  test("Verify Login Successfully", async ({ commonModal, loginPage }) => {
    // Step 1: Enter Valid Username
    await loginPage.enterUsername();

    // Step 2: Enter Valid Password
    await loginPage.enterPassword();

    // Step 3: Click 'Đăng nhập' Button
    await loginPage.clickToLogin();

    // Step 4: Verify Login Successfully
    // VP: Message 'Đăng nhập thành công' Displays
    await loginPage.equalExpect(
      () => commonModal.getMessageText(),
      "Đăng nhập không thành công",
      generalVariables.login.success,
    );
  });
});
```

When adding a new page, folder, or spec, refer to the [Project Structure](#project-structure) above to decide where it belongs. Register any new page object as a fixture in `fixtures/customFixtures.ts` if you want it auto-injected into tests. For a multi-step flow reused across several specs (like booking or "login as setup"), add it to `utils/commonHandlers.ts` or a dedicated `utils/*Handlers.ts` file rather than duplicating the same steps inside each spec.

Group related tests with `test.describe`, and break a flow into logical, reportable steps with `test.step` (used in `utils/commonHandlers.ts`):

```typescript
test.describe("INVALIDATION - LOGIN", () => {
  test("Verify Empty Value In Input Fields", async ({ page }) => {
    // ...test code...
  });
});
```
```typescript
await test.step("Enter username and password, and then Click 'Đăng nhập' button", async () => {
  await loginPage.loginWithUser();
});
```

<br>

## Viewing Test Results

The full "clean → run tests → build report → open report" pipeline (`npm run test:report`) is described in [Step 5 of Setup And Run Tests](#setup-and-run-tests). Each part of it can also be run on its own:
```bash
npm run allure:generate   # just build the report from the last test run
npm run allure:open       # just open the most recently built report
npm run allure:serve      # build + view a report without saving it to disk
```

> **Tip:** Every **failed** test also gets its screenshot/video automatically saved into a `test-results/` folder on your computer (organized by test name), even if you never open the Allure report — handy for a quick look without waiting for a report to build.

<br>

## Troubleshooting

- **`'npx' is not recognized` / `'npm' is not recognized`** — Node.js isn't installed (or your terminal needs to be reopened after installing it). Re-check Step 1 of [Setup And Run Tests](#setup-and-run-tests).
- **`npm warn EBADENGINE` / `Unsupported engine` during `npm install`** — Your Node.js version is older than what the project's libraries support. Install Node.js 22.22.2+, 24.15.0+ or 26.x as described in Step 1, then run `npm install` again.
- **`Missing environment variable: <NAME>` when running tests** — The `.env.development` file ships with the repo, so this usually means it got renamed, moved, or the named line was deleted by accident. Re-check Step 4 — the file must be named exactly `.env.development` and sit in the project's root folder (next to `package.json`), with every variable listed in the [Environment Variables Reference](#environment-variables-reference) still present.
- **Browser-related errors on first run** (e.g. `Executable doesn't exist`) — You skipped `npx playwright install` in Step 3. Run it and try again.
- **Booking tests fail but Login/Register tests pass** — Booking tests pick the movie, cinema, showtime and seat from the live demo site's data at run time, and that site is shared and can change (for example a showtime with no free seats left, or a slow/unreachable API). Re-run the failed test first; if it keeps failing, open the site in a browser and check that the movie/cinema list and showtimes still load.
- **Tests behave differently on your machine vs. a teammate's** — Make sure you're both on the same Node.js version and have both run `npm install` after the latest `git pull`.

<br>

## Beyond A Standard Playwright Setup (for developers)
*(Optional reading — this explains what makes this project's structure more advanced than a typical "just install Playwright and write specs" starter, for anyone maintaining or reviewing the code.)*

- **Dependency-injected page objects, not manual instantiation.** Instead of writing `const loginPage = new LoginPage(page);` at the top of every test, `fixtures/customFixtures.ts` extends Playwright's base `test` so page objects (`loginPage`, `bookingPage`, `commonModal`, etc.) arrive pre-built as test arguments.
- **A real page-object inheritance chain, not one flat class per page.** `BasePage` (raw actions) → `CommonPage` (auto-wires the shared `TopNavigation`) → concrete pages. Shared components (`TopNavigation`, `LoadingScreen`, `InputField`) are composed into pages rather than each page re-implementing its own nav/loading logic.
- **A reusable "flow" layer above the page objects.** `utils/commonHandlers.ts` and `utils/bookingHandlers.ts` hold multi-step business flows composed from page-object calls once and reused across dozens of specs, instead of copy-pasting the same steps into every test file.
- **TypeScript path aliasing (`~/*`).** `tsconfig.json` maps `~/*` to the project root, so imports read `import { LoginPage } from "~/pages/main/LoginPage"` instead of brittle relative paths like `../../../pages/main/LoginPage`.
- **Fail-fast, typed environment variables.** `utils/envHandlers.ts`'s `requiredEnv()` throws a clear `Missing environment variable: <NAME>` error if a required `.env.development` variable is missing, and the files in `constants/variables/` centralize every variable into typed objects, instead of scattering raw `process.env.SOMETHING` calls (possibly `undefined`) throughout test files.
- **Dynamic, collision-free test data, not hardcoded fixtures.** Register tests (and every Booking test that needs a logged-in user) generate a fresh account every run via `@faker-js/faker` plus a custom UUID-based username generator, so re-running the suite against the same shared/live demo site never fails on "account already exists." Booking tests also read movies, cinemas and showtimes from the live API at run time instead of relying on hardcoded names.
- **Hybrid UI + API testing.** The `apis/` folder (endpoint map in `apisRoutes.ts`, generic `getApi`/`postApi`/... wrappers in `utils/apiHandlers.ts`) calls the backend directly. It is used both to verify results (the Register spec checks the new account by calling the login API) and to fetch test data for Booking tests, instead of only clicking through the UI.
- **A custom failure-artifact reporter, on top of Allure.** `config/folderReporter.ts` is a hand-written Playwright reporter that mirrors each failed test's folder structure under `test-results/` and copies its screenshots/videos/traces there, so failures are browsable by file path, not just by report UI.
- **A one-command, failure-tolerant reporting pipeline.** `npm run test:report` chains cleanup → test run → Allure generation → Allure open via `npm-run-all2` (`run-s --continue-on-error`), so the pipeline still finishes and hands you a fresh report even when some tests fail — instead of a failed `npm run test` aborting the whole chain before the report step ever runs.
- **Multiple reporters running simultaneously.** `playwright.config.ts` combines the HTML reporter, the `list` console reporter, `allure-playwright`, and the custom `FolderReporter` in one run, instead of picking just one reporting format.

<br>

## CI Integration (GitHub Actions)

A GitHub Actions workflow at `.github/workflows/playwright.yml` runs the whole suite automatically, without anyone needing to run it by hand:

- Sets up Node.js (latest LTS) and installs dependencies via `npm ci`
- Installs only the Chromium browser with `npx playwright install --with-deps chromium`
- Runs the test suite with `npx playwright test --project=chromium` (on CI, failed tests are retried up to 2 times and run on 1 worker)
- Uploads three downloadable artifacts, even if the run fails: `playwright-report` (HTML report, kept 30 days), `test-results` (screenshots/videos/traces of failed tests, kept 14 days) and `allure-results` (raw Allure data, kept 14 days)

**Triggers:** every push to `main`/`master`, every pull request opened or updated against `main`/`master`, and manual runs from the **Actions** tab (**Run workflow** button). A newer run on the same branch cancels the older one, and a run is stopped after 30 minutes.

**Viewing CI results:**
1. Go to the **Actions** tab of the repository.
2. Open the relevant **Playwright Tests** run.
3. Scroll to **Artifacts** and download `playwright-report` — view it locally with `npx playwright show-report`, or open `playwright-report/index.html` directly.
4. To see the Allure version: download and unzip `allure-results`, put its contents into the project's `allure-results/` folder, then run `npm run allure:generate` followed by `npm run allure:open`.

> **Note:** The Allure report itself is not generated in CI (only its raw results are uploaded), and only the `chromium` project runs there. Booking tests depend on the live demo site's data, so they may occasionally fail in CI if that data or the API response time changes.
