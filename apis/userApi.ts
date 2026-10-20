import { APIRequestContext } from "@playwright/test";
import { routeVariables } from "~/constants/variables/routeVariables";
import { fetchApi } from "~/utils/apiHandlers";

const userAPIPath = "QuanLyNguoiDung/DangNhap";

const userEndpoint = routeVariables.APIUrl + userAPIPath;

interface UserRegisterRequest {
  confirmPassword: string;
  email: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  matKhau: string;
  taiKhoan: string;
}

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
    userEndpoint,
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
    userEndpoint,
    {
      method: "POST",
      data: body,
    },
    request,
  );
};
