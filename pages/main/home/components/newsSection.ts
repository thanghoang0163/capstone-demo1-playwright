import { Page } from "@playwright/test";
import { BasePage } from "~/pages/base/BasePage";

export class NewsSection extends BasePage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    // Tab Bar
    tabBar: {
      cinema24h: "Điện Ảnh 24h",
      review: "review",
      promotion: "Khuyến mãi",
    },
    // Poster
    poster: {
      cinema24h: {
        title: "Diễn viên đặc biệt của Bằng Chứng Vô Hình",
      },
      review: {
        title:
          "[Review] Onward - Khi phép thuật mạnh mẽ nhất chính là tình thân",
      },
      promotion: {
        title: "Sinh Nhật Mega GS",
      },
    },
    // Button
    button: {
      viewMore: "XEM THÊM",
      collapse: "RÚT GỌN",
    },
  };

  private accessibleVars = NewsSection.accessibleVariables;

  constructor(page: Page) {
    super(page);
  }

  // ===== CLICK FUNCTION =====
  // Click 'XEM THÊM' Button
  public async clickViewMoreButton(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.button.viewMore);
  }

  // Click 'RÚT GỌN' Button
  public async clickCollapseButton(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.button.collapse);
  }

  // ===== SWITCH TAB FUNCTION =====
  // Switch To 'Điện Ảnh 24h' Tab
  public async switchToCinema24hTab(): Promise<void> {
    await this.clickTabRole(this.accessibleVars.tabBar.cinema24h);
  }

  // Switch To 'Review' Tab
  public async switchToReviewTab(): Promise<void> {
    await this.clickTabRole(this.accessibleVars.tabBar.review);
  }

  // Switch To 'Khuyến mãi' Tab
  public async switchToPromotionTab(): Promise<void> {
    await this.clickTabRole(this.accessibleVars.tabBar.promotion);
  }

  // ===== LINK FUNCTION =====
  // Click Poster On 'Điện Ảnh 24h' Tab Page
  public async clickPosterOnCinema24hTab(): Promise<void> {
    await this.clickLinkRoleWithoutExact(
      this.accessibleVars.poster.cinema24h.title,
    );
  }

  // Click Poster On 'Review' Tab Page
  public async clickPosterOnReviewTab(): Promise<void> {
    await this.clickLinkRoleWithoutExact(
      this.accessibleVars.poster.review.title,
    );
  }

  // Click Poster On 'Khuyến mãi' Tab Page
  public async clickPosterOnPromotionTab(): Promise<void> {
    await this.clickLinkRoleWithoutExact(
      this.accessibleVars.poster.promotion.title,
    );
  }
}
