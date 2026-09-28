import { test, expect } from "~/fixtures/customFixtures";
import { componentVariables, pageVariables } from "~/constants/commonVariables";
import { goToLoginPage } from "~/utils/commonActionHandlers";

const testingVariables = {
  invalidAccount: {
    username: "abc",
    password: "123456",
  },
  invalidPassword: "12345",
};

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, homePage }) => {
  // Go To Login Page
  await goToLoginPage(page, homePage);
});

// ===== TEST STEPS =====
test.describe("INVALIDATION - LOGIN", () => {
  // Verify Empty Value In Input Fields
  test("Verify Empty Value In Input Fields", async ({
    inputField,
    loginPage,
  }) => {
    // Step 1: Click 'Đăng nhập' Button
    await loginPage.clickToLogin();

    // Step 2: Verify Empty Value In Input Fields
    // VP1: Message 'Đây là trường bắt buộc !' Displays On Username
    const usernameMsg = await inputField.getUsernameMessageText();
    expect(usernameMsg, "'Tài Khoản' đang chứa giá trị").toEqual(
      componentVariables.inputField.notification.error.empty,
    );

    // VP2: Message 'Đây là trường bắt buộc !' Displays On Password
    const passwordMsg = await inputField.getPasswordMessageText();
    expect(passwordMsg, "'Mật Khẩu' đang chứa giá trị").toEqual(
      componentVariables.inputField.notification.error.empty,
    );
  });

  // Verify Login With Invalid Account
  test("Verify Login With Invalid Account", async ({
    inputField,
    loginPage,
  }) => {
    // Step 1: Enter Invalid Username
    await loginPage.fill(
      pageVariables.login.username.id,
      testingVariables.invalidAccount.username,
    );

    // Step 2: Enter Invalid Password
    await loginPage.fill(
      pageVariables.login.password.id,
      testingVariables.invalidAccount.password,
    );

    // Step 3: Click 'Đăng nhập' Button
    await loginPage.clickToLogin();

    // Step 4: Verify Invalid Value In Input Fields
    // VP: Message 'Tài khoản hoặc mật khẩu không đúng!' Displays
    const usernameMsg = await inputField.getAlertMessageText();
    expect(usernameMsg, "Tài khoản và mật khẩu đã đúng").toEqual(
      componentVariables.inputField.notification.error.login.incorrect,
    );
  });

  // Verify Password Input Field Contains Less Than Required Characters
  test("Verify Password Input Field Contains Less Than Required Characters", async ({
    inputField,
    loginPage,
  }) => {
    // Step 1: Enter Invalid Password
    await loginPage.fill(
      pageVariables.login.password.id,
      testingVariables.invalidPassword,
    );

    // Step 2: Click 'Đăng nhập' Button
    await loginPage.clickToLogin();

    // Step 3: Verify Invalid Value In Password Input Field
    // VP: Message 'Mật khẩu phải có ít nhất 6 kí tự !' Displays
    const passwordMsg = await inputField.getPasswordMessageText();
    expect(passwordMsg, "Mật khẩu có chứa 6 kí tự trở lên").toEqual(
      componentVariables.inputField.notification.error.login.password
        .lessThanRequiredCharacters,
    );
  });
});
