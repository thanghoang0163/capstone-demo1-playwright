import { Page } from "@playwright/test";
import { pageVariables } from "~/constants/commonVariables";
import { CommonPage } from "~/pages/base/CommonPage";

export class RegisterPage extends CommonPage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    // Username
    username: pageVariables.register.username,

    // Password
    password: pageVariables.register.password,

    // Confirm Password
    confirmPassword: pageVariables.register.confirmPassword,

    // Full Name
    fullName: pageVariables.register.fullName,

    // Email
    email: pageVariables.register.email,

    // Register Button
    registerButton: pageVariables.register.button,
  };

  private accessibleVars = RegisterPage.accessibleVariables;

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

  // Enter Confirm Password
  public async confirmPassword(): Promise<void> {
    await this.fill(
      this.accessibleVars.confirmPassword.id,
      this.accessibleVars.confirmPassword.value,
    );
  }

  // Enter Full Name
  public async enterFullName(): Promise<void> {
    await this.fill(
      this.accessibleVars.fullName.id,
      this.accessibleVars.fullName.value,
    );
  }

  // Enter Email
  public async enterEmail(): Promise<void> {
    await this.fill(
      this.accessibleVars.email.id,
      this.accessibleVars.email.value,
    );
  }

  // ===== CLICK FUNCTION=====
  // Click Register Button
  public async clickToRegister(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.registerButton);
  }
}
