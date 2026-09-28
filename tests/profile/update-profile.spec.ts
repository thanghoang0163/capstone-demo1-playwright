import { test, expect } from "~/fixtures/customFixtures";
import { pageVariables } from "~/constants/commonVariables";
import { loginOnBaseUrl } from "~/utils/commonActionHandlers";

// ===== BEFORE EACH =====
test.beforeEach(async ({ page, commonModal, homePage, loginPage }) => {
  // Login On Base URL Before Testing
  await loginOnBaseUrl(page, commonModal, homePage, loginPage);
});

// ===== TEST STEPS =====
test.describe("UPDATE PROFILE", async () => {
  test("Verify Update Profile Successfully", async ({
    commonModal,
    topNavigation,
    profilePage,
  }) => {
    // Step 1: Click Avatar Link To Go To Profile Page
    await topNavigation.navigateToProfilePage();

    // Step 2: Enter Username
    await profilePage.enterUsername();

    // Step 3: Enter Full Name
    await profilePage.enterFullname();

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

    // Step 9: Verify User Logs Out Successfully
    // VP: Message 'Cập nhật thành công' Displays
    const updateProfileMsg = await commonModal.getMessageText();
    expect(
      updateProfileMsg,
      "Cập nhật thông tin người dùng không thành công",
    ).toEqual(pageVariables.profile.notification.success.update);
  });
});
