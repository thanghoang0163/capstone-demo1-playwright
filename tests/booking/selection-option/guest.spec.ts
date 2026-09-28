import { test } from "~/fixtures/customFixtures";
import {
  verifyBookingAsGuest,
  selectMovieFromSelectOptionAsGuest,
} from "~/utils/bookingHandlers";

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, loadingScreen, bookingPage }) => {
  // Select Movie From The 'Select Option' Component On Homepage As Guest
  await selectMovieFromSelectOptionAsGuest(page, loadingScreen, bookingPage);
});

// ===== TEST STEPS =====
test.describe("HOMEPAGE SELECT OPTION - GUEST BOOKING", async () => {
  test("Verify Booking As Guest", async ({
    page,
    commonModal,
    bookingPage,
  }) => {
    // Step 1: Verify Booking As Guest
    await verifyBookingAsGuest(page, commonModal, bookingPage);
  });
});
