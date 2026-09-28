import { test, expect } from "~/fixtures/customFixtures";
import { BASE_URL, privateRoutes } from "~/routes/publicRoutes";
import { pageVariables } from "~/constants/commonVariables";
import { loginOnBaseUrl } from "~/utils/commonActionHandlers";

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, commonModal, homePage, loginPage }) => {
  // Login On Base URL Before Testing
  await loginOnBaseUrl(page, commonModal, homePage, loginPage);
});

// ===== TEST STEPS =====
test.describe("BOOKING HISTORY - LOGGED IN", async () => {
  test("Verify View Booking History With Logged In Account", async ({
    page,
  }) => {
    // Step 1: Go To Profile Page To View History Booking
    await page.goto(BASE_URL + privateRoutes.profile);

    // Wait For 'Lịch sử đặt vé' Section To Be Rendered
    await page.waitForSelector(`text=${pageVariables.booking.history.title}`, {
      state: "visible",
    });

    // Wait For The 'Lịch sử đặt vé' Section Load Completely
    await page.waitForTimeout(1000);

    // Get The Page's Initial Position
    const scrollYBefore = await page.evaluate(() => window.scrollY);

    // Step 2: Scroll To The 'Lịch sử đặt vé' Section
    await page.evaluate(() => {
      window.scrollBy({ top: 450, behavior: "smooth" });
    });

    // Wait For Scroll Down Animation To Complete
    await page.waitForTimeout(500);

    // Get The Position After Scrolling Down
    const scrollYAfter = await page.evaluate(() => window.scrollY);

    // VP: Verify The Scroll Down Behavior Done
    expect(
      scrollYAfter,
      "Không cuộn xuống được 'Lịch sử đặt vé'",
    ).toBeGreaterThan(scrollYBefore);
  });
});
