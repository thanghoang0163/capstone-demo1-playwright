import { routeVariables } from "~/constants/variables/routeVariables";
import { userVariables } from "~/constants/variables/userVariables";
import { fetchApi } from "~/utils/apiHandlers";

const groupCode = userVariables.groupCode;
const movieAPIPath = `QuanLyPhim/LayDanhSachPhim?maNhom=${groupCode}`;

const movieEndpoint = routeVariables.APIUrl + movieAPIPath;

// ===== MOVIE API =====
export const getMovieList = async () => {
  return await fetchApi(movieEndpoint, {
    method: "GET",
  });
};
