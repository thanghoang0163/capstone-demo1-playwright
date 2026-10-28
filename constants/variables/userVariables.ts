import { requiredEnv } from "~/utils/envHandlers";

// ===== DEFINE USER VARIABLES =====
export const userVariables = {
  usernameTest: requiredEnv("USERNAME_TEST"),
  passwordTest: requiredEnv("PASSWORD_TEST"),
  fullNameTest: requiredEnv("FULL_NAME_TEST"),
  phoneNumberTest: requiredEnv("PHONE_NUMBER_TEST"),
  emailTest: requiredEnv("EMAIL_TEST"),
};
