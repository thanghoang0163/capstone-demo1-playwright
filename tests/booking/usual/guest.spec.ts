import { test } from "~/fixtures/customFixtures";
import { selectMovieInfo, verifyBookingAsGuest } from "~/utils/bookingHandlers";
import { waitForLoadingDisappearOnBaseUrl } from "~/utils/commonActionHandlers";

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, loadingScreen }) => {
  // Go To Base URL And Wait For The Loading Screen Disappear
  await waitForLoadingDisappearOnBaseUrl(page, loadingScreen);
});

// ===== TEST STEPS =====
test.describe("GUEST BOOKING", async () => {
  test("Verify Booking As Guest", async ({
    page,
    commonModal,
    bookingPage,
  }) => {
    // Step 1: Select Movie Info
    await selectMovieInfo(bookingPage);

    // Step 2: Verify Booking As Guest
    await verifyBookingAsGuest(page, commonModal, bookingPage);
  });
});
