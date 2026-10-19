import { Page } from "@playwright/test";
import { generalVariables } from "~/constants/variables/generalVariables";
import { userVariables } from "~/constants/variables/userVariables";
import { profileVariables } from "~/constants/variables/profileVariables";
import { CommonPage } from "~/pages/base/CommonPage";

export class ProfilePage extends CommonPage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    // Username
    username: {
      id: generalVariables.userInfo.username.id,
      value: profileVariables.update.usernameTest,
    },
    // Full Name
    fullName: {
      id: generalVariables.userInfo.fullName.id,
      value: profileVariables.update.fullNameTest,
    },
    // Phone Number
    phoneNumber: {
      id: generalVariables.userInfo.phoneNumber.id,
      value: profileVariables.update.phoneNumberTest,
    },
    // Password
    password: {
      id: generalVariables.userInfo.password.id,
      value: profileVariables.update.passwordTest,
    },
    // Email
    email: {
      id: generalVariables.userInfo.email.id,
      value: profileVariables.update.emailTest,
    },
    // Role
    role: {
      id: "maLoaiNguoiDung",
      value: {
        admin: userVariables.role.admin,
        customer: userVariables.role.customer,
      },
    },
    // Button
    button: {
      updateProfile: "Cập Nhật",
    },
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
    await this.clickButtonRole(this.accessibleVars.button.updateProfile);
  }
}
