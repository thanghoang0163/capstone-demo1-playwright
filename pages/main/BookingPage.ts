import { Page } from "@playwright/test";
import { pageVariables, generalVariables } from "~/constants/commonVariables";
import { getFirstAvailableSeatNumber } from "~/utils/bookingHandlers";
import { CommonPage } from "~/pages/base/CommonPage";

export class BookingPage extends CommonPage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    // Cinema Info
    cinema: pageVariables.booking.cinema,

    // Movie Info
    movie: pageVariables.booking.movie,

    // Button
    button: {
      ...pageVariables.booking.button,
      accept: generalVariables.button.accept,
      cancel: generalVariables.button.no,
    },

    // Select Option On Homepage
    selectOption: pageVariables.booking.selectOption,
  };

  private accessibleVars = BookingPage.accessibleVariables;

  constructor(page: Page) {
    super(page);
  }

  // ===== CLICK FUNCTION =====
  // Select A Movie On Homepage
  public async selectMovie(): Promise<void> {
    await this.clickHrefFilter(this.accessibleVars.movie.name);
  }

  // Scroll Down To The Show Time On Cinema
  public async scrollToCinemaList(): Promise<void> {
    await this.clickByText(this.accessibleVars.button.scrollToCinemaList);
  }

  // Select The Show Time
  public async selectShowTime(): Promise<void> {
    await this.clickByText(this.accessibleVars.movie.showTime);
  }

  // Get The First Available Seat
  public async getFirstAvailableSeat(page: Page): Promise<string | null> {
    return await getFirstAvailableSeatNumber(page);
  }

  // Click The 'ĐẶT VÉ' Button To Booking
  public async clickToBookingTicket(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.button.bookingTicket);
  }

  // Click The 'Đồng ý' Button To Log In
  public async clickToLogIn(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.button.accept);
  }

  // Click The 'Không' Button To Log In
  public async clickToCancelLogIn(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.button.cancel);
  }

  // Click The 'MUA VÉ NGAY' Button From "Select Option' Component On Homepage
  public async clickToBookingNow(): Promise<void> {
    await this.clickButtonRole(this.accessibleVars.button.bookingNow);
  }

  // Click To Select Cinema On Homepage
  public async selectCinema(): Promise<void> {
    await this.clickTabRole(this.accessibleVars.cinema.name);
  }

  // Click To Select Cinema Place On Homepage
  public async selectCinemaPlace(): Promise<void> {
    await this.clickTabRole(this.accessibleVars.cinema.place);
  }

  // Click To Select Cinema Showtime On Homepage
  public async selectCinemaShowtime(): Promise<void> {
    await this.clickLinkRoleWithoutExact(this.accessibleVars.cinema.showTime);
  }

  // ===== SELECT OPTION FUNCTION =====
  // Select A Movie From 'Select Option' Component On Homepage
  public async selectMovieOption(): Promise<void> {
    await this.selectOption(
      this.accessibleVars.selectOption.movie.label,
      this.accessibleVars.selectOption.movie.option,
    );
  }

  // Select Cinema From 'Select Option' Component On Homepage
  public async selectCinemaOption(): Promise<void> {
    await this.selectOption(
      this.accessibleVars.selectOption.cinema.label,
      this.accessibleVars.selectOption.cinema.option,
    );
  }

  // Select Show Time From 'Select Option' Component On Homepage
  public async selectShowTimeOption(): Promise<void> {
    await this.selectOption(
      this.accessibleVars.selectOption.showTime.label,
      this.accessibleVars.selectOption.showTime.option,
    );
  }
}
