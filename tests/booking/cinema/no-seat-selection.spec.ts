import { test } from "~/fixtures/customFixtures";
import {
  verifySeatNotSelected,
  selectCinemaPlaceAndShowtimeWithLoggedIn,
} from "~/utils/bookingHandlers";

// ===== BEFORE EACH =====
test.beforeEach(
  async ({ page, commonModal, homePage, loginPage, bookingPage }) => {
    // Select Movie From The 'Select Option' Component On Homepage With Logged In
    await selectCinemaPlaceAndShowtimeWithLoggedIn(
      page,
      commonModal,
      homePage,
      loginPage,
      bookingPage,
    );
  },
);

// ===== TEST STEPS =====
test.describe("HOMEPAGE CINEMA SECTION - DO NOT SELECT SEAT WHILE BOOKING", async () => {
  test("Verify No Seat Selected While Booking", async ({
    commonModal,
    bookingPage,
  }) => {
    // Step 1: Verify Seat Not Selected
    await verifySeatNotSelected(commonModal, bookingPage);
  });
});
