import { test } from "~/fixtures/customFixtures";
import {
  selectMovieInfo,
  verifySeatNotSelected,
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
