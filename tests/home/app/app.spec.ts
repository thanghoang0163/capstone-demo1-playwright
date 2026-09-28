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
test.describe("HOMEPAGE - APP SECTION", async () => {
  test("Verify Open Download Link From The App Section On Homepage", async ({
    page,
    homePage,
  }) => {
    // Step 1: Navigate To 'Ứng Dụng' Section On Homepage
    await navigateToSectionOnPage(
      page,
      componentVariables.topNavigation.app.id,
      () => homePage.getTopNavigation().navigateToAppSection(),
    );

    // Step 2: Click Download App Button To Open New Download Page
    await openNewPageOnBrowser(page, componentVariables.home.app.link, () =>
      homePage.clickDownloadAppButton(),
    );
  });
});
