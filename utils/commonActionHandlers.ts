import { Page, test, expect } from "@playwright/test";
import { BASE_URL } from "~/routes/publicRoutes";
import { envVariables } from "~/constants/envVariables";
import { CommonModal } from "~/pages/modals/CommonModal";
import { LoadingScreen } from "~/components/LoadingScreen";
import { LoginPage } from "~/pages/main/LoginPage";
import { HomePage } from "~/pages/main/home/HomePage";

// ===== NAVIGATE FUNCTION =====
// Go To Base URL
const goToBaseUrl = async (page: Page) => {
  // Step 1: Go To https://demo1.cybersoft.edu.vn/
  await test.step(`Go to ${envVariables.routes.baseUrl}`, async () => {
    await page.goto(BASE_URL || "");
  });
};

// Go To Base URL And Wait For The Loading Screen Disappear
const waitForLoadingDisappearOnBaseUrl = async (
  page: Page,
  loadingScreen: LoadingScreen,
) => {
  // Go To Base URL
  await goToBaseUrl(page);

  // Wait For The Loading Screen Disappear
  await loadingScreen.waitForLoadingDisappear();
};

// Go To Login Page
const goToLoginPage = async (page: Page, homePage: HomePage) => {
  // Step 1: Go To Base URL
  await goToBaseUrl(page);

  // Step 2: Click 'Đăng nhập' Link On The Top-right Corner Of The Page
  await homePage.getTopNavigation().navigateToLoginPage();
};

// Go To Register Page
const goToRegisterPage = async (page: Page, homePage: HomePage) => {
  // Step 1: Go To Base URL
  await goToBaseUrl(page);

  // Step 2: Click 'Đăng ký' Link On The Top-right Corner Of The Page
  await homePage.getTopNavigation().navigateToRegisterPage();
};

// ===== LOGIN =====
// Login With Existed Account
const loginWithExistedAccount = async (
  commonModal: CommonModal,
  homePage: HomePage,
  loginPage: LoginPage,
) => {
  // Step 1: Click 'Đăng nhập' link On The Top-right Corner Of The Page
  await test.step("Click on 'Đăng nhập' link", async () => {
    await homePage.getTopNavigation().navigateToLoginPage();
  });

  // Step 2: Enter Username Name
  // Step 3: Enter Password
  // Step 4: Click 'Đăng nhập' Button
  await test.step("Enter username and password, and then Click 'Đăng nhập' button", async () => {
    await loginPage.login();
  });

  // Step 5: Wait For The 'Đăng nhập thành công' Modal Disappear
  await commonModal.waitForModalDisappear();
};

// Login On Base URL Before Testing
const loginOnBaseUrl = async (
  page: Page,
  commonModal: CommonModal,
  homePage: HomePage,
  loginPage: LoginPage,
) => {
  // Step 1: Go To Base URL
  await goToBaseUrl(page);

  // Step 2: Login With Existed Account
  await loginWithExistedAccount(commonModal, homePage, loginPage);
};

// ===== SCROLL DOWN FUNCTION =====
// Navigate To Section On Page
const navigateToSectionOnPage = async (
  page: Page,
  locator: string,
  navigateToSection: () => Promise<void>,
) => {
  // Step 1: Click The Tab From Top Navigation Bar
  await navigateToSection();

  // Step 2: Expect The Section Is Scrolled Into View
  const section = page.locator(locator);

  // Scroll Using Playwright Instead Of Waiting For Website's JS Animations
  await section.scrollIntoViewIfNeeded();

  await expect(
    section,
    "Phần được chọn không có trong Viewport",
  ).toBeInViewport();
};

// ===== OPEN NEW PAGE FUNCTION =====
// Open New Page On Browser
const openNewPageOnBrowser = async (
  page: Page,
  link: string,
  clickLink: () => Promise<void>,
) => {
  // Step 1: Click The Link Button
  const [newPage] = await Promise.all([
    // Wait For New Tab To Open
    page.waitForEvent("popup", { timeout: 30000 }),

    // Trigger Click Button
    clickLink(),
  ]);

  // Wait For New Page Load Completely
  await newPage.waitForLoadState();

  // VP: Verify New Tab Opened With Correct URL
  expect(newPage.url(), "Không mở được trang ở tab mới").toBe(link);
};

export {
  goToBaseUrl,
  waitForLoadingDisappearOnBaseUrl,
  goToLoginPage,
  goToRegisterPage,
  loginWithExistedAccount,
  loginOnBaseUrl,
  navigateToSectionOnPage,
  openNewPageOnBrowser,
};
