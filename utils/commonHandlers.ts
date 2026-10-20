import { Page, test, expect } from "@playwright/test";
import { BASE_URL } from "~/routes/publicRoutes";
import { routeVariables } from "~/constants/variables/routeVariables";
import { userInfo } from "~/constants/userConstant";
import { CommonModal } from "~/pages/modals/CommonModal";
import { LoadingScreen } from "~/components/LoadingScreen";
import { TopNavigation } from "~/components/TopNavigation";
import { HomePage } from "~/pages/main/home/HomePage";
import { LoginPage } from "~/pages/main/LoginPage";
import { RegisterPage } from "~/pages/main/RegisterPage";
import { ProfilePage } from "~/pages/main/ProfilePage";

// ===== VARIABLES =====
const newUserInfo = {
  username: userInfo.USERNAME,
  password: userInfo.PASSWORD,
  confirmPassword: userInfo.PASSWORD,
  fullName: userInfo.FULL_NAME,
  email: userInfo.EMAIL,
};

// ===== NAVIGATE FUNCTION =====
// Go To Base URL
const goToBaseUrl = async (page: Page) => {
  // Step 1: Go To https://demo1.cybersoft.edu.vn/
  await test.step(`Go to ${routeVariables.baseUrl}`, async () => {
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

// ===== USER =====
// Create New User
const createNewUser = async (
  page: Page,
  homePage: HomePage,
  registerPage: RegisterPage,
) => {
  // Step 1: Go To Register Page
  await goToRegisterPage(page, homePage);

  // Step 2: Register New User
  await registerPage.registerNewUser(
    newUserInfo.username,
    newUserInfo.password,
    newUserInfo.confirmPassword,
    newUserInfo.fullName,
    newUserInfo.email,
  );
};

// ===== REGISTER =====
// Register New User Before Testing
const registerNewUserBeforeTesting = async (
  page: Page,
  loadingScreen: LoadingScreen,
  homePage: HomePage,
  registerPage: RegisterPage,
) => {
  // Step 1: Create New User
  await createNewUser(page, homePage, registerPage);

  // Step 2: Go To Base URL And Wait For The Loading Screen Disappear
  await waitForLoadingDisappearOnBaseUrl(page, loadingScreen);
};

// ===== LOGIN =====
// Login With New User
const loginWithNewUser = async (
  page: Page,
  commonModal: CommonModal,
  loadingScreen: LoadingScreen,
  homePage: HomePage,
  registerPage: RegisterPage,
  loginPage: LoginPage,
) => {
  // Step 1: Create New User
  await createNewUser(page, homePage, registerPage);

  // Step 2: Wait For The 'Đăng ký thành công' Modal Disappear
  await commonModal.waitForModalDisappear();

  // Step 3: Go To Login Page
  await homePage.getTopNavigation().navigateToLoginPage();

  // Step 4: Login With New User
  await loginPage.loginWithNewUser(newUserInfo.username, newUserInfo.password);

  // Step 5: Wait For The 'Đăng nhập thành công' Modal Disappear
  await commonModal.waitForModalDisappear();

  // Step 6: Wait For The Loading Screen Disappear
  await loadingScreen.waitForLoadingDisappear();
};

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

// ===== UPDATE PROFILE FUNCTION =====
// Update User Profile
const updateProfile = async (
  topNavigation: TopNavigation,
  profilePage: ProfilePage,
) => {
  // Step 1: Click Avatar Link To Go To Profile Page
  await topNavigation.navigateToProfilePage(newUserInfo.fullName);

  // Step 2: Enter Username
  await profilePage.enterUsername();

  // Step 3: Enter Full Name
  await profilePage.enterFullname();

  // Step 4: Enter Phone Number
  await profilePage.enterPhoneNumber();

  // Step 5: Enter Password
  await profilePage.enterPassword();

  // Step 6: Enter Email
  await profilePage.enterEmail();

  // Step 7: Select Admin Role
  await profilePage.selectAdminRole();

  // Step 8: Click The 'CẬP NHẬT' Button To Update Profile
  await profilePage.clickToUpdate();
};

export {
  goToBaseUrl,
  waitForLoadingDisappearOnBaseUrl,
  createNewUser,
  goToLoginPage,
  goToRegisterPage,
  registerNewUserBeforeTesting,
  loginWithNewUser,
  loginWithExistedAccount,
  loginOnBaseUrl,
  navigateToSectionOnPage,
  openNewPageOnBrowser,
  updateProfile,
};
