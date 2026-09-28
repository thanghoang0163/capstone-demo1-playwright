import { Page } from "@playwright/test";
import { BasePage } from "~/pages/base/BasePage";
import {
  componentVariables,
  pageVariables,
  generalVariables,
} from "~/constants/commonVariables";

export class TopNavigation extends BasePage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    // Main Links
    link: {
      login: componentVariables.topNavigation.login,
      register: componentVariables.topNavigation.register,
      showTimes: componentVariables.topNavigation.showTimes.title,
      cinemas: componentVariables.topNavigation.cinemas.title,
      news: componentVariables.topNavigation.news.title,
      app: componentVariables.topNavigation.app.title,
      profile: componentVariables.topNavigation.profile,
    },
    // Logout
    logout: {
      // Notification content
      confirmPopup: pageVariables.logout.confirmPopup,
      successPopup: pageVariables.logout.successPopup,
      button: pageVariables.logout.button,
    },
    // Button
    button: {
      accept: generalVariables.button.accept,
      cancel: generalVariables.button.cancel,
    },
  };

  private accessibleVars = TopNavigation.accessibleVariables;

  constructor(page: Page) {
    super(page);
  }

  // ===== NAVIGATE FUNCTION =====
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
    await this.clickHrefFilter(this.accessibleVars.link.showTimes);
  }

  // Navigate To Cinemas Section
  public async navigateToCinemasSection(): Promise<void> {
    await this.clickHrefFilter(this.accessibleVars.link.cinemas);
  }

  // Navigate To News Section
  public async navigateToNewsSection(): Promise<void> {
    await this.clickHrefFilter(this.accessibleVars.link.news);
  }

  // Navigate To Application Section
  public async navigateToAppSection(): Promise<void> {
    await this.clickHrefFilter(this.accessibleVars.link.app);
  }

  // Navigate To Profile Page
  public async navigateToProfilePage(): Promise<void> {
    await this.clickLinkRole(this.accessibleVars.link.profile);
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
