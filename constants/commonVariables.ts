import { envVariables } from "./envVariables";
import { USERNAME, PASSWORD, FULL_NAME, EMAIL } from "~/constants/userInfo";

// ===== COMPONENT VARIABLES =====
const componentVariables = {
  // Top Navigation Bar
  topNavigation: {
    login: "Đăng Nhập",
    register: "Đăng Ký",
    showTimes: {
      id: "#lichChieu",
      title: "Lịch Chiếu",
    },
    cinemas: {
      id: "#cumRap",
      title: "Cụm Rạp",
    },
    news: {
      id: "#tinTuc",
      title: "Tin Tức",
    },
    app: {
      id: "#ungDung",
      title: "Ứng Dụng",
    },
    profile: `Avatar ${envVariables.user.fullNameTest}`,
  },
  // Modal
  modal: {
    bigTitle: "#swal2-title",
  },
  // Loading
  loading: {
    class: "//div[@class='jss77']",
  },
  // Section On Homepage
  home: {
    app: {
      link: "https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197",
      button: "App miễn phí - Tải về ngay!",
    },
    news: {
      tabBar: {
        cinema24h: "Điện Ảnh 24h",
        review: "review",
        promotion: "Khuyến mãi",
      },
      poster: {
        cinema24h: {
          id: "#simple-tabpanel-0",
          title: "Diễn viên đặc biệt của Bằng Chứng Vô Hình",
          link: "https://tix.vn/goc-dien-anh/7939-dien-vien-dac-biet-cua-bang-chung-vo-hinh",
        },
        review: {
          id: "#simple-tabpanel-1",
          title:
            "[Review] Onward - Khi phép thuật mạnh mẽ nhất chính là tình thân",
          link: "https://tix.vn/review/7871-review-onward-khi-phep-thuat-manh-me-nhat-chinh-la-tinh-than",
        },
        promotion: {
          id: "#simple-tabpanel-2",
          title: "Sinh Nhật Mega GS",
          link: "https://tix.vn/khuyen-mai/7774-sinh-nhat-mega-gs",
        },
      },
      button: {
        viewMore: "XEM THÊM",
        collapse: "RÚT GỌN",
      },
    },
  },
  // Input Field
  inputField: {
    message: {
      username: "#taiKhoan-helper-text",
      password: "#matKhau-helper-text",
      confirmPassword: "#confirmPassWord-helper-text",
      fullName: "#hoTen-helper-text",
      email: "#email-helper-text",
      phoneNumber: "#soDt-helper-text",
    },
    notification: {
      error: {
        empty: "Đây là trường bắt buộc !",
        login: {
          incorrect: "Tài khoản hoặc mật khẩu không đúng!",
          password: {
            lessThanRequiredCharacters: "Mật khẩu phải có ít nhất 6 kí tự !",
          },
        },
        register: {
          username: {
            existed: "Tài khoản đã tồn tại!",
            containLettersOrNumbers: "Tên tài khoản chỉ chứa chữ cái hoặc số !",
          },
          password: {
            lessThanRequiredCharacters: "Mật khẩu phải có ít nhất 6 kí tự !",
          },
          confirmPassword: {
            notMatch: "Mật khẩu không khớp !",
          },
          fullname: {
            containSpecialChar: "Họ và tên không chứa ký tự đặc biệt !",
            containNumber: "Họ và tên không chứa số !",
          },
          email: {
            existed: "Email đã tồn tại!",
            invalidFormat: "Email không đúng định dạng !",
          },
        },
        phoneNumber: {
          empty: "Vui lòng nhập số điện thoại",
        },
      },
    },
  },
};

// ===== PAGE VARIABLES =====
const pageVariables = {
  // Login
  login: {
    username: {
      id: "#taiKhoan",
      value: envVariables.user.usernameTest,
    },
    password: {
      id: "#matKhau",
      value: envVariables.user.passwordTest,
    },
    button: "Đăng nhập",
    notification: {
      success: "Đăng nhập thành công",

      error: "Bạn chưa đăng nhập",
    },
  },
  // Register
  register: {
    username: {
      id: "#taiKhoan",
      value: USERNAME,
    },
    password: {
      id: "#matKhau",
      value: PASSWORD,
    },
    confirmPassword: {
      id: "#confirmPassWord",
      value: PASSWORD,
    },
    fullName: {
      id: "#hoTen",
      value: FULL_NAME,
    },
    email: {
      id: "#email",
      value: EMAIL,
    },
    button: "Đăng ký",
    notification: {
      success: "Đăng ký thành công",
    },
  },
  // Logout
  logout: {
    button: "Đăng xuất",
    confirmPopup: "Bạn có muốn đăng xuất ?",
    successPopup: "Đã đăng xuất",
  },
  // Booking
  booking: {
    cinema: {
      name: envVariables.booking.cinema.nameTest,
      place: envVariables.booking.cinema.placeTest,
      showTime: envVariables.booking.cinema.showTimeTest,
    },
    movie: {
      name: envVariables.booking.movie.nameTest,
      showTime: envVariables.booking.movie.showTimeTest,
    },
    selectOption: {
      movie: {
        label: "film",
        option: envVariables.booking.selectionOption.movieOptionTest,
      },
      cinema: {
        label: "cinema",
        option: envVariables.booking.selectionOption.cinemaOptionTest,
      },
      showTime: {
        label: "date",
        option: envVariables.booking.selectionOption.showTimeOptionTest,
      },
    },
    button: {
      bookingNow: "MUA VÉ NGAY",
      scrollToCinemaList: "Mua vé",
      bookingTicket: "ĐẶT VÉ",
    },
    notification: {
      success: {
        booking: "Đặt vé thành công",
      },
      error: {
        noSeatSelection: "Bạn chưa chọn ghế",
      },
    },
    history: {
      title: "Lịch sử đặt vé",
    },
  },
  // Profile
  profile: {
    username: {
      id: "#taiKhoan",
      value: envVariables.profile.update.usernameTest,
    },
    fullName: {
      id: "#hoTen",
      value: envVariables.profile.update.fullNameTest,
    },
    phoneNumber: {
      id: "#soDt",
      value: envVariables.profile.update.phoneNumberTest,
    },
    password: {
      id: "#matKhau",
      value: envVariables.profile.update.passwordTest,
    },
    email: {
      id: "#email",
      value: envVariables.profile.update.emailTest,
    },
    role: {
      id: "maLoaiNguoiDung",
      value: {
        admin: envVariables.user.role.admin,
        customer: envVariables.user.role.customer,
      },
    },
    button: "Cập Nhật",
    notification: {
      success: {
        update: "Cập nhật thành công",
      },
    },
  },
};

// ===== GENERAL VARIABLES =====
const generalVariables = {
  // Button
  button: {
    accept: "Đồng ý",
    cancel: "Hủy",
    ok: "OK",
    no: "Không",
    close: "Đóng",
  },
};

export { componentVariables, pageVariables, generalVariables };
