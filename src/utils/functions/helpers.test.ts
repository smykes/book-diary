// import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
// import { bookMockDataA, bookMockDataB } from "./helpers.mock";
// import { getIsLeapYear, getPageCounts, getMonthYearLabel } from "./helpers";

import { formatNumberWithCommas, formatDate } from "./helpers";

const ipa = "is passed a";

describe("helper functions", () => {
  describe("fn: formatNumberWithCommas", () => {
    test(`When a whole numeber with 4 digits ${ipa} string with a comma after the first number is returned.`, () => {
      expect(formatNumberWithCommas(1000)).toEqual("1,000");
    });
    test(`When a two digit whole number ${ipa} two digit string is returned with no commas or decimals`, () => {
      expect(formatNumberWithCommas(12)).toEqual("12");
    });
    test(`When a number with two decimals under one hundred ${ipa} string with no commas two digits and a hundreths place is returned.`, () => {
      expect(formatNumberWithCommas(12.34)).toEqual("12.34");
    });
    test(`When a number in the billions ${ipa} string with three commas is returned.`, () => {
      expect(formatNumberWithCommas(1234456543)).toEqual("1,234,460,000");
    });
    test(`When a three digit number ${ipa} string with no commas is returned`, () => {
      expect(formatNumberWithCommas(140)).toEqual("140");
    });
  });

  describe("fn: formatDate", () => {
    test(`When no date is passed in a message saying that is passed out`, () => {
      expect(formatDate(null)).toEqual("No Date Recorded");
    });
    test(`When a yyyy/mm/dd string is passed in a MM/dd/YYYY is returned`, () => {
      expect(formatDate("2025/01/26")).toEqual("January 26, 2025");
    });
    // Should test the date object maybe?
    test(`When a yyyy/mm/ddd string is passed in invalid date is returned`, () => {
      expect(formatDate("2025/01/264")).toEqual("Invalid Date");
    });
  });
});

// describe("helper functions", () => {
//
//   /*--------------------------------*/
//   // describe("getPageCounts()", () => {
//   //   test("Check for number of pages regardless of read or not.", () => {
//   //     expect(getPageCounts(bookMockDataA)).toEqual(596);
//   //   });
//   //   test("Check for number or pages for only read books", () => {
//   //     expect(getPageCounts(filterBooksByRead(bookMockDataA))).toEqual(308);
//   //   });
//   // });
//   /*--------------------------------*/
//   // describe("filterBooksByRead", () => {
//   //   test("When data is filtered by read only one book is returned.", () => {
//   //     expect(filterBooksByRead(bookMockDataA)).toHaveLength(1);
//   //   });
//   //   test("When data is filtered by read only four book is returned.", () => {
//   //     expect(filterBooksByRead(bookMockDataB)).toHaveLength(2);
//   //   });
//   // });
//   /*--------------------------------*/
//   // describe("filterReadBooksByMonthAndYear()", () => {
//   //   test("When data is filtered just by month and date only one book is returned.", () => {
//   //     expect(
//   //       filterReadBooksByMonthAndYear(bookMockDataA, 12, 2020)
//   //     ).toHaveLength(1);
//   //   });
//   //   test("When data is filtered just by month and date no book is returned.", () => {
//   //     expect(
//   //       filterReadBooksByMonthAndYear(bookMockDataA, 4, 2020)
//   //     ).toHaveLength(0);
//   //   });
//   //   test("When data is filtered just by month one book is returned.", () => {
//   //     expect(
//   //       filterReadBooksByMonthAndYear(bookMockDataA, 12, null)
//   //     ).toHaveLength(1);
//   //   });
//   //   test("When data is filtered just by year one book is returned.", () => {
//   //     expect(
//   //       filterReadBooksByMonthAndYear(bookMockDataA, null, 2020)
//   //     ).toHaveLength(1);
//   //   });
//   // });
//   /*--------------------------------*/
//   // describe("filterReadBooksByUserRating()", () => {
//   //   test("When data is filtered by rating of 1 no data is returned", () => {
//   //     expect(filterReadBooksByUserRating(bookMockDataA, 1)).toHaveLength(0);
//   //   });
//   //   test("When data is filtered by rating of 4 two books are returned", () => {
//   //     expect(filterReadBooksByUserRating(bookMockDataA, 4)).toHaveLength(1);
//   //   });
//   // });

//   /*--------------------------------*/
//   describe("getMonthYearLabel()", () => {
//     test("When month and year are undefined the string of All Books all time. is returned.", () => {
//       expect(getMonthYearLabel("", undefined, undefined)).toEqual(
//         "All Books all time."
//       );
//     });
//     test("When month has value and year is undefined with a modifier of 12345 the string of abcdef 12345 May all years.", () => {
//       expect(getMonthYearLabel("12345", 5, undefined)).toEqual(
//         "12345 May all years."
//       );
//     });
//     // test("When month is undefined and year is 2020 with a modifier of abcdef the string of abcdef 12345 books for 4004", () => {
//     //   expect(getMonthYearLabel("12345", undefined, 4004)).toEqual(
//     //     "12345 Books for 4004"
//     //   );
//     // });

//     // test("When month is 5 and year is 2020 with a modifier of abcdef the string of 12345 May, 4004.", () => {
//     //   expect(getMonthYearLabel("12345", 5, 4004)).toEqual("12345 May, 4004.");
//     // });
//   });
// });
