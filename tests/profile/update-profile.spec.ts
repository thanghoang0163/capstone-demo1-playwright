import { test } from "~/fixtures/customFixtures";
import { userInfo } from "~/constants/userConstant";
import { profileVariables } from "~/constants/variables/profileVariables";
import {
  loginWithNewUser,
  goToBaseUrl,
  loginOnBaseUrl,
} from "~/utils/commonHandlers";

// ===== VARIABLES =====
// Notification
const notification = {
  update: "Cập nhật thành công",
};

// ===== BEFORE EACH =====
test.beforeEach(
  async ({
    page,
    commonModal,
    loadingScreen,
    homePage,
    registerPage,
    loginPage,
  }) => {
    // Login With New User
    // await loginWithNewUser(
    //   page,
    //   commonModal,
    //   loadingScreen,
    //   homePage,
    //   registerPage,
    //   loginPage,
    // );

    // Go To Base Url
    await goToBaseUrl(page);

    // Go To Login Page
    await homePage.getTopNavigation().navigateToLoginPage();

    // Step 2: Enter Username Name
    // Step 3: Enter Password
    // Step 4: Click 'Đăng nhập' Button
    await loginPage.loginWithUser(
      profileVariables.update.usernameTest,
      profileVariables.update.passwordTest,
    );
  },
);

// ===== TEST STEPS =====
test.describe("UPDATE PROFILE", async () => {
  test("Verify Update Profile Successfully", async ({
    page,
    commonModal,
    topNavigation,
    profilePage,
  }) => {
    // Step 1: Click Avatar Link To Go To Profile Page
    // await topNavigation.navigateToProfilePage(userInfo.FULL_NAME);
    await topNavigation.navigateToProfilePage(
      profileVariables.update.usernameTest,
    );

    // Get The First Booking History
    const firstItem = page
      .locator(".MuiGrid-container.MuiGrid-spacing-xs-3")
      .nth(0);

    // Wait Until The First Booking History Is Visible
    await profilePage.toBeVisibleExpect(
      firstItem,
      "Không tìm thấy phần 'Cài đặt tài khoản'",
    );

    // Step 2: Enter Username
    await profilePage.enterUsername();

    // Step 3: Enter Full Name
    await profilePage.enterFullName();

    // Step 4: Enter Phone Number
    await profilePage.enterPhoneNumber();

    // Step 5: Enter Password
    await profilePage.enterPassword();

    // Step 6: Enter Email
    await profilePage.enterEmail();

    // Step 7: Select Admin Role
    await profilePage.selectAdminRole();

    // Step 8: Click The 'CẬP NHẬT' Button To Update Profile
    await profilePage.clickToUpdate();

    // Step 2: Verify User Logs Out Successfully
    // VP: Message 'Cập nhật thành công' Displays
    await profilePage.equalExpect(
      () => commonModal.getMessageText(),
      "Cập nhật thông tin người dùng không thành công",
      notification.update,
    );
  });
});
