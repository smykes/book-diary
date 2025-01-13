const MONTH_DATA = [
  {
    monthName: "January",
    isLeapYearMonth: false,
    dayCount: 31,
  },
  {
    monthName: "February",
    isLeapYearMonth: true,
    dayCount: 28,
  },
  {
    monthName: "March",
    isLeapYearMonth: false,
    dayCount: 31,
  },
  {
    monthName: "April",
    isLeapYearMonth: false,
    dayCount: 30,
  },
  {
    monthName: "May",
    isLeapYearMonth: false,
    dayCount: 31,
  },
  {
    monthName: "June",
    isLeapYearMonth: false,
    dayCount: 30,
  },
  {
    monthName: "July",
    isLeapYearMonth: false,
    dayCount: 31,
  },
  {
    monthName: "August",
    isLeapYearMonth: false,
    dayCount: 31,
  },
  {
    monthName: "September",
    isLeapYearMonth: false,
    dayCount: 30,
  },
  {
    monthName: "October",
    isLeapYearMonth: false,
    dayCount: 31,
  },
  {
    monthName: "November",
    isLeapYearMonth: false,
    dayCount: 30,
  },
  {
    monthName: "December",
    isLeapYearMonth: false,
    dayCount: 31,
  },
];

const BOOK_RATINGS = [1, 2, 3, 4, 5];
const ENDPOINT = {
  BACKEND_API: import.meta.env.VITE_APP_BACKEND_API,
};
export { MONTH_DATA, BOOK_RATINGS, ENDPOINT };
