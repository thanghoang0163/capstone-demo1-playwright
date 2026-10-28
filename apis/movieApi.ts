import { routeVariables } from "~/constants/variables/routeVariables";
import { fetchApi } from "~/utils/apiHandlers";

const groupCode = "GP09";
const movieAPIPath = `QuanLyPhim/LayDanhSachPhim?maNhom=${groupCode}`;

const movieEndpoint = routeVariables.APIUrl + movieAPIPath;

// ===== MOVIE API =====
export const getMovieList = async () => {
  return await fetchApi(movieEndpoint, {
    method: "GET",
  });
};
