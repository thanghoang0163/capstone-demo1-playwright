import { test, expect } from "~/fixtures/customFixtures";
import { pageVariables } from "~/constants/commonVariables";
import { USERNAME, PASSWORD } from "~/constants/userInfo";
import { loginRequest } from "~/apis/userApi";
import { goToRegisterPage } from "~/utils/commonActionHandlers";

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, homePage }) => {
  // Go To Login Page
  await goToRegisterPage(page, homePage);
});

// ===== TEST STEPS =====
test.describe.serial("REGISTER", () => {
  test("Verify Register Successfully", async ({
    commonModal,
    registerPage,
  }) => {
    // Step 1: Enter Valid Username
    await registerPage.enterUsername();

    // Step 2: Enter Valid Password
    await registerPage.enterPassword();

    // Step 3: Confirm Password
    await registerPage.confirmPassword();

    // Step 4: Enter Valid Full Name
    await registerPage.enterFullName();

    // Step 5: Enter Valid Email
    await registerPage.enterEmail();

    // Step 6: Click 'Đăng ký' Button
    await registerPage.clickToRegister();

    // Step 7: Verify User Registers Successfully
    // VP: Message 'Đăng ký thành công' Displays
    const registerMsg = await commonModal.getMessageText();
    expect(registerMsg, "Đăng ký không thành công").toEqual(
      pageVariables.register.notification.success,
    );
  });

  test("Login Validation By Calling API", async ({ request }) => {
    const data = await loginRequest(request, {
      taiKhoan: USERNAME,
      matKhau: PASSWORD,
    });

    expect(data, "Lấy được dữ liệu người dùng không thành công").toBeTruthy();
  });
});
