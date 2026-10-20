import { requiredEnv } from "~/utils/envHandlers";

// ===== DEFINE CINEMA VARIABLES =====
export const cinemaVariables = {
  nameTest: requiredEnv("CINEMA_TEST"),
  placeTest: requiredEnv("CINEMA_PLACE_TEST"),
  showTimeTest: requiredEnv("CINEMA_SHOWTIME"),
};
