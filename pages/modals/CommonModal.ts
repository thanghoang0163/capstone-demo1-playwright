import { Locator, Page } from "@playwright/test";
import { BasePage } from "~/pages/base/BasePage";

export class CommonModal extends BasePage {
  private lblBigTitle: Locator;
  private modal: Locator;

  constructor(page: Page) {
    super(page);
    this.lblBigTitle = page.locator("#swal2-title");
    this.modal = page.locator(".swal2-modal");
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
