import { Page } from "@playwright/test";
import { BasePage } from "~/pages/base/BasePage";
import { userVariables } from "~/constants/variables/userVariables";
import { generalVariables } from "~/constants/variables/generalVariables";

export class TopNavigation extends BasePage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    // Main Links
    link: {
      login: "Đăng Nhập",
      register: "Đăng Ký",
      showTimes: {
        title: "Lịch Chiếu",
      },
      cinemas: {
        title: "Cụm Rạp",
      },
      news: {
        title: "Tin Tức",
      },
      app: {
        title: "Ứng Dụng",
      },
      profile: "Avatar",
    },
    // Logout
    logout: {
      // Notification content
      button: "Đăng xuất",
      confirmPopup: "Bạn có muốn đăng xuất ?",
      successPopup: "Đã đăng xuất",
    },
    // Button
    button: {
      accept: generalVariables.button.accept,
      cancel: generalVariables.button.cancel,
    },
    //Logo
    logo: {
      name: "Logo",
    },
  };

  private accessibleVars = TopNavigation.accessibleVariables;

  constructor(page: Page) {
    super(page);
  }

  // ===== NAVIGATE FUNCTION =====
  // Navigate to Home Page
  public async navigateToHomePage(): Promise<void> {
    // await this.clickByRole("img", this.accessibleVars.logo.name, true);

    await this.page.getByRole("img", { name: "Logo", exact: true }).click();
  }

  // Navigate To Login Page
  public async navigateToLoginPage(): Promise<void> {
    await this.clickLinkRole(this.accessibleVars.link.login);
  }

  // Navigate To Register Page
  public async navigateToRegisterPage(): Promise<void> {
    await this.clickLinkRole(this.accessibleVars.link.register);
  }

  // Navigate To Show Times Section
  public async navigateToShowTimesSection(): Promise<void> {
    await this.clickHrefFilter(this.accessibleVars.link.showTimes.title);
  }

  // Navigate To Cinemas Section
  public async navigateToCinemasSection(): Promise<void> {
    await this.clickHrefFilter(this.accessibleVars.link.cinemas.title);
  }

  // Navigate To News Section
  public async navigateToNewsSection(): Promise<void> {
    await this.clickHrefFilter(this.accessibleVars.link.news.title);
  }

  // Navigate To Application Section
  public async navigateToAppSection(): Promise<void> {
    await this.clickHrefFilter(this.accessibleVars.link.app.title);
  }

  // Navigate To Profile Page
  public async navigateToProfilePage(fullName: string): Promise<void> {
    await this.clickLinkRole(this.accessibleVars.link.profile + " " + fullName);
  }

  // ===== LOGOUT FUNCTION =====
  // Click To Logout
  public async clickToLogout(): Promise<void> {
    await this.clickLinkRole(this.accessibleVars.logout.button);
  }

  // Wait For Confirm Logout Popup Appear
  public async waitForConfirmLogoutPopupAppear(): Promise<void> {
    await this.page
      .getByRole("heading", { name: this.accessibleVars.logout.confirmPopup })
      .waitFor({
        state: "visible",
      });
  }

  // Accept Logout
  public async acceptLogout(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.button.accept);
  }

  // Cancel Logout
  public async cancelLogout(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.button.cancel);
  }

  // Wait For success Logout Popup Appear
  public async waitForSuccessLogoutPopupAppear(): Promise<void> {
    await this.page
      .getByRole("heading", { name: this.accessibleVars.logout.successPopup })
      .waitFor({
        state: "visible",
      });
  }
}
