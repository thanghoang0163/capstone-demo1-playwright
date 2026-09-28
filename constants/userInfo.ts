import {
  generateUsername,
  generateFullName,
  generatePassword,
  generatePhoneNumber,
} from "~/utils/userHandlers";

// ===== DEFINE USER INFO =====
const USERNAME = generateUsername();
const PASSWORD = generatePassword();
const FULL_NAME = generateFullName();
const EMAIL = `${USERNAME}@gmail.com`;
const PHONE_NUMBER = generatePhoneNumber();

export { USERNAME, PASSWORD, FULL_NAME, EMAIL, PHONE_NUMBER };
