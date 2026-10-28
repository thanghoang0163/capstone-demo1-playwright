import { Locator, Page, expect } from "@playwright/test";
import { timeout } from "~/constants/timeoutConstant";

type PlaywrightLocator = string | Locator;

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ===== RESOLVE LOCATOR =====
  private resolveLocator(locator: PlaywrightLocator): Locator {
    return typeof locator === "string" ? this.page.locator(locator) : locator;
  }

  // ===== CLICK FUNCTION =====
  // Click By Role
  public async clickByRole(
    role: Parameters<Page["getByRole"]>[0],
    name: string | RegExp = "",
    exact?: boolean,
  ) {
    await this.page.getByRole(role, { name, exact }).click();
  }

  // Click Link Role
  public async clickLinkRole(name: string, exact = true) {
    await this.clickByRole("link", name, exact);
  }

  // Click Link Role Without Exact
  public async clickLinkRoleWithoutExact(name: string) {
    await this.clickByRole("link", name);
  }

  // Click Textbox Role
  public async clickTextboxRole(name: string, exact = true) {
    await this.clickByRole("textbox", name, exact);
  }

  // Click Button Role
  public async clickButtonRole(name: string, exact = true) {
    await this.clickByRole("button", name, exact);
  }

  // Click Tab Role
  public async clickTabRole(name: string) {
    await this.clickByRole("tab", name);
  }

  // Click Function
  public async click(
    locator: PlaywrightLocator,
    options?: { timeout?: number },
  ) {
    // handle customParam ....
    await this.resolveLocator(locator).click({
      timeout: timeout.DEFAULT,
      ...options,
    });
    // handle ...
  }

  // Click Href Filter
  public async clickHrefFilter(hasText?: string | RegExp) {
    await this.filter("a", hasText).click();
  }

  // Click By Text
  public async clickByText(locator: string) {
    await this.page.getByText(locator).click();
  }

  // ===== FILTER FUNCTION =====
  public filter(locator: PlaywrightLocator, hasText?: string | RegExp) {
    return this.resolveLocator(locator).filter({ hasText });
  }

  // ===== FILL FUNCTION =====
  public async fill(
    locator: PlaywrightLocator,
    value: string,
    options?: { timeout?: number },
  ) {
    await this.resolveLocator(locator).fill(value, {
      timeout: timeout.DEFAULT,
      ...options,
    });
  }

  // ===== SELECT OPTION FUNCTION =====
  // Select Option Dropdown
  public async selectOption(locator: string, value: string): Promise<void> {
    await this.page.locator(`select[name=${locator}]`).selectOption(value);
  }

  // ===== GET MESSAGE TEXT FUNCTION =====
  // Get Message Text
  public async getMessageText(locator: string): Promise<string | null> {
    return await this.page.locator(locator).textContent();
  }

  // Get Message Text By Alert Role
  public async getMessageTextByAlertRole(): Promise<string | null> {
    return await this.page.getByRole("alert").textContent();
  }

  // ===== EXPECT FUNCTION =====
  // Equal Expectation
  public async equalExpect(
    getActual: () => Promise<string | null>,
    message: string,
    expected: string,
    waitTimeout: number = timeout.SHORT,
  ): Promise<void> {
    await expect
      .poll(getActual, { message, timeout: waitTimeout })
      .toEqual(expected);
  }

  // To Be Visible Expectation
  public async toBeVisibleExpect(
    actual: Locator,
    messageOrOptions: string | { message?: string } | undefined,
    option?: {
      timeout?: number;
    },
  ): Promise<void> {
    await expect(actual, messageOrOptions).toBeVisible({
      timeout: timeout.LONG,
      ...option,
    });
  }

  // To Have URL Expectation
  public async toHaveUrlExpect(
    actual: Page,
    messageOrOptions: string | { message?: string } | undefined,
    urlExpected: string,
    option?: {
      timeout?: number;
    },
  ): Promise<void> {
    await expect(actual, messageOrOptions).toHaveURL(urlExpected, {
      timeout: timeout.DEFAULT,
      ...option,
    });
  }

  // To Be In Viewport Expectation
  public async toBeInViewportExpect(
    actual: Locator,
    messageOrOptions: string | { message?: string } | undefined,
    option?: {
      timeout?: number;
    },
  ): Promise<void> {
    await expect(actual, messageOrOptions).toBeInViewport({
      timeout: timeout.SHORT,
      ...option,
    });
  }
}
