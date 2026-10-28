import { test } from "~/fixtures/customFixtures";
import { BASE_URL, publicRoutes, privateRoutes } from "~/routes/publicRoutes";

// ===== URL =====
// Login URL
const loginUrl = BASE_URL + publicRoutes.login;

// ===== TEST STEPS =====
test.describe("BOOKING HISTORY - GUEST", async () => {
  test("View Booking History As Guest", async ({ page, loginPage }) => {
    // Step 1: Go To Profile Page To View History Booking
    await page.goto(BASE_URL + privateRoutes.profile);

    // VP: The User Is Redirected To Login Page
    await loginPage.toHaveUrlExpect(
      page,
      "Không mở được trang 'Đăng Nhập'",
      loginUrl,
    );
  });
});
