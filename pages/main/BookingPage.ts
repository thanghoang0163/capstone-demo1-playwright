import { Page } from "@playwright/test";
import { generalVariables } from "~/constants/variables/generalVariables";
import { CommonPage } from "~/pages/base/CommonPage";

export class BookingPage extends CommonPage {
  // ===== DEFINE VARIABLES =====
  static readonly accessibleVariables = {
    // Select Option
    selectOption: {
      movie: {
        label: "film",
      },
      cinema: {
        label: "cinema",
      },
      showTime: {
        label: "date",
      },
    },
    // Button
    button: {
      bookingNow: "MUA VÉ NGAY",
      scrollToCinemaList: "Mua vé",
      bookingTicket: "ĐẶT VÉ",
      accept: generalVariables.button.accept,
      cancel: generalVariables.button.no,
    },
  };

  private accessibleVars = BookingPage.accessibleVariables;

  constructor(page: Page) {
    super(page);
  }

  // ===== CLICK FUNCTION =====
  // Select A Movie On Homepage
  public async selectMovie(movieName: string): Promise<void> {
    await this.clickHrefFilter(movieName);
  }

  // Scroll Down To The Show Time On Cinema
  public async scrollToCinemaList(): Promise<void> {
    await this.clickByText(this.accessibleVars.button.scrollToCinemaList);
  }

  // Select The Show Time
  public async selectMovieShowTime(movieShowTime: string): Promise<void> {
    await this.clickByText(movieShowTime);
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
  public async selectCinema(cinemaAlias: string): Promise<void> {
    await this.clickTabRole(cinemaAlias);
  }

  // Click To Select Cinema Place On Homepage
  public async selectCinemaPlace(cinemaPlace: string): Promise<void> {
    await this.clickTabRole(cinemaPlace);
  }

  // Click To Select Cinema Showtime On Homepage
  public async selectCinemaShowtime(cinemaShowTime: string): Promise<void> {
    await this.clickLinkRoleWithoutExact(cinemaShowTime);
  }

  // ===== SELECT OPTION FUNCTION =====
  // Select A Movie From 'Select Option' Component On Homepage
  public async selectMovieOption(movieId: string): Promise<void> {
    await this.selectOption(
      this.accessibleVars.selectOption.movie.label,
      movieId,
    );
  }

  // Select Cinema From 'Select Option' Component On Homepage
  public async selectCinemaOption(cinemaId: string): Promise<void> {
    await this.selectOption(
      this.accessibleVars.selectOption.cinema.label,
      cinemaId,
    );
  }

  // Select Show Time From 'Select Option' Component On Homepage
  public async selectShowTimeOption(showTimeId: string): Promise<void> {
    await this.selectOption(
      this.accessibleVars.selectOption.showTime.label,
      showTimeId,
    );
  }
}
