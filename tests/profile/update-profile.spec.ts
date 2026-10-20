import { test, expect } from "~/fixtures/customFixtures";
import { loginWithNewUser, updateProfile } from "~/utils/commonHandlers";

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
    await loginWithNewUser(
      page,
      commonModal,
      loadingScreen,
      homePage,
      registerPage,
      loginPage,
    );
  },
);

// ===== TEST STEPS =====
test.describe("UPDATE PROFILE", async () => {
  test("Verify Update Profile Successfully", async ({
    commonModal,
    topNavigation,
    profilePage,
  }) => {
    // Step 1: Click Avatar Link To Go To Profile Page
    await updateProfile(topNavigation, profilePage);

    // Step 9: Verify User Logs Out Successfully
    // VP: Message 'Cập nhật thành công' Displays
    const updateProfileMsg = await commonModal.getMessageText();
    expect(
      updateProfileMsg,
      "Cập nhật thông tin người dùng không thành công",
    ).toEqual(notification.update);
  });
});
