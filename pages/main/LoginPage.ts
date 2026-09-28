import { Page } from "@playwright/test";
import { pageVariables } from "~/constants/commonVariables";
import { CommonPage } from "~/pages/base/CommonPage";

export class LoginPage extends CommonPage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    // Username
    username: pageVariables.login.username,

    // Password
    password: pageVariables.login.password,

    // Login Button
    loginButton: pageVariables.login.button,
  };

  private accessibleVars = LoginPage.accessibleVariables;

  constructor(page: Page) {
    super(page);
  }

  // ===== FILL FUNCTION =====
  // Enter Username
  public async enterUsername(): Promise<void> {
    await this.fill(
      this.accessibleVars.username.id,
      this.accessibleVars.username.value,
    );
  }

  // Enter Password
  public async enterPassword(): Promise<void> {
    await this.fill(
      this.accessibleVars.password.id,
      this.accessibleVars.password.value,
    );
  }

  // ===== CLICK FUNCTION =====
  //  Click Login Button
  public async clickToLogin(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.loginButton);
  }

  // ===== E2E LOGIN FUNCTION =====
  public async login(): Promise<void> {
    await this.enterUsername();
    await this.enterPassword();
    await this.clickToLogin();
  }
}
