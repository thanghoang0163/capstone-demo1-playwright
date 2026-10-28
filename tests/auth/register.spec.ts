import { test, expect } from "~/fixtures/customFixtures";
import { userInfo } from "~/constants/userConstant";
import { loginRequest } from "~/apis/userApi";
import { goToRegisterPage } from "~/utils/commonHandlers";

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
    await goToRegisterPage(page, homePage);

    // Step 2: Register New User
    await registerPage.registerNewUser();

    // Step 3: Verify User Registers Successfully
    // VP: Message 'Đăng ký thành công' Displays
    await registerPage.equalExpect(
      () => commonModal.getMessageText(),
      "Đăng ký không thành công",
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
