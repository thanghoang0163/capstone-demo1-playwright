import { test, expect } from "~/fixtures/customFixtures";
import { BASE_URL, publicRoutes, privateRoutes } from "~/routes/publicRoutes";

// ===== TEST STEPS =====
test.describe("BOOKING HISTORY - GUEST", async () => {
  test("View Booking History As Guest", async ({ page }) => {
    // Step 1: Go To Profile Page To View History Booking
    await page.goto(BASE_URL + privateRoutes.profile);

    // VP: The User Is Redirected To Login Page
    await expect(page, "Không mở được trang 'Đăng Nhập'").toHaveURL(
      BASE_URL + publicRoutes.login,
    );
  });
});
