import { test } from "~/fixtures/customFixtures";
import { selectMovieInfo, loginWhileBooking } from "~/utils/bookingHandlers";
import { waitForLoadingDisappearOnBaseUrl } from "~/utils/commonActionHandlers";

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, loadingScreen }) => {
  // Go To Base URL And Wait For The Loading Screen Disappear
  await waitForLoadingDisappearOnBaseUrl(page, loadingScreen);
});

// ===== TEST STEPS =====
test.describe("LOG IN WHILE BOOKING", async () => {
  test("Verify Login While Booking", async ({
    page,
    commonModal,
    loginPage,
    bookingPage,
  }) => {
    // Step 1: Select Movie Info
    await selectMovieInfo(bookingPage);

    // Step 2: Select The First Available Seat
    // Step 3:  Click The 'Đồng ý' Button To Login
    // Step 4: Login With Existed Account
    // Step 5: Verify User Login Successfully
    // VP: Message 'Đăng nhập thành công' Displays
    await loginWhileBooking(page, commonModal, bookingPage, loginPage);

    // Step 6: Select Movie Info
    await selectMovieInfo(bookingPage);

    // Step 7: Click The 'ĐẶT VÉ' Button To Booking
    await bookingPage.clickToBookingTicket();
  });
});
