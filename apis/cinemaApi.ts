import { routeVariables } from "~/constants/variables/routeVariables";
import { fetchApi } from "~/utils/apiHandlers";

const cinemaAPIPath = "QuanLyRap/LayThongTinHeThongRap";

const cinemaEndpoint = routeVariables.APIUrl + cinemaAPIPath;

// ===== CINEMA API =====
export const getCinemaList = async () => {
  return await fetchApi(cinemaEndpoint, {
    method: "GET",
  });
};
