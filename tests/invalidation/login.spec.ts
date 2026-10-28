import { test } from "~/fixtures/customFixtures";
import { generalVariables } from "~/constants/variables/generalVariables";
import { goToLoginPage } from "~/utils/commonHandlers";

// ===== VARIABLES =====
// Input Verification
const inputVerification = {
  incorrect: "Tài khoản hoặc mật khẩu không đúng!",
  empty: generalVariables.inputField.notification.error.empty,
  password: {
    lessThanRequiredCharacters:
      generalVariables.inputField.notification.error.password
        .lessThanRequiredCharacters,
  },
};

// Testing Variables
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
    await loginPage.equalExpect(
      () => inputField.getUsernameMessageText(),
      "'Tài Khoản' đang chứa giá trị",
      inputVerification.empty,
    );

    // VP2: Message 'Đây là trường bắt buộc !' Displays On Password
    await loginPage.equalExpect(
      () => inputField.getPasswordMessageText(),
      "'Tài Khoản' đang chứa giá trị",
      inputVerification.empty,
    );
  });

  // Verify Login With Invalid Account
  test("Verify Login With Invalid Account", async ({
    inputField,
    loginPage,
  }) => {
    // Step 1: Enter Invalid Username
    await loginPage.fill(
      generalVariables.userInfo.username.id,
      testingVariables.invalidAccount.username,
    );

    // Step 2: Enter Invalid Password
    await loginPage.fill(
      generalVariables.userInfo.password.id,
      testingVariables.invalidAccount.password,
    );

    // Step 3: Click 'Đăng nhập' Button
    await loginPage.clickToLogin();

    // Step 4: Verify Invalid Value In Input Fields
    // VP: Message 'Tài khoản hoặc mật khẩu không đúng!' Displays
    await loginPage.equalExpect(
      () => inputField.getAlertMessageText(),
      "Tài khoản và mật khẩu đã đúng",
      inputVerification.incorrect,
    );
  });

  // Verify Password Input Field Contains Less Than Required Characters
  test("Verify Password Input Field Contains Less Than Required Characters", async ({
    inputField,
    loginPage,
  }) => {
    // Step 1: Enter Invalid Password
    await loginPage.fill(
      generalVariables.userInfo.password.id,
      testingVariables.invalidPassword,
    );

    // Step 2: Click 'Đăng nhập' Button
    await loginPage.clickToLogin();

    // Step 3: Verify Invalid Value In Password Input Field
    // VP: Message 'Mật khẩu phải có ít nhất 6 kí tự !' Displays
    await loginPage.equalExpect(
      () => inputField.getPasswordMessageText(),
      "Mật khẩu có chứa 6 kí tự trở lên",
      inputVerification.password.lessThanRequiredCharacters,
    );
  });
});
