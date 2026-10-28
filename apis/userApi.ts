import { APIRequestContext } from "@playwright/test";
import { routeVariables } from "~/constants/variables/routeVariables";
import { fetchApi } from "~/utils/apiHandlers";

// ===== ENDPOINTS =====
// Login Endpoint
const loginEndpoint = routeVariables.APIUrl + "QuanLyNguoiDung/DangNhap";

// Register Endpoint
const registerEndpoint = routeVariables.APIUrl + "QuanLyNguoiDung/DangKy";

// ===== INTERFACES =====
// User Register Request Interface
interface UserRegisterRequest {
  confirmPassword: string;
  email: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  matKhau: string;
  taiKhoan: string;
}

// User Login Request Interface
interface UserLoginRequest {
  taiKhoan: string;
  matKhau: string;
}

// ===== REGISTER API =====
export const registerRequest = async (
  body: UserRegisterRequest,
  request: APIRequestContext,
) => {
  return await fetchApi(
    registerEndpoint,
    {
      method: "POST",
      data: body,
    },
    request,
  );
};

// ===== LOGIN API =====
export const loginRequest = async (
  body: UserLoginRequest,
  request: APIRequestContext,
) => {
  return await fetchApi(
    loginEndpoint,
    {
      method: "POST",
      data: body,
    },
    request,
  );
};
