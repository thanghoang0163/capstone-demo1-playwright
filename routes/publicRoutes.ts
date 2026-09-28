import { envVariables } from "~/constants/envVariables";

// ===== DEFINE BASE URL =====
const BASE_URL = envVariables.routes.baseUrl;

// ===== DEFINE PUBLIC ROUTES =====
const publicRoutes = {
  home: "/",
  login: "sign-in",
  register: "sign-up",
  movie: "detail/",
  showtime: "show-time/",
};

// ===== DEFINE PRIVATE ROUTES =====
const privateRoutes = {
  profile: "account",
};

export { BASE_URL, publicRoutes, privateRoutes };
