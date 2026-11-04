import { BOOKING_ENDPOINTS } from "~/apis/apisRoutes";
import { getApi } from "~/utils/apiHandlers";

// ===== API =====
// Seat List
export const getSeatList = async (showtimeId: number) => {
  return await getApi(BOOKING_ENDPOINTS.seatInfo(showtimeId));
};
