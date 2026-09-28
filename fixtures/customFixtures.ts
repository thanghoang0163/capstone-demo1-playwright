import { test as base } from "@playwright/test";
import { LoadingScreen } from "~/components/LoadingScreen";
import { CommonModal } from "~/pages/modals/CommonModal";
import { TopNavigation } from "~/components/TopNavigation";
import { HomePage } from "~/pages/main/home/HomePage";
import { RegisterPage } from "~/pages/main/RegisterPage";
import { LoginPage } from "~/pages/main/LoginPage";
import { ProfilePage } from "~/pages/main/ProfilePage";
import { InputField } from "~/components/inputField";
import { BookingPage } from "~/pages/main/BookingPage";

type MyFixtures = {
  loadingScreen: LoadingScreen;
  commonModal: CommonModal;
  topNavigation: TopNavigation;
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  bookingPage: BookingPage;
  profilePage: ProfilePage;
  inputField: InputField;
};

// ===== DEFINE TEST FUNCTION =====
export const test = base.extend<MyFixtures>({
  // ===== COMPONENTS =====
  // Top Navigation
  topNavigation: async ({ page }, use) => {
    const topNavigation = new TopNavigation(page);
    await use(topNavigation);
  },

  // Common Modal
  commonModal: async ({ page }, use) => {
    const commonModal = new CommonModal(page);
    await use(commonModal);
  },

  // Loading Screen
  loadingScreen: async ({ page }, use) => {
    const loadingScreen = new LoadingScreen(page);
    await use(loadingScreen);
  },

  // Input Field
  inputField: async ({ page }, use) => {
    const inputField = new InputField(page);
    await use(inputField);
  },

  // ===== PAGES =====
  // Home Page
  homePage: async ({ page }, use) => {
    // Set up the fixture
    const homePage = new HomePage(page);

    // Use the fixture value in the test
    await use(homePage);
  },

  // Login Page
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  // Register Page
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);

    await use(registerPage);
  },

  // Booking Page
  bookingPage: async ({ page }, use) => {
    const bookingPage = new BookingPage(page);

    await use(bookingPage);
  },

  // Profile Page
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);

    await use(profilePage);
  },
});

export { expect } from "@playwright/test";
