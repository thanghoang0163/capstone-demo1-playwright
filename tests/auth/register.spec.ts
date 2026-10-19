import { test, expect } from "~/fixtures/customFixtures";
import { userInfo } from "~/constants/userConstant";
import { loginRequest } from "~/apis/userApi";
import { createNewUser, goToRegisterPage } from "~/utils/commonHandlers";

// ===== VARIABLES =====
// Notification
const notification = {
  success: "Đăng ký thành công",
};

// ===== BEFORE EACH =====
// test.beforeEach(async ({ page, homePage }) => {
//   // Go To Register Page
//   // await goToRegisterPage(page, homePage);
// });

// ===== TEST STEPS =====
test.describe.serial("REGISTER", () => {
  test("Verify Register Successfully", async ({
    page,
    homePage,
    registerPage,
    commonModal,
  }) => {
    // Step 1: Go To Register Page
    // Step 2: Enter Valid Username
    // Step 3: Enter Valid Password
    // Step 4: Confirm Password
    // Step 5: Enter Valid Full Name
    // Step 6: Enter Valid Email
    // Step 7: Click 'Đăng ký' Button
    await createNewUser(page, homePage, registerPage);

    // Step 8: Verify User Registers Successfully
    // VP: Message 'Đăng ký thành công' Displays
    const registerMsg = await commonModal.getMessageText();
    expect(registerMsg, "Đăng ký không thành công").toEqual(
      notification.success,
    );
  });

  test("Login Validation By Calling API", async ({ request }) => {
    const data = await loginRequest(
      {
        taiKhoan: userInfo.USERNAME,
        matKhau: userInfo.PASSWORD,
      },
      request,
    );

    expect(data, "Lấy được dữ liệu người dùng không thành công").toBeTruthy();
  });
});
