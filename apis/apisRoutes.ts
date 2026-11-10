import { routeVariables } from "~/constants/variables/routeVariables";

// ===== BASE URL =====
const API_BASE_URL = routeVariables.APIUrl;
const GROUP_CODE = "GP09";

// ===== SERVICE PATHS =====
const SERVICE_PATHS = {
  cinemas: "QuanLyRap",
  movies: "QuanLyPhim",
  booking: "QuanLyDatVe",
  users: "QuanLyNguoiDung",
} as const;

// ===== ACTIONS =====
const ACTIONS = {
  cinema: {
    system: {
      info: "LayThongTinHeThongRap",
      schedule: "LayThongTinLichChieuHeThongRap",
    },
    branch: {
      info: "LayThongTinCumRapTheoHeThong",
    },
    movie: {
      showTimes: "LayThongTinLichChieuPhim",
    },
  },
  movie: {
    list: "LayDanhSachPhim",
    info: "LayThongTinPhim",
  },
  user: {
    login: "DangNhap",
    register: "DangKy",
  },
  booking: {
    list: "LayDanhSachPhongVe",
  },
} as const;

// ===== QUERY PARAMETERS =====
const QUERY_PARAMS = {
  groupCode: "maNhom",
  showTimeId: "maLichChieu",
  cinemaId: "maHeThongRap",
  movieId: "maPhim",
  movieName: "tenPhim",
} as const;

// ===== ENDPOINTS =====
// Cinema
const CINEMA_URL = API_BASE_URL + SERVICE_PATHS.cinemas;

const CINEMA_ENDPOINTS = {
  list: `${CINEMA_URL}/${ACTIONS.cinema.system.info}`,
  schedule: (cinemaId: string) =>
    `${CINEMA_URL}/${ACTIONS.cinema.system.schedule}?${QUERY_PARAMS.cinemaId}=${cinemaId}&${QUERY_PARAMS.groupCode}=${GROUP_CODE}`,
  branchInfo: (cinemaId: string) =>
    `${CINEMA_URL}/${ACTIONS.cinema.branch.info}?${QUERY_PARAMS.cinemaId}=${cinemaId}`,
  movieShowTimes: (movieId: number) =>
    `${CINEMA_URL}/${ACTIONS.cinema.movie.showTimes}?${QUERY_PARAMS.movieId}=${movieId}`,
} as const;

// Movie
const MOVIE_URL = API_BASE_URL + SERVICE_PATHS.movies;

const MOVIE_ENDPOINTS = {
  list: `${MOVIE_URL}/${ACTIONS.movie.list}?${QUERY_PARAMS.groupCode}=${GROUP_CODE}`,
  info: (movieId: number) =>
    `${MOVIE_URL}/${ACTIONS.movie.info}?${QUERY_PARAMS.movieId}=${movieId}`,
} as const;

// Booking
const BOOKING_URL = API_BASE_URL + SERVICE_PATHS.booking;

const BOOKING_ENDPOINTS = {
  seatInfo: (showTimeId: number) =>
    `${BOOKING_URL}/${ACTIONS.booking.list}?${QUERY_PARAMS.showTimeId}=${showTimeId}`,
} as const;

// User
const USER_URL = API_BASE_URL + SERVICE_PATHS.users;

const USER_ENDPOINTS = {
  login: `${USER_URL}/${ACTIONS.user.login}`,
  register: `${USER_URL}/${ACTIONS.user.register}`,
} as const;

export { CINEMA_ENDPOINTS, MOVIE_ENDPOINTS, BOOKING_ENDPOINTS, USER_ENDPOINTS };
