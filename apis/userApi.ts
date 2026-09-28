import { APIRequestContext } from "@playwright/test";
import { envVariables } from "~/constants/envVariables";

const userAPIPath = "api/QuanLyNguoiDung/DangNhap";

const userEndpoint = envVariables.routes.userApiUrl + userAPIPath;

interface UserLoginRequest {
  taiKhoan: string;
  matKhau: string;
}

// ===== LOGIN API =====
export const loginRequest = async (
  request: APIRequestContext,
  body: UserLoginRequest,
) => {
  const res = await request.post(userEndpoint, {
    data: body,
  });

  if (!res.ok()) {
    const errorText = await res.text();
    throw new Error(
      `Failed to login user: ${res.status()} ${res.statusText()}. Response: ${errorText}`,
    );
  }

  const data = await res.json();
  return data;
};
