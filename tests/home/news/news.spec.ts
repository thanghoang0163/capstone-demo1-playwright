import { test } from "~/fixtures/customFixtures";
import { componentVariables } from "~/constants/commonVariables";
import {
  navigateToSectionOnPage,
  openNewPageOnBrowser,
  waitForLoadingDisappearOnBaseUrl,
} from "~/utils/commonActionHandlers";

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, loadingScreen }) => {
  // Go To Base URL And Wait For The Loading Screen Disappear
  await waitForLoadingDisappearOnBaseUrl(page, loadingScreen);
});

// ===== TEST STEPS =====
test.describe("HOMEPAGE - NEWS SECTION", async () => {
  test("Open Poster From The News Section On Homepage", async ({
    page,
    homePage,
  }) => {
    // Step 1: Navigate To 'Tin Tức' Section On Homepage
    await navigateToSectionOnPage(
      page,
      componentVariables.topNavigation.news.id,
      () => homePage.getTopNavigation().navigateToNewsSection(),
    );

    // Step 2: Switch To 'Review' Tab
    await homePage.switchToReviewTab();

    // Set Tab Switching Timeout
    const tabSwitchingTimeout = 500;

    // Pause Time To View Switch Tab Animation
    await page.waitForTimeout(tabSwitchingTimeout);

    // Step 3: Switch To 'Khuyến mãi' Tab
    await homePage.switchToPromotionTab();

    // Pause Time To View Switch Tab Animation
    await page.waitForTimeout(tabSwitchingTimeout);

    // Step 4: Switch To 'Điện Ảnh 24h' Tab
    await homePage.switchToCinema24hTab();

    // Step 5: Click The 'XEM THÊM' Button
    await homePage.clickViewMoreButton();

    // Set Button Timeout
    const buttonTimeout = 2000;

    // Pause Time To View Poster Section Expand
    await page.waitForTimeout(buttonTimeout);

    // Step 6: Click The 'RÚT GỌN' Button
    await homePage.clickCollapseButton();

    // Pause Time To View Poster Section Collapse
    await page.waitForTimeout(buttonTimeout);

    // Step 7: Click The 'XEM THÊM' Button
    await homePage.clickViewMoreButton();

    await page
      .locator(componentVariables.home.news.poster.cinema24h.id)
      .waitFor({
        state: "visible",
      });

    // Step 8: Click Poster On The 'Điện Ảnh 24h' Tab Page To Open New Download Page
    await openNewPageOnBrowser(
      page,
      componentVariables.home.news.poster.cinema24h.link,
      () => homePage.clickPosterOnCinema24hTab(),
    );
  });
});
