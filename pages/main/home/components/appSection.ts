import { Page } from "@playwright/test";
import { componentVariables } from "~/constants/commonVariables";
import { BasePage } from "~/pages/base/BasePage";

export class AppSection extends BasePage {
  private btnDownloadApp: string;

  constructor(page: Page) {
    super(page);
    this.btnDownloadApp = componentVariables.home.app.button;
  }

  // ===== CLICK FUNCTION =====
  // Click Download App Button
  public async clickDownloadAppButton(): Promise<void> {
    await this.clickLinkRoleWithoutExact(this.btnDownloadApp);
  }
}
