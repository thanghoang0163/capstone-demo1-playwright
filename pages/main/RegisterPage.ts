import { Page } from "@playwright/test";
import { CommonPage } from "~/pages/base/CommonPage";
import { userInfo } from "~/constants/userConstant";
import { generalVariables } from "~/constants/variables/generalVariables";

export class RegisterPage extends CommonPage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    // Username
    username: {
      id: generalVariables.userInfo.username.id,
      value: userInfo.USERNAME,
    },
    // Password
    password: {
      id: generalVariables.userInfo.password.id,
      value: userInfo.PASSWORD,
    },
    // Confirm Password
    confirmPassword: {
      id: generalVariables.userInfo.confirmPassword.id,
      value: userInfo.PASSWORD,
    },
    // Full Name
    fullName: {
      id: generalVariables.userInfo.fullName.id,
      value: userInfo.FULL_NAME,
    },
    // Email
    email: {
      id: generalVariables.userInfo.email.id,
      value: userInfo.EMAIL,
    },
    // Button
    button: {
      register: "Đăng ký",
    },
  };

  private accessibleVars = RegisterPage.accessibleVariables;

  constructor(page: Page) {
    super(page);
  }

  // ===== FILL FUNCTION =====
  // Enter Username
  public async enterUsername(
    value = this.accessibleVars.username.value,
  ): Promise<void> {
    await this.fill(this.accessibleVars.username.id, value);
  }

  // Enter Password
  public async enterPassword(
    value = this.accessibleVars.password.value,
  ): Promise<void> {
    await this.fill(this.accessibleVars.password.id, value);
  }

  // Enter Confirm Password
  public async enterConfirmPassword(
    value = this.accessibleVars.confirmPassword.value,
  ): Promise<void> {
    await this.fill(this.accessibleVars.confirmPassword.id, value);
  }

  // Enter Full Name
  public async enterFullName(
    value = this.accessibleVars.fullName.value,
  ): Promise<void> {
    await this.fill(this.accessibleVars.fullName.id, value);
  }

  // Enter Email
  public async enterEmail(
    value = this.accessibleVars.email.value,
  ): Promise<void> {
    await this.fill(this.accessibleVars.email.id, value);
  }

  // ===== CLICK FUNCTION=====
  // Click Register Button
  public async clickToRegister(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.button.register);
  }

  // ===== E2E REGISTER FUNCTION =====
  // Register New User
  public async registerNewUser(
    username?: string,
    password?: string,
    confirmPassword?: string,
    fullName?: string,
    email?: string,
  ): Promise<void> {
    // Step 1: Enter Username
    await this.enterUsername(username);

    // Step 2: Enter Password
    await this.enterPassword(password);

    // Step 3: Confirm Password
    await this.enterConfirmPassword(confirmPassword);

    // Step 4: Enter Full Name
    await this.enterFullName(fullName);

    // Step 5: Enter Email
    await this.enterEmail(email);

    // Step 6: Click 'Đăng ký' Button
    await this.clickToRegister();

  }
}
