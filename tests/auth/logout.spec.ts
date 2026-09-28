import { test } from "~/fixtures/customFixtures";
import { loginOnBaseUrl } from "~/utils/commonActionHandlers";

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, commonModal, homePage, loginPage }) => {
  // Login On Base URL Before Testing
  await loginOnBaseUrl(page, commonModal, homePage, loginPage);
});

// ===== TEST STEPS =====
test.describe("LOGOUT", async () => {
  test("Verify Logout Successfully", async ({ topNavigation }) => {
    // Step 1: Click 'Đăng xuất' Link
    await topNavigation.clickToLogout();

    // Step 2: Confirm Logout Popup Appears And Accept It
    await topNavigation.waitForConfirmLogoutPopupAppear();
    await topNavigation.acceptLogout();

    // Step 3: Verify User Logs Out Successfully
    // VP: Message 'Đã đăng xuất' Displays
    await topNavigation.waitForSuccessLogoutPopupAppear();
  });
});
