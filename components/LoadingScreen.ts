import { Locator, Page } from "@playwright/test";
import { BasePage } from "~/pages/base/BasePage";

export class LoadingScreen extends BasePage {
  private loading: Locator;

  constructor(page: Page) {
    super(page);
    this.loading = page.locator("[alt='loading']");
  }

  // ===== WAIT LOADING DISAPPEAR =====
  public async waitForLoadingDisappear(): Promise<void> {
    await this.loading.waitFor({ state: "hidden" });
  }
}
