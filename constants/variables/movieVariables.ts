import { requiredEnv } from "~/utils/envHandlers";

// ===== DEFINE MOVIE VARIABLES =====
export const movieVariables = {
  // Movie
  movie: {
    nameTest: requiredEnv("MOVIE_TEST"),
    showTimeTest: requiredEnv("SHOWTIME_TEST"),
  },
  // Selection Option
  selectionOption: {
    movieOptionTest: requiredEnv("MOVIE_OPTION_TEST"),
    cinemaOptionTest: requiredEnv("CINEMA_OPTION_TEST"),
    showTimeOptionTest: requiredEnv("SHOWTIME_OPTION_TEST"),
  },
};
