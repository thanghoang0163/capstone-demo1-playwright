import { Page } from "@playwright/test";
import { generalVariables } from "~/constants/variables/generalVariables";
import { userVariables } from "~/constants/variables/userVariables";
import { CommonPage } from "~/pages/base/CommonPage";

export class LoginPage extends CommonPage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    // Username
    username: {
      id: generalVariables.userInfo.username.id,
      value: userVariables.usernameTest,
    },
    // Password
    password: {
      id: generalVariables.userInfo.password.id,
      value: userVariables.passwordTest,
    },
    // Button
    button: {
      login: "Đăng nhập",
    },
  };

  private accessibleVars = LoginPage.accessibleVariables;

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

  // ===== CLICK FUNCTION =====
  //  Click Login Button
  public async clickToLogin(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.button.login);
  }

  // ===== E2E LOGIN FUNCTION =====
  // Login With User
  public async loginWithUser(
    username?: string,
    password?: string,
  ): Promise<void> {
    // Step 1: Enter Username
    await this.enterUsername(username);

    // Step 2: Enter Password
    await this.enterPassword(password);

    // Step 6: Click 'Đăng nhập' Button
    await this.clickToLogin();
  }
}
