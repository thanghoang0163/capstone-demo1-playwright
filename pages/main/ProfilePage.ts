import { Page } from "@playwright/test";
import { generalVariables } from "~/constants/variables/generalVariables";
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
        admin: "QuanTri",
        customer: "KhachHang",
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
  public async enterUsername(
    value = this.accessibleVars.username.value,
  ): Promise<void> {
    await this.fill(this.accessibleVars.username.id, value);
  }

  // Enter Full Name
  public async enterFullName(
    value = this.accessibleVars.fullName.value,
  ): Promise<void> {
    await this.fill(this.accessibleVars.fullName.id, value);
  }

  // Enter Phone Number
  public async enterPhoneNumber(
    value = this.accessibleVars.phoneNumber.value,
  ): Promise<void> {
    await this.fill(this.accessibleVars.phoneNumber.id, value);
  }

  // Enter Password

  public async enterPassword(
    value = this.accessibleVars.password.value,
  ): Promise<void> {
    await this.fill(this.accessibleVars.password.id, value);
  }

  // Enter Email
  public async enterEmail(
    value = this.accessibleVars.email.value,
  ): Promise<void> {
    await this.fill(this.accessibleVars.email.id, value);
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

  // ===== E2E UPDATE PROFILE FUNCTION =====
  // Update User Profile
  public async updateProfile(
    username?: string,
    fullName?: string,
    phoneNumber?: string,
    password?: string,
    email?: string,
  ): Promise<void> {
    // Step 1: Enter Username
    await this.enterUsername(username);

    // Step 2: Enter Full Name
    await this.enterFullName(fullName);

    // Step 3: Enter Phone Number
    await this.enterPhoneNumber(phoneNumber);

    // Step 4: Enter Password
    await this.enterPassword(password);

    // Step 5: Enter Email
    await this.enterEmail(email);

    // Step 6: Select Admin Role
    await this.selectAdminRole();

    // Step 7: Click 'Đăng ký' Button
    await this.clickToUpdate();
  }
}
