import { Page, Locator, expect } from "@playwright/test";
import { generalVariables } from "~/constants/variables/generalVariables";
import { userInfo } from "~/constants/userConstant";
import { getMovieList } from "~/apis/movieApi";
import {
  getCinemaList,
  getCinemaSchedule,
  getMovieShowTimes,
} from "~/apis/cinemaApi";
import {
  navigateToSectionOnPage,
  loginWithNewUser,
  registerNewUserBeforeTesting,
  waitForLoadingDisappearOnBaseUrl,
  formatCinemaTime,
} from "./commonHandlers";
import { LoadingScreen } from "~/components/LoadingScreen";
import { CommonModal } from "~/pages/modals/CommonModal";
import { LoginPage } from "~/pages/main/LoginPage";
import { BookingPage } from "~/pages/main/BookingPage";
import { HomePage } from "~/pages/main/home/HomePage";
import { RegisterPage } from "~/pages/main/RegisterPage";

// ===== VARIABLES =====
// Cinemas
const cinemas = {
  id: "#cumRap",
};

// Notification
const notification = {
  login: {
    success: generalVariables.login.success,
    error: "Bạn chưa đăng nhập",
  },
  booking: {
    success: {
      booking: "Đặt vé thành công",
    },
    error: {
      noSeatSelection: "Bạn chưa chọn ghế",
    },
  },
};

// ===== SELECTION OPTION FUNCTION =====
// Movie Show Times Interface
interface MovieShowTimes {
  heThongRapChieu?: {
    cumRapChieu?: {
      maCumRap: string;
      lichChieuPhim?: { maLichChieu: string; ngayChieuGioChieu: string }[];
    }[];
  }[];
}

// Select Movie From The 'Select Option' Component On Homepage
const selectMovieFromSelectOption = async (bookingPage: BookingPage) => {
  // Get Movie ID From API
  const movies = (await getMovieList()) as { maPhim: number }[];

  // Get Movie ID In The Movies List
  const movieId = movies[6]?.maPhim;

  if (movieId === undefined) return;

  // Get Movie Show Times List From API
  const movieShowTimes = (await getMovieShowTimes(movieId)) as MovieShowTimes;

  // Get Cinemas List
  const cinemas = movieShowTimes.heThongRapChieu?.[0]?.cumRapChieu?.[0];

  // Get Cinema ID In The Cinemas List
  const cinemaId = cinemas?.maCumRap;

  // Get Show Times ID In The Cinemas List
  const showTimeId = cinemas?.lichChieuPhim?.[0]?.maLichChieu;

  if (!cinemaId || !showTimeId) return;

  // Step 1: Select A Movie
  await bookingPage.selectMovieOption(movieId.toString());

  // Step 2: Select Cinema
  await bookingPage.selectCinemaOption(cinemaId);

  // Step 3: Select Show Time
  await bookingPage.selectShowTimeOption(showTimeId);

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

// Register Before Selecting Movie From The 'Select Option' Component On Homepage As Guest
const registerBeforeSelectingMovieFromSelectOption = async (
  page: Page,
  commonModal: CommonModal,
  loadingScreen: LoadingScreen,
  homePage: HomePage,
  registerPage: RegisterPage,
  bookingPage: BookingPage,
) => {
  // Step 1: Register Before Testing
  await registerNewUserBeforeTesting(
    page,
    commonModal,
    loadingScreen,
    homePage,
    registerPage,
  );

  // Step 2: Select A Movie From 'Select Option' Component
  await selectMovieFromSelectOption(bookingPage);
};

// Select Movie From The 'Select Option' Component On Homepage With Logged In
const selectMovieFromSelectOptionWithLoggedIn = async (
  page: Page,
  commonModal: CommonModal,
  loadingScreen: LoadingScreen,
  homePage: HomePage,
  registerPage: RegisterPage,
  loginPage: LoginPage,
  bookingPage: BookingPage,
) => {
  // Step 1: Login With New User
  await loginWithNewUser(
    page,
    commonModal,
    loadingScreen,
    homePage,
    registerPage,
    loginPage,
  );

  // Step 2: Select A Movie From 'Select Option' Component
  await selectMovieFromSelectOption(bookingPage);
};

// ===== SELECT CINEMA FUNCTION =====
// Cinema System Interface
interface CinemaSystem {
  maHeThongRap: string;
  biDanh: string;
}

// Cinema Schedule Interface
interface CinemaSchedule {
  lstCumRap: {
    tenCumRap: string;
    danhSachPhim: {
      lstLichChieuTheoPhim: { ngayChieuGioChieu: string }[];
    }[];
  }[];
}

// Select Cinema Place And Showtime On Homepage
const selectCinemaPlaceAndShowtime = async (
  page: Page,
  homePage: HomePage,
  bookingPage: BookingPage,
) => {
  // Get Cinema System From API
  const cinemasList = (await getCinemaList()) as CinemaSystem[];
  const { maHeThongRap: cinemaId, biDanh: cinemaAlias } = cinemasList[4];

  // Get Cinema Schedule From API
  const cinemaSchedule = (await getCinemaSchedule(
    cinemaId,
  )) as CinemaSchedule[];

  // Get Cinema Branch
  const cinemaBranch = cinemaSchedule[0].lstCumRap[2];

  // Get Cinema Place
  const cinemaPlace = cinemaBranch.tenCumRap;

  // Get Cinema Show Time
  const cinemaShowTime = formatCinemaTime(
    cinemaBranch.danhSachPhim[1].lstLichChieuTheoPhim[0].ngayChieuGioChieu,
  );

  // Step 1: Scroll Down To Cinema Section On Homepage
  await navigateToSectionOnPage(page, cinemas.id, homePage, () =>
    homePage.getTopNavigation().navigateToCinemasSection(),
  );

  // Step 2: Select Cinema
  await bookingPage.selectCinema(cinemaAlias);

  // Step 3: Select Cinema Place
  await bookingPage.selectCinemaPlace(cinemaPlace);

  // Step 4: Select Cinema Showtime
  await bookingPage.selectCinemaShowtime(cinemaShowTime);
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

// Register Before Selecting Cinema Place And Showtime On Homepage As Guest
const registerBeforeSelectingCinemaPlaceAndShowtime = async (
  page: Page,
  commonModal: CommonModal,
  loadingScreen: LoadingScreen,
  homePage: HomePage,
  registerPage: RegisterPage,
  bookingPage: BookingPage,
) => {
  // Step 1: Register Before Testing
  await registerNewUserBeforeTesting(
    page,
    commonModal,
    loadingScreen,
    homePage,
    registerPage,
  );

  // Step 2: Select Place And Showtime From Cinema Section
  await selectCinemaPlaceAndShowtime(page, homePage, bookingPage);
};

// Select Cinema Place And Showtime On Homepage With Logged In
const selectCinemaPlaceAndShowtimeWithLoggedIn = async (
  page: Page,
  commonModal: CommonModal,
  loadingScreen: LoadingScreen,
  homePage: HomePage,
  registerPage: RegisterPage,
  loginPage: LoginPage,
  bookingPage: BookingPage,
) => {
  // Step 1: Login With New User
  await loginWithNewUser(
    page,
    commonModal,
    loadingScreen,
    homePage,
    registerPage,
    loginPage,
  );

  // Step 2: Select Place And Showtime From Cinema Section
  await selectCinemaPlaceAndShowtime(page, homePage, bookingPage);
};

// ===== GET ALL AVAILABLE SEATS =====
// Get All Available Seats
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

  // Return Available Seats List
  const availableSeatsList: Locator[] = await availableSeats.all();

  return availableSeatsList;
};

// Get First Available Seat
const getFirstAvailableSeat = async (page: Page) => {
  // Get All Available Seats
  const availableSeatsList = await getAllAvailableSeats(page);

  // Return Null If Nothing Seat Available
  if (availableSeatsList.length === 0) {
    return null;
  }

  // Return The First Seat Number
  const firstAvailableSeat = await availableSeatsList[0]
    .locator(".MuiButton-label")
    .textContent();

  return firstAvailableSeat;
};

// ===== SEAT FUNCTION =====
// Select The First Available Seat And Then Click The 'ĐẶT VÉ' Button To Booking
const selectSeat = async (page: Page, bookingPage: BookingPage) => {
  // Step 1: Select The First Available Seat
  const firstSeat = await getFirstAvailableSeat(page);

  // VP: Check If At Least One Available Seat
  expect(firstSeat, "Không còn chỗ để đặt tại rạp").not.toBeNull();

  // Select The First Available Seat
  await bookingPage.clickButtonRole(firstSeat!);

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
  await bookingPage.equalExpect(
    () => commonModal.getMessageText(),
    "Bạn đã chọn ghế",
    notification.booking.error.noSeatSelection,
  );
};

// ===== USUAL BOOKING FUNCTION =====
// Movie Interface
interface Movie {
  maPhim: number;
  tenPhim: string;
}

// Select Movie Info
const selectMovieInfo = async (bookingPage: BookingPage) => {
  // Get Movie Name And ID From API
  const { maPhim: movieId, tenPhim: movieName } = (
    (await getMovieList()) as Movie[]
  )[4];

  // Get Movie Show Time From API
  const movieShowTimes = (await getMovieShowTimes(movieId)) as MovieShowTimes;
  const movieShowTime =
    movieShowTimes.heThongRapChieu?.[0]?.cumRapChieu?.[0]?.lichChieuPhim?.[0]
      ?.ngayChieuGioChieu;

  if (!movieShowTime) return;

  // Format Show Time To Cinema Time
  const cinemaShowTime = formatCinemaTime(movieShowTime);

  // Step 1: Select A Movie On Homepage
  await bookingPage.selectMovie(movieName);

  // Step 2: Scroll Down To The Show Time On Cinema
  await bookingPage.scrollToCinemaList();

  // Step 3: Select The Show Time
  await bookingPage.selectMovieShowTime(cinemaShowTime);
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
  await loginPage.loginWithUser(userInfo.USERNAME, userInfo.PASSWORD);

  // Step 5: Verify User Login Successfully
  // VP: Message 'Đăng nhập thành công' Displays
  await bookingPage.equalExpect(
    () => commonModal.getMessageText(),
    "Đăng nhập không thành công",
    notification.login.success,
  );
};

// ===== GUEST BOOKING FUNCTION =====
// Verify Booking As Guest
const verifyBookingAsGuest = async (
  page: Page,
  commonModal: CommonModal,
  bookingPage: BookingPage,
) => {
  // Step 1: Select The First Available Seat
  // Step 2: Click The 'ĐẶT VÉ' Button To Booking
  await selectSeat(page, bookingPage);

  // Step 3: Verify User Does Not Login
  // VP: Message 'Bạn chưa đăng nhập' Displays
  await bookingPage.equalExpect(
    () => commonModal.getMessageText(),
    "Bạn đã đăng nhập",
    notification.login.error,
  );
};
// ===== LOGGED IN BOOKING FUNCTION =====
// Verify Booking When Logging In Beforehand
const verifyBookingWhenLoggingInBeforehand = async (
  page: Page,
  commonModal: CommonModal,
  bookingPage: BookingPage,
) => {
  // Step 1: Select The First Available Seat
  // Step 2: Click The 'ĐẶT VÉ' Button To Booking
  await selectSeat(page, bookingPage);

  // Step 3: Verify User Booking Successfully
  // VP: Message 'Đặt vé thành công' Displays
  await bookingPage.equalExpect(
    () => commonModal.getMessageText(),
    "Đặt vé không thành công",
    notification.booking.success.booking,
  );
};

export {
  selectMovieFromSelectOption,
  selectMovieFromSelectOptionAsGuest,
  selectMovieFromSelectOptionWithLoggedIn,
  registerBeforeSelectingMovieFromSelectOption,
  selectCinemaPlaceAndShowtime,
  selectCinemaPlaceAndShowtimeAsGuest,
  selectCinemaPlaceAndShowtimeWithLoggedIn,
  registerBeforeSelectingCinemaPlaceAndShowtime,
  selectSeat,
  verifySeatNotSelected,
  selectMovieInfo,
  loginWhileBooking,
  verifyBookingAsGuest,
  verifyBookingWhenLoggingInBeforehand,
};
