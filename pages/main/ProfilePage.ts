import { Page } from "@playwright/test";
import { pageVariables } from "~/constants/commonVariables";
import { CommonPage } from "~/pages/base/CommonPage";

export class ProfilePage extends CommonPage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    // Username
    username: pageVariables.profile.username,

    // Full Name
    fullName: pageVariables.profile.fullName,

    // Phone Number
    phoneNumber: pageVariables.profile.phoneNumber,

    // Password
    password: pageVariables.profile.password,

    // Email
    email: pageVariables.profile.email,

    // Role
    role: pageVariables.profile.role,

    // Update Profile Button
    updateProfileButton: pageVariables.profile.button,
  };

  private accessibleVars = ProfilePage.accessibleVariables;

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

  // Enter Full Name
  public async enterFullname(): Promise<void> {
    await this.fill(
      this.accessibleVars.fullName.id,
      this.accessibleVars.fullName.value,
    );
  }

  // Enter Phone Number
  public async enterPhoneNumber(): Promise<void> {
    await this.fill(
      this.accessibleVars.phoneNumber.id,
      this.accessibleVars.phoneNumber.value,
    );
  }

  // Enter Password
  public async enterPassword(): Promise<void> {
    await this.fill(
      this.accessibleVars.password.id,
      this.accessibleVars.password.value,
    );
  }

  // Enter Email
  public async enterEmail(): Promise<void> {
    await this.fill(
      this.accessibleVars.email.id,
      this.accessibleVars.email.value,
    );
  }

  // Select Customer Role
  public async selectCustomerRole(): Promise<void> {
    await this.selectOption(
      this.accessibleVars.role.id,
      this.accessibleVars.role.value.customer,
    );
  }

  // Select Admin Role
  public async selectAdminRole(): Promise<void> {
    await this.selectOption(
      this.accessibleVars.role.id,
      this.accessibleVars.role.value.admin,
    );
  }

  // ===== CLICK FUNCTION =====
  //  Click The 'CẬP NHẬT' Button To Update Profile
  public async clickToUpdate(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.updateProfileButton);
  }
}
