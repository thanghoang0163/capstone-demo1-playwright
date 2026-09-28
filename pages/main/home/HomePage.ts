import { Page } from "@playwright/test";
import { AppSection } from "./components/appSection";
import { NewsSection } from "./components/newsSection";
import { CommonPage } from "~/pages/base/CommonPage";

export class HomePage extends CommonPage {
  private appSection: AppSection;
  private newsSection: NewsSection;

  constructor(page: Page) {
    super(page);
    this.appSection = new AppSection(page);
    this.newsSection = new NewsSection(page);
  }

  // ===== CLICK FUNCTION =====
  // App Section
  // Click Download App Button
  public async clickDownloadAppButton(): Promise<void> {
    await this.appSection.clickDownloadAppButton();
  }

  // News Section
  // Click 'XEM THÊM' Button
  public async clickViewMoreButton(): Promise<void> {
    await this.newsSection.clickViewMoreButton();
  }

  // Click 'RÚT GỌN' Button
  public async clickCollapseButton(): Promise<void> {
    await this.newsSection.clickCollapseButton();
  }

  // ===== SWITCH TAB FUNCTION =====
  // News Section
  // Switch To 'Điện Ảnh 24h' Tab
  public async switchToCinema24hTab(): Promise<void> {
    await this.newsSection.switchToCinema24hTab();
  }

  // Switch To 'Review' Tab
  public async switchToReviewTab(): Promise<void> {
    await this.newsSection.switchToReviewTab();
  }

  // Switch To 'Khuyến mãi' Tab
  public async switchToPromotionTab(): Promise<void> {
    await this.newsSection.switchToPromotionTab();
  }

  // ===== LINK FUNCTION =====
  // Click Poster On 'Điện Ảnh 24h' Tab Page
  public async clickPosterOnCinema24hTab(): Promise<void> {
    await this.newsSection.clickPosterOnCinema24hTab();
  }

  // Click Poster On 'Review' Tab Page
  public async clickPosterOnReviewTab(): Promise<void> {
    await this.newsSection.clickPosterOnReviewTab();
  }

  // Click Poster On 'Khuyến mãi' Tab Page
  public async clickPosterOnPromotionTab(): Promise<void> {
    await this.newsSection.clickPosterOnPromotionTab();
  }
}
