import { test, expect } from "~/fixtures/customFixtures";
import { pageVariables } from "~/constants/commonVariables";
import { goToLoginPage } from "~/utils/commonActionHandlers";

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, homePage }) => {
  // Go To Login Page
  await goToLoginPage(page, homePage);
});

// ===== TEST STEPS =====
test.describe("LOGIN", async () => {
  test("Verify Login Successfully", async ({ commonModal, loginPage }) => {
    // Step 1: Enter Valid Username
    await loginPage.enterUsername();

    // Step 2: Enter Valid Password
    await loginPage.enterPassword();

    // Step 3: Click 'Đăng nhập' Button
    await loginPage.clickToLogin();

    // Step 4: Verify User Login Successfully
    // VP: Message 'Đăng nhập thành công' Displays
    const loginMsg = await commonModal.getMessageText();
    expect(loginMsg, "Đăng nhập không thành công").toEqual(
      pageVariables.login.notification.success,
    );
  });
});
