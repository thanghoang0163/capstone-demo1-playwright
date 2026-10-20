import { test, expect } from "~/fixtures/customFixtures";
import { userVariables } from "~/constants/variables/userVariables";
import { generalVariables } from "~/constants/variables/generalVariables";
import { goToRegisterPage } from "~/utils/commonHandlers";

// ===== VARIABLES =====
// Input Verification
const inputVerification = {
  empty: generalVariables.inputField.notification.error.empty,
  username: {
    existed: "Tài khoản đã tồn tại!",
    containLettersOrNumbers: "Tên tài khoản chỉ chứa chữ cái hoặc số !",
  },
  password: {
    lessThanRequiredCharacters:
      generalVariables.inputField.notification.error.password
        .lessThanRequiredCharacters,
  },
  confirmPassword: {
    notMatch: "Mật khẩu không khớp !",
  },
  fullname: {
    containSpecialChar: "Họ và tên không chứa ký tự đặc biệt !",
    containNumber: "Họ và tên không chứa số !",
  },
  email: {
    existed: "Email đã tồn tại!",
    invalidFormat: "Email không đúng định dạng !",
  },
};

// User Input
const userInput = {
  username: {
    id: generalVariables.userInfo.username.id,
  },
  password: {
    id: generalVariables.userInfo.password.id,
  },
  confirmPassword: {
    id: generalVariables.userInfo.confirmPassword.id,
  },
  fullName: {
    id: generalVariables.userInfo.fullName.id,
  },
  email: {
    id: generalVariables.userInfo.email.id,
  },
};

// Testing Variables
const testingVariables = {
  invalid: {
    username: "@",
    password: "12345",
    confirmPassword: "123457",
    email: "abczz",
    fullName: {
      specialCharacters: "~",
      number: "1",
    },
  },
  valid: {
    username: userVariables.usernameTest,
    password: userVariables.passwordTest,
    fullName: userVariables.fullNameTest,
    email: userVariables.emailTest,
  },
};

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, homePage }) => {
  // Go To Register Page
  await goToRegisterPage(page, homePage);
});

// ===== TEST STEPS =====
test.describe("INVALIDATION - REGISTER", () => {
  // Verify Empty Value In Input Fields
  test("Verify Empty Value In Input Fields", async ({
    inputField,
    registerPage,
  }) => {
    // Step 1: Click 'Đăng ký' Button
    await registerPage.clickToRegister();

    // Step 2: Verify Empty Value In Input Fields
    // VP1: Message 'Đây là trường bắt buộc !' Displays On Username
    const usernameMsg = await inputField.getUsernameMessageText();
    expect(usernameMsg, "'Tài Khoản' đang chứa giá trị").toEqual(
      inputVerification.empty,
    );

    // VP2: Message 'Đây là trường bắt buộc !' Displays On Password
    const passwordMsg = await inputField.getPasswordMessageText();
    expect(passwordMsg, "'Mật Khẩu' đang chứa giá trị").toEqual(
      inputVerification.empty,
    );

    // VP3: Message 'Đây là trường bắt buộc !' Displays On Confirm Password
    const confirmPasswordMsg = await inputField.getConfirmPasswordMessageText();
    expect(confirmPasswordMsg, "'Nhập Lại Mật Khẩu' đang chứa giá trị").toEqual(
      inputVerification.empty,
    );

    // VP4: Message 'Đây là trường bắt buộc !' Displays On Full Name
    const fullNameMsg = await inputField.getFullNameMessageText();
    expect(fullNameMsg, "'Họ Tên' đang chứa giá trị").toEqual(
      inputVerification.empty,
    );

    // VP5: Message 'Đây là trường bắt buộc !' Displays On Email
    const emailPassword = await inputField.getEmailMessageText();
    expect(emailPassword, "'Email' đang chứa giá trị").toEqual(
      inputVerification.empty,
    );
  });

  // Verify Invalid Value In Username Input Field
  test("Verify Invalid Value In Username Input Field", async ({
    inputField,
    registerPage,
  }) => {
    // Step 1: Enter Invalid Username
    await registerPage.fill(
      userInput.username.id,
      testingVariables.invalid.username,
    );

    // Step 2: Click 'Đăng ký' Button
    await registerPage.clickToRegister();

    // Step 3: Verify Invalid Value In Username Input Field
    // VP: Message 'Tên tài khoản chỉ chứa chữ cái hoặc số !' Displays On Username
    const usernameMsg = await inputField.getUsernameMessageText();
    expect(usernameMsg, "Tên tài khoản chỉ chứa chữ cái hoặc số").toEqual(
      inputVerification.username.containLettersOrNumbers,
    );
  });

  // Verify Existed Value In Username Input Field
  test("Verify Existed Value In Username Input Field", async ({
    inputField,
    registerPage,
  }) => {
    // Step 1: Enter Valid Username
    await registerPage.fill(
      userInput.username.id,
      testingVariables.valid.username,
    );

    // Step 2: Enter Valid Password
    await registerPage.fill(
      userInput.password.id,
      testingVariables.valid.password,
    );

    // Step 3: Enter Valid Confirm Password
    await registerPage.fill(
      userInput.confirmPassword.id,
      testingVariables.valid.password,
    );

    // Step 4: Enter Valid Full Name
    await registerPage.fill(
      userInput.fullName.id,
      testingVariables.valid.fullName,
    );

    // Step 5: Enter Invalid Email
    await registerPage.fill(userInput.email.id, testingVariables.invalid.email);

    // Step 6: Click 'Đăng ký' Button
    await registerPage.clickToRegister();

    // Step 7: Verify Existed Value In Email Input Field
    // VP: Message 'Tài khoản đã tồn tại!' Displays
    const emailMsg = await inputField.getAlertMessageText();
    expect(emailMsg, "Tài khoản có thể dùng").toEqual(
      inputVerification.email.existed,
    );
  });

  // Verify Password Input Field Contains Less Than Required Characters
  test("Verify Password Input Field Contains Less Than Required Characters", async ({
    inputField,
    registerPage,
  }) => {
    // Step 1: Enter Invalid Password
    await registerPage.fill(
      userInput.password.id,
      testingVariables.invalid.password,
    );

    // Step 2: Click 'Đăng ký' Button
    await registerPage.clickToRegister();

    // Step 3: Verify Invalid Value In Password Input Field
    // VP: Message 'Mật khẩu phải có ít nhất 6 kí tự !' Displays
    const passwordMsg = await inputField.getPasswordMessageText();
    expect(passwordMsg, "Mật khẩu đã chứa 6 kí tự trở lên").toEqual(
      inputVerification.password.lessThanRequiredCharacters,
    );
  });

  // Verify Password And Confirm Password Input Fields Are Not Match
  test("Verify Password And Confirm Password Input Fields Are Not Match", async ({
    inputField,
    registerPage,
  }) => {
    // Step 1: Enter Valid Password
    await registerPage.fill(
      userInput.password.id,
      testingVariables.valid.password,
    );

    // Step 2: Enter Not Match Confirm Password
    await registerPage.fill(
      userInput.confirmPassword.id,
      testingVariables.invalid.confirmPassword,
    );

    // Step 3: Click 'Đăng ký' Button
    await registerPage.clickToRegister();

    // Step 4: Verify Password And Confirm Password Input Fields Are Not Match
    // VP: Message 'Mật khẩu không khớp !' Displays
    const confirmPasswordMsg = await inputField.getConfirmPasswordMessageText();
    expect(
      confirmPasswordMsg,
      "'Nhập Lại Mật Khẩu' khớp với 'Mật Khẩu'",
    ).toEqual(inputVerification.confirmPassword.notMatch);
  });

  // Verify Special Characters In Full Name Input Field
  test("Verify Special Characters In Full Name Input Field", async ({
    inputField,
    registerPage,
  }) => {
    // Step 1: Enter Invalid Full Name
    await registerPage.fill(
      userInput.fullName.id,
      testingVariables.invalid.fullName.specialCharacters,
    );

    // Step 2: Click 'Đăng ký' Button
    await registerPage.clickToRegister();

    // Step 3: Verify Special Characters In Full Name Input Field
    // VP: Message 'Họ và tên không chứa ký tự đặc biệt !' Displays
    const fullNameMsg = await inputField.getFullNameMessageText();
    expect(fullNameMsg, "Họ và tên chứa ký tự đặc biệt").toEqual(
      inputVerification.fullname.containSpecialChar,
    );
  });

  // Verify Number In Full Name Input Field
  test("Verify Number In Full Name Input Field", async ({
    inputField,
    registerPage,
  }) => {
    // Step 1: Enter Invalid Full Name
    await registerPage.fill(
      userInput.fullName.id,
      testingVariables.invalid.fullName.number,
    );

    // Step 2: Click 'Đăng ký' Button
    await registerPage.clickToRegister();

    // Step 3: Verify Number In Full Name Input Field
    // VP: Message 'Họ và tên không chứa số !' Displays
    const fullNameMsg = await inputField.getFullNameMessageText();
    expect(fullNameMsg, "Họ và tên chứa số").toEqual(
      inputVerification.fullname.containNumber,
    );
  });

  // Verify Invalid Format In Email Input Field
  test("Verify Invalid Format In Email Input Field", async ({
    inputField,
    registerPage,
  }) => {
    // Step 1: Enter Invalid Email
    await registerPage.fill(userInput.email.id, testingVariables.invalid.email);

    // Step 2: Click 'Đăng ký' Button
    await registerPage.clickToRegister();

    // Step 3: Verify Invalid Format In Email Input Field
    // VP: Message 'Email không đúng định dạng !' Displays
    const emailMsg = await inputField.getEmailMessageText();
    expect(emailMsg, "Email không đúng định dạng").toEqual(
      inputVerification.email.invalidFormat,
    );
  });

  // Verify Existed Value In Email Input Field
  test("Verify Existed Value In Email Input Field", async ({
    inputField,
    registerPage,
  }) => {
    // Step 1: Enter Valid Username
    await registerPage.fill(
      userInput.username.id,
      testingVariables.valid.username,
    );

    // Step 2: Enter Valid Password
    await registerPage.fill(
      userInput.password.id,
      testingVariables.valid.password,
    );

    // Step 3: Enter Valid Confirm Password
    await registerPage.fill(
      userInput.confirmPassword.id,
      testingVariables.valid.password,
    );

    // Step 4: Enter Valid Full Name
    await registerPage.fill(
      userInput.fullName.id,
      testingVariables.valid.fullName,
    );

    // Step 5: Enter Invalid Email
    await registerPage.fill(userInput.email.id, testingVariables.valid.email);

    // Step 6: Click 'Đăng ký' Button
    await registerPage.clickToRegister();

    // Step 7: Verify Existed Value In Email Input Field
    // VP: Message 'Email đã tồn tại!' Displays
    const emailMsg = await inputField.getAlertMessageText();
    expect(emailMsg, "Email có thể dùng").toEqual(
      inputVerification.email.existed,
    );
  });
});
