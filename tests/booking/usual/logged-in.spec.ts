import { test } from "~/fixtures/customFixtures";
import {
  selectMovieInfo,
  verifyBookingWhenLoggingInBeforehand,
} from "~/utils/bookingHandlers";
import { loginWithNewUser } from "~/utils/commonHandlers";

// ===== BEFORE EACH =====
test.beforeEach(
  async ({
    page,
    commonModal,
    loadingScreen,
    homePage,
    registerPage,
    loginPage,
  }) => {
    // Login With New User
    await loginWithNewUser(
      page,
      commonModal,
      loadingScreen,
      homePage,
      registerPage,
      loginPage,
    );
  },
);

// ===== TEST STEPS =====
test.describe("LOGGED IN BOOKING", async () => {
  test("Verify Booking With Logged In Existed Account", async ({
    page,
    commonModal,
    bookingPage,
  }) => {
    // Step 1: Select Movie Info
    await selectMovieInfo(bookingPage);

    // Step 2: Verify Booking When Logging In Beforehand
    await verifyBookingWhenLoggingInBeforehand(page, commonModal, bookingPage);
  });
});
