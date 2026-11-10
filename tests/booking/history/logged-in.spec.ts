import { test, expect } from "~/fixtures/customFixtures";
import { BASE_URL, privateRoutes } from "~/routes/publicRoutes";
import { loginOnBaseUrl } from "~/utils/commonHandlers";

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, commonModal, homePage, loginPage }) => {
  // Login On Base URL Before Testing
  await loginOnBaseUrl(page, commonModal, homePage, loginPage);
});

// ===== TEST STEPS =====
test.describe("BOOKING HISTORY - LOGGED IN", async () => {
  test("Verify View Booking History With Logged In Account", async ({
    page,
    loadingScreen,
    bookingPage,
  }) => {
    // Step 1: Go To Profile Page To View History Booking
    await page.goto(BASE_URL + privateRoutes.profile);

    await loadingScreen.waitForLoadingDisappear();

    // Get The First Booking History
    const firstItem = page
      .locator(".MuiGrid-container.MuiGrid-spacing-xs-3")
      .nth(1)
      .locator(".MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-6")
      .first();

    // Wait Until The First Booking History Is Visible
    await bookingPage.toBeVisibleExpect(
      firstItem,
      "Không tìm thấy lịch sử đặt vé nào",
    );

    // Step 2: Scroll To The 'Lịch sử đặt vé' Section
    await page.evaluate(() => {
      window.scrollBy({ top: 470, behavior: "smooth" });
    });
  });
});
