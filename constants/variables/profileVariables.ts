import { requiredEnv } from "~/utils/envHandlers";

// ===== DEFINE PROFILE VARIABLES =====
export const profileVariables = {
  update: {
    usernameTest: requiredEnv("NEW_USERNAME_TEST"),
    passwordTest: requiredEnv("NEW_PASSWORD_TEST"),
    fullNameTest: requiredEnv("NEW_FULL_NAME_TEST"),
    phoneNumberTest: requiredEnv("NEW_PHONE_NUMBER_TEST"),
    emailTest: requiredEnv("NEW_EMAIL_TEST"),
  },
};
