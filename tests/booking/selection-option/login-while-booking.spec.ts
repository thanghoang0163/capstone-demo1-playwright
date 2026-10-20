import { test } from "~/fixtures/customFixtures";
import {
  loginWhileBooking,
  selectMovieFromSelectOption,
  registerBeforeSelectingMovieFromSelectOption,
} from "~/utils/bookingHandlers";

// ===== BEFORE EACH =====
test.beforeEach(
  async ({ page, loadingScreen, homePage, registerPage, bookingPage }) => {
    // Select Movie From The 'Select Option' Component On Homepage As Guest
    await registerBeforeSelectingMovieFromSelectOption(
      page,
      loadingScreen,
      homePage,
      registerPage,
      bookingPage,
    );
  },
);

// ===== TEST STEPS =====
test.describe("HOMEPAGE SELECT OPTION - LOG IN WHILE BOOKING", async () => {
  test("Verify Login while Booking", async ({
    page,
    commonModal,
    loginPage,
    bookingPage,
  }) => {
    // Step 1: Select The First Available Seat
    // Step 2:  Click The 'Đồng ý' Button To Login
    // Step 3: Login With Existed Account
    // Step 4: Verify User Login Successfully
    // VP: Message 'Đăng nhập thành công' Displays
    await loginWhileBooking(page, commonModal, bookingPage, loginPage);

    // Step 5: Select A Movie From "Select Option' Component Again
    await selectMovieFromSelectOption(bookingPage);

    // Step 6: Click The 'ĐẶT VÉ' Button To Booking
    await bookingPage.clickToBookingTicket();
  });
});
