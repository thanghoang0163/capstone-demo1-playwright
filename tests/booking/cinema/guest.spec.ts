import { test } from "~/fixtures/customFixtures";
import {
  selectCinemaPlaceAndShowtimeAsGuest,
  verifyBookingAsGuest,
} from "~/utils/bookingHandlers";

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, loadingScreen, homePage, bookingPage }) => {
  // Select Movie From The 'Select Option' Component On Homepage As Guest
  await selectCinemaPlaceAndShowtimeAsGuest(
    page,
    loadingScreen,
    homePage,
    bookingPage,
  );
});

// ===== TEST STEPS =====
test.describe("HOMEPAGE CINEMA SECTION - GUEST BOOKING", async () => {
  test("Verify Booking As Guest", async ({
    page,
    commonModal,
    bookingPage,
  }) => {
    // Step 1: Verify Booking As Guest
    await verifyBookingAsGuest(page, commonModal, bookingPage);
  });
});
