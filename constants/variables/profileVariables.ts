import { requiredEnv } from "~/utils/envHandlers";

// ===== DEFINE PROFILE VARIABLES =====
export const profileVariables = {
  update: {
    usernameTest: requiredEnv("UPDATE_USERNAME_TEST"),
    passwordTest: requiredEnv("UPDATE_PASSWORD_TEST"),
    fullNameTest: requiredEnv("UPDATE_FULL_NAME_TEST"),
    phoneNumberTest: requiredEnv("UPDATE_PHONE_NUMBER_TEST"),
    emailTest: requiredEnv("UPDATE_EMAIL_TEST"),
  },
};
