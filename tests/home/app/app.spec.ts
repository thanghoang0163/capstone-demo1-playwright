import { test } from "~/fixtures/customFixtures";
import {
  navigateToSectionOnPage,
  openNewPageOnBrowser,
  waitForLoadingDisappearOnBaseUrl,
} from "~/utils/commonHandlers";

// ===== VARIABLES =====
// App Section
const app = {
  id: "#ungDung",
  link: "https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197",
};

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
    await navigateToSectionOnPage(page, app.id, homePage, () =>
      homePage.getTopNavigation().navigateToAppSection(),
    );

    // Step 2: Click Download App Button To Open New Download Page
    await openNewPageOnBrowser(page, app.link, () =>
      homePage.clickDownloadAppButton(),
    );
  });
});
