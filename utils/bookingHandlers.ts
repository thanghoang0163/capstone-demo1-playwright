import { Page, Locator, expect } from "@playwright/test";
import { componentVariables, pageVariables } from "~/constants/commonVariables";
import {
  loginOnBaseUrl,
  waitForLoadingDisappearOnBaseUrl,
} from "./commonActionHandlers";
import { LoadingScreen } from "~/components/LoadingScreen";
import { CommonModal } from "~/pages/modals/CommonModal";
import { LoginPage } from "~/pages/main/LoginPage";
import { BookingPage } from "~/pages/main/BookingPage";
import { HomePage } from "~/pages/main/home/HomePage";

// ===== GET ALL AVAILABLE SEATS =====
const getAllAvailableSeats = async (page: Page) => {
  // Get All The Button That Do Not Contain The "Mui-disabled" Classes
  const allButtons = page.locator(
    ".MuiButtonBase-root.MuiButton-root.MuiButton-text:not(.Mui-disabled)",
  );

  // Wait For The First Button Is Visible
  await allButtons.first().waitFor({ state: "visible" });

  // Filter All Available Seats
  const availableSeats = allButtons.filter({
    hasText: /^\d+$/,
  });

  // Consolidate All Available Seats Into List
  const availableSeatsList: Locator[] = await availableSeats.all();

  return availableSeatsList;
};

const getFirstAvailableSeatNumber = async (page: Page) => {
  // Get All Available Seats
  const availableSeatsList = await getAllAvailableSeats(page);

  // Return Null If Nothing Seat Available
  if (availableSeatsList.length == 0) {
    return null;
  }

  // Get The First Seat Number
  const firstAvailableSeatNumber = await availableSeatsList[0]
    .locator(".MuiButton-label")
    .textContent();

  return firstAvailableSeatNumber;
};

// ===== SELECTION OPTION FUNCTION =====
// Select Movie From The 'Select Option' Component On Homepage
const selectMovieFromSelectOption = async (bookingPage: BookingPage) => {
  // Step 1: Select A Movie
  await bookingPage.selectMovieOption();

  // Step 2: Select Cinema
  await bookingPage.selectCinemaOption();

  // Step 3: Select Show Time
  await bookingPage.selectShowTimeOption();

  // Step 4: Click The 'MUA VÉ NGAY' Button
  await bookingPage.clickToBookingNow();
};

// Select Movie From The 'Select Option' Component On Homepage As Guest
const selectMovieFromSelectOptionAsGuest = async (
  page: Page,
  loadingScreen: LoadingScreen,
  bookingPage: BookingPage,
) => {
  // Step 1: Go To Base URL And Wait For The Loading Screen Disappear
  await waitForLoadingDisappearOnBaseUrl(page, loadingScreen);

  // Step 2: Select A Movie From 'Select Option' Component
  await selectMovieFromSelectOption(bookingPage);
};

// Select Movie From The 'Select Option' Component On Homepage With Logged In
const selectMovieFromSelectOptionWithLoggedIn = async (
  page: Page,
  commonModal: CommonModal,
  homePage: HomePage,
  loginPage: LoginPage,
  bookingPage: BookingPage,
) => {
  // Step 1: Login On Base URL Before Testing
  await loginOnBaseUrl(page, commonModal, homePage, loginPage);

  // Step 2: Select A Movie From 'Select Option' Component
  await selectMovieFromSelectOption(bookingPage);
};

// ===== SELECT CINEMA FUNCTION =====
// Scroll Down To Cinema Section On Homepage
const scrollDownToCinemaSection = async (page: Page, homePage: HomePage) => {
  // Step 1: Click 'Cụm Rạp' Tab From Top Navigation Bar
  await homePage.getTopNavigation().navigateToCinemasSection();

  // Expect The 'Cụm Rạp' Section Is Scrolled Into View
  const cinemasSection = page.locator(
    componentVariables.topNavigation.cinemas.id,
  );

  // Scroll Using Playwright Instead Of Waiting For Website's JS Animations
  await cinemasSection.scrollIntoViewIfNeeded();

  // Wait For The Cinema Section In Viewport
  await expect(
    cinemasSection,
    "Phần 'Cụm Rạp' không có trong Viewport",
  ).toBeInViewport();
};

// Select Cinema Place And Showtime On Homepage
const selectCinemaPlaceAndShowtime = async (
  page: Page,
  homePage: HomePage,
  bookingPage: BookingPage,
) => {
  // Step 1: Scroll Down To Cinema Section On Homepage
  await scrollDownToCinemaSection(page, homePage);

  // Step 2: Select Cinema
  await bookingPage.selectCinema();

  // Step 3: Select Cinema Place
  await bookingPage.selectCinemaPlace();

  // Step 4: Select Cinema Showtime
  await bookingPage.selectCinemaShowtime();
};

// Select Cinema Place And Showtime On Homepage As Guest
const selectCinemaPlaceAndShowtimeAsGuest = async (
  page: Page,
  loadingScreen: LoadingScreen,
  homePage: HomePage,
  bookingPage: BookingPage,
) => {
  // Step 1: Go To Base URL And Wait For The Loading Screen Disappear
  await waitForLoadingDisappearOnBaseUrl(page, loadingScreen);

  // Step 2: Select Place And Showtime From Cinema Section
  await selectCinemaPlaceAndShowtime(page, homePage, bookingPage);
};

// Select Cinema Place And Showtime On Homepage With Logged In
const selectCinemaPlaceAndShowtimeWithLoggedIn = async (
  page: Page,
  commonModal: CommonModal,
  homePage: HomePage,
  loginPage: LoginPage,
  bookingPage: BookingPage,
) => {
  // Step 1: Login On Base URL Before Testing
  await loginOnBaseUrl(page, commonModal, homePage, loginPage);

  // Wait For Scroll Down Animation To Complete
  await page.waitForTimeout(4000);

  // Step 2: Select Place And Showtime From Cinema Section
  await selectCinemaPlaceAndShowtime(page, homePage, bookingPage);
};

// ===== SEAT FUNCTION =====
// Select The First Available Seat And Then Click The 'ĐẶT VÉ' Button To Booking
const selectSeat = async (page: Page, bookingPage: BookingPage) => {
  // Step 1: Select The First Available Seat
  const firstSeatNumber = await bookingPage.getFirstAvailableSeat(page);

  // Select The First Available Seat

  firstSeatNumber != null &&
    (await bookingPage.clickButtonRole(firstSeatNumber));

  // VP: Check If At Least One Available Seat
  expect(firstSeatNumber, "Không còn chỗ để đặt tại rạp").not.toBeNull();

  // Step 2: Click The 'ĐẶT VÉ' Button To Booking
  await bookingPage.clickToBookingTicket();
};

// Verify Seat Not Selected
const verifySeatNotSelected = async (
  commonModal: CommonModal,
  bookingPage: BookingPage,
) => {
  // Step 1: Click The 'ĐẶT VÉ' Button To Booking
  await bookingPage.clickToBookingTicket();

  // VP: Message 'Bạn chưa chọn ghế' Displays
  const selectSeatMsg = await commonModal.getMessageText();
  expect(selectSeatMsg, "Bạn đã chọn ghế").toEqual(
    pageVariables.booking.notification.error.noSeatSelection,
  );
};

// ===== USUAL BOOKING FUNCTION =====
// Select Movie Info
const selectMovieInfo = async (bookingPage: BookingPage) => {
  // Step 1: Select A Movie On Homepage
  await bookingPage.selectMovie();

  // Step 2: Scroll Down To The Show Time On Cinema
  await bookingPage.scrollToCinemaList();

  // Step 3: Select The Show Time
  await bookingPage.selectShowTime();
};

// Login While Booking
const loginWhileBooking = async (
  page: Page,
  commonModal: CommonModal,
  bookingPage: BookingPage,
  loginPage: LoginPage,
) => {
  // Step 1: Select The First Available Seat
  // Step 2: Click The 'ĐẶT VÉ' Button To Booking
  await selectSeat(page, bookingPage);

  // Step 3: Click The 'Đồng ý' Button To Login
  await bookingPage.clickToLogIn();

  // Step 4: Login With Existed Account
  await loginPage.login();

  // Step 5: Verify User Login Successfully
  // VP: Message 'Đăng nhập thành công' Displays
  const loginMsg = await commonModal.getMessageText();
  expect(loginMsg, "Đăng nhập không thành công").toEqual(
    pageVariables.login.notification.success,
  );
};

// ===== GUEST BOOKING FUNCTION =====
// Guest Booking
const guestBooking = async (
  page: Page,
  commonModal: CommonModal,
  bookingPage: BookingPage,
) => {
  // Step 1: Select The First Available Seat
  // Step 2: Click The 'ĐẶT VÉ' Button To Booking
  await selectSeat(page, bookingPage);

  // Step 3: Verify User Does Not Login
  // VP: Message 'Bạn chưa đăng nhập' Displays
  const loginMsg = await commonModal.getMessageText();
  expect(loginMsg, "Bạn đã đăng nhập").toEqual(
    pageVariables.login.notification.error,
  );
};

// Verify Booking As Guest
const verifyBookingAsGuest = async (
  page: Page,
  commonModal: CommonModal,
  bookingPage: BookingPage,
) => {
  // Step 1: Select The First Available Seat
  // Step 2: Verify User Does Not Login
  // VP: Message 'Bạn chưa đăng nhập' Displays
  await guestBooking(page, commonModal, bookingPage);
};

// ===== LOGGED IN BOOKING FUNCTION =====
// Login Before Booking
const loggedInBooking = async (
  page: Page,
  commonModal: CommonModal,
  bookingPage: BookingPage,
) => {
  // Step 1: Select The First Available Seat
  // Step 2: Click The 'ĐẶT VÉ' Button To Booking
  await selectSeat(page, bookingPage);

  // Step 3: Verify User Booking Successfully
  // VP: Message 'Đặt vé thành công' Displays
  const bookingMsg = await commonModal.getMessageText();
  expect(bookingMsg, "Đặt vé không thành công").toEqual(
    pageVariables.booking.notification.success.booking,
  );
};

// Verify Booking When Logging In Beforehand
const verifyBookingWhenLoggingInBeforehand = async (
  page: Page,
  commonModal: CommonModal,
  bookingPage: BookingPage,
) => {
  // Step 1: Select The First Available Seat
  // Step 2: Verify User Does Not Login
  // VP: Message 'Bạn chưa đăng nhập' Displays
  await loggedInBooking(page, commonModal, bookingPage);
};

export {
  getAllAvailableSeats,
  getFirstAvailableSeatNumber,
  selectMovieFromSelectOption,
  selectMovieFromSelectOptionAsGuest,
  selectMovieFromSelectOptionWithLoggedIn,
  selectCinemaPlaceAndShowtime,
  selectCinemaPlaceAndShowtimeAsGuest,
  selectCinemaPlaceAndShowtimeWithLoggedIn,
  selectSeat,
  verifySeatNotSelected,
  selectMovieInfo,
  loginWhileBooking,
  guestBooking,
  verifyBookingAsGuest,
  loggedInBooking,
  verifyBookingWhenLoggingInBeforehand,
};
