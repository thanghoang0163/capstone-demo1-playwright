import { requiredEnv } from "~/utils/envHandlers";

// ===== DEFINE USER VARIABLES =====
export const userVariables = {
  groupCode: requiredEnv("GROUP_CODE"),
  usernameTest: requiredEnv("USERNAME_TEST"),
  passwordTest: requiredEnv("PASSWORD_TEST"),
  fullNameTest: requiredEnv("FULL_NAME_TEST"),
  phoneNumberTest: requiredEnv("PHONE_NUMBER_TEST"),
  emailTest: requiredEnv("EMAIL_TEST"),
  role: {
    admin: requiredEnv("ADMIN_ROLE"),
    customer: requiredEnv("CUSTOMER_ROLE"),
  },
};
