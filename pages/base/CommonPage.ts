import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { TopNavigation } from "~/components/TopNavigation";

export class CommonPage extends BasePage {
  private topNavigation: TopNavigation;

  constructor(page: Page) {
    super(page);
    this.topNavigation = new TopNavigation(page);
  }

  // ===== GET TOP NAVIGATION =====
  public getTopNavigation(): TopNavigation {
    return this.topNavigation;
  }
}
