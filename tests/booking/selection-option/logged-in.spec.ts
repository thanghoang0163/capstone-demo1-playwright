import { test } from "~/fixtures/customFixtures";
import {
  verifyBookingWhenLoggingInBeforehand,
  selectMovieFromSelectOptionWithLoggedIn,
} from "~/utils/bookingHandlers";

// ===== BEFORE EACH =====
test.beforeEach(
  async ({ page, commonModal, homePage, loginPage, bookingPage }) => {
    // Select Movie From The 'Select Option' Component On Homepage With Logged In
    await selectMovieFromSelectOptionWithLoggedIn(
      page,
      commonModal,
      homePage,
      loginPage,
      bookingPage,
    );
  },
);

// ===== TEST STEPS =====
test.describe("HOMEPAGE SELECT OPTION - LOGGED IN BEFORE BOOKING", async () => {
  test("Verify Booking With Logged In Existed Account", async ({
    page,
    commonModal,
    bookingPage,
  }) => {
    // Step 1: Verify Booking When Logging In Beforehand
    await verifyBookingWhenLoggingInBeforehand(page, commonModal, bookingPage);
  });
});
