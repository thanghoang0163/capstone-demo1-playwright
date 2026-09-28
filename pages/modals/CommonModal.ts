import { Locator, Page } from "@playwright/test";
import { componentVariables } from "~/constants/commonVariables";
import { BasePage } from "~/pages/base/BasePage";

export class CommonModal extends BasePage {
  private lblBigTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.lblBigTitle = page.locator(componentVariables.modal.bigTitle);
  }

  // ===== GET MESSAGE TEXT =====
  public async getMessageText(): Promise<string | null> {
    return await this.lblBigTitle.textContent();
  }

  // ===== WAIT FOR MODAL DISAPPEAR =====
  public async waitForModalDisappear(): Promise<void> {
    await this.lblBigTitle.waitFor({ state: "hidden" });
  }
}
