import { requiredEnv } from "~/utils/envHandlers";

// ===== DEFINE ENVIRONMENT VARIABLES =====
export const envVariables = {
  // Routes
  routes: {
    baseUrl: requiredEnv("BASE_URL"),
    userApiUrl: requiredEnv("USER_API_URL"),
  },
  // User Info
  user: {
    groupCode: requiredEnv("GROUP_CODE"),
    usernameTest: requiredEnv("USERNAME_TEST"),
    passwordTest: requiredEnv("PASSWORD_TEST"),
    fullNameTest: requiredEnv("FULL_NAME_TEST"),
    phoneNumberTest: requiredEnv("PHONE_NUMBER_TEST"),
    emailTest: requiredEnv("EMAIL_TEST"),
    role: {
      admin: requiredEnv("ADMIN_ROLE"),
      customer: requiredEnv("CUSTOMER_ROLE"),
    },
  },
  // Profile
  profile: {
    update: {
      usernameTest: requiredEnv("NEW_USERNAME_TEST"),
      passwordTest: requiredEnv("NEW_PASSWORD_TEST"),
      fullNameTest: requiredEnv("NEW_FULL_NAME_TEST"),
      phoneNumberTest: requiredEnv("NEW_PHONE_NUMBER_TEST"),
      emailTest: requiredEnv("NEW_EMAIL_TEST"),
    },
  },
  // Booking
  booking: {
    movie: {
      nameTest: requiredEnv("MOVIE_TEST"),
      showTimeTest: requiredEnv("SHOWTIME_TEST"),
    },
    selectionOption: {
      movieOptionTest: requiredEnv("MOVIE_OPTION_TEST"),
      cinemaOptionTest: requiredEnv("CINEMA_OPTION_TEST"),
      showTimeOptionTest: requiredEnv("SHOWTIME_OPTION_TEST"),
    },
    cinema: {
      nameTest: requiredEnv("CINEMA_TEST"),
      placeTest: requiredEnv("CINEMA_PLACE_TEST"),
      showTimeTest: requiredEnv("CINEMA_SHOWTIME"),
    },
  },
};
