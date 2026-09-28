import { test } from "~/fixtures/customFixtures";
import { loginOnBaseUrl } from "~/utils/commonActionHandlers";
import {
  selectMovieInfo,
  verifySeatNotSelected,
} from "~/utils/bookingHandlers";

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, commonModal, homePage, loginPage }) => {
  // Login On Base URL Before Testing
  await loginOnBaseUrl(page, commonModal, homePage, loginPage);
});

// ===== TEST STEPS =====
test.describe("USUAL BOOKING - DO NOT SELECT SEAT WHILE BOOKING", async () => {
  test("Verify No Seat Selected While Booking", async ({
    commonModal,
    bookingPage,
  }) => {
    // Step 1: Select Movie Info
    await selectMovieInfo(bookingPage);

    // Step 2: Verify Seat Not Selected
    await verifySeatNotSelected(commonModal, bookingPage);
  });
});
