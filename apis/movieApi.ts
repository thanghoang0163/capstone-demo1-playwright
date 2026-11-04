import { MOVIE_ENDPOINTS } from "~/apis/apisRoutes";
import { getApi } from "~/utils/apiHandlers";

// ===== API =====
// Movie List
export const getMovieList = async () => {
  return await getApi(MOVIE_ENDPOINTS.list);
};

// Movie Detail
export const getMovieInfo = async (movieId: number) => {
  return await getApi(MOVIE_ENDPOINTS.info(movieId));
};
