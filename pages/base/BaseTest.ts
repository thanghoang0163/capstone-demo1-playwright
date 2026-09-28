import { test } from "~/fixtures/customFixtures";

export const setupTestHooks = () => {
  // ===== BEFORE ALL =====
  test.beforeAll(async () => {
    console.log("=== BEFORE ALL ===");

    // Setup dùng chung
    // Ví dụ:
    // create test account
    // prepare database
    // setup environment
  });

  // ===== AFTER ALL =====
  test.afterAll(async () => {
    console.log("=== AFTER ALL ===");

    // Cleanup dùng chung
    // delete test account
    // cleanup data
  });
};
