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
    await this.clickButtonRole(this.accessibleVars.button.register);
  }

  // ===== E2E REGISTER FUNCTION =====
  // Register
  public async register(): Promise<void> {
    // Step 1: Enter Username
    await this.enterUsername();

    // Step 2: Enter Password
    await this.enterPassword();

    // Step 3: Confirm Password
    await this.confirmPassword();

    // Step 4: Enter Full Name
    await this.enterFullName();

    // Step 5: Enter Email
    await this.enterEmail();

    // Step 6: Click 'Đăng ký' Button
    await this.clickToRegister();
  }

  // Register New User
  public async registerNewUser(
    username: string,
    password: string,
    confirmPassword: string,
    fullName: string,
    email: string,
  ): Promise<void> {
    // Step 1: Enter Username
    await this.fill(this.accessibleVars.username.id, username);

    // Step 2: Enter Password
    await this.fill(this.accessibleVars.password.id, password);

    // Step 3: Confirm Password
    await this.fill(this.accessibleVars.confirmPassword.id, confirmPassword);

    // Step 4: Enter Full Name
    await this.fill(this.accessibleVars.fullName.id, fullName);

    // Step 5: Enter Email
    await this.fill(this.accessibleVars.email.id, email);

    // Step 6: Click 'Đăng ký' Button
    await this.clickToRegister();
  }
}
