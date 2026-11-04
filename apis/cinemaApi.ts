import { CINEMA_ENDPOINTS } from "~/apis/apisRoutes";
import { getApi } from "~/utils/apiHandlers";

// ===== API =====
// Cinema System List
export const getCinemaList = async () => {
  return await getApi(CINEMA_ENDPOINTS.list);
};

// Cinema System Showtimes
export const getCinemaSchedule = async (cinemaId: string) => {
  return await getApi(CINEMA_ENDPOINTS.schedule(cinemaId));
};

// Cinema Branches by System
export const getCinemaBranchInfo = async (cinemaId: string) => {
  return await getApi(CINEMA_ENDPOINTS.branchInfo(cinemaId));
};

// Showtimes Of A Movie
export const getMovieShowTimes = async (movieId: number) => {
  return await getApi(CINEMA_ENDPOINTS.movieShowTimes(movieId));
};
