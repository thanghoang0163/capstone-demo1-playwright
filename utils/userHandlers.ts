import { randomUUID } from "crypto";
import { fakerVI } from "@faker-js/faker";

// ===== GENERATION FUNCTION =====
// Generate Username
const generateUsername = (): string =>
  `user_${randomUUID().replace(/-/g, "").substring(0, 12)}`;

// Generate Password
const generatePassword = (length = 6): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
};

// Generate Full Name
const generateFullName = (): string => fakerVI.person.fullName();

// Generate Phone Number
const generatePhoneNumber = (): string => fakerVI.phone.number();

export {
  generateUsername,
  generatePassword,
  generateFullName,
  generatePhoneNumber,
};
