import { Locator, Page } from "@playwright/test";

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
    options?: { timeout?: number | undefined } | undefined,
  ) {
    // handle customParam ....
    await this.resolveLocator(locator).click(options);
    // handle ...
  }

  // Click Href Filter
  public async clickHrefFilter(hasText?: string | RegExp) {
    return await this.filter("a", hasText).click();
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
    options?: { timeout?: number | undefined } | undefined,
  ) {
    await this.resolveLocator(locator).fill(value, options);
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
}
