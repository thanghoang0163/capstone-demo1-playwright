import { APIRequestContext } from "@playwright/test";
import { USER_ENDPOINTS } from "~/apis/apisRoutes";
import { postApi } from "~/utils/apiHandlers";

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

// ===== API =====
// Register
export const registerRequest = async (
  body: UserRegisterRequest,
  request: APIRequestContext,
) => {
  return await postApi(USER_ENDPOINTS.register, body, {}, request);
};

// Login
export const loginRequest = async (
  body: UserLoginRequest,
  request: APIRequestContext,
) => {
  return await postApi(USER_ENDPOINTS.login, body, {}, request);
};
