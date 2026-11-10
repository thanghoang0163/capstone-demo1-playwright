import { BasePage } from "~/pages/base/BasePage";

export class AppSection extends BasePage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    button: "App miễn phí - Tải về ngay!",
  };

  private accessibleVars = AppSection.accessibleVariables;

  // ===== CLICK FUNCTION =====
  // Click Download App Button
  public async clickDownloadAppButton(): Promise<void> {
    await this.clickLinkRoleWithoutExact(this.accessibleVars.button);
  }
}
