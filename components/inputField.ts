import { Page } from "@playwright/test";
import { BasePage } from "~/pages/base/BasePage";

export class InputField extends BasePage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    // Message
    message: {
      username: "#taiKhoan-helper-text",
      password: "#matKhau-helper-text",
      confirmPassword: "#confirmPassWord-helper-text",
      fullName: "#hoTen-helper-text",
      email: "#email-helper-text",
      phoneNumber: "#soDt-helper-text",
    },
  };

  private accessibleVars = InputField.accessibleVariables;

  constructor(page: Page) {
    super(page);
  }

  // ===== GET MESSAGE TEXT =====
  // Get Username Message Text
  public async getUsernameMessageText(): Promise<string | null> {
    return await this.getMessageText(this.accessibleVars.message.username);
  }

  // Get Password Message Text
  public async getPasswordMessageText(): Promise<string | null> {
    return await this.getMessageText(this.accessibleVars.message.password);
  }

  // Get Confirm Password Message Text
  public async getConfirmPasswordMessageText(): Promise<string | null> {
    return await this.getMessageText(
      this.accessibleVars.message.confirmPassword,
    );
  }

  // Get Full Name Message Text
  public async getFullNameMessageText(): Promise<string | null> {
    return await this.getMessageText(this.accessibleVars.message.fullName);
  }

  // Get Email Message Text
  public async getEmailMessageText(): Promise<string | null> {
    return await this.getMessageText(this.accessibleVars.message.email);
  }
  // Get Phone Number Message Text
  public async getPhoneNumberMessageText(): Promise<string | null> {
    return await this.getMessageText(this.accessibleVars.message.phoneNumber);
  }

  // Get Message Text By Alert Role
  public async getAlertMessageText(): Promise<string | null> {
    return await this.getMessageTextByAlertRole();
  }
}
