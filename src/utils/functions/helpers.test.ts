import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { bookMockDataA, bookMockDataB } from "./helpers.mock";
import { getIsLeapYear, getPageCounts, getMonthYearLabel } from "./helpers";

describe("helper functions", () => {
  describe("getIsLeapYear()", () => {
    describe("Check for positive leap years.", () => {
      const leapYears = [
        1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948,
        1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996,
        2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028,
      ];
      leapYears.forEach((year) => {
        test(`When ${year} is entered true is returnerd.`, () => {
          expect(getIsLeapYear(year)).toBeTruthy();
        });
      });
    });
    describe("Check for negaive leap years.", () => {
      const leapYears = [1900, 1907, 2022, 2023, 2025, 2026];
      leapYears.forEach((year) => {
        test(`When ${year} is entered false is returnerd.`, () => {
          expect(getIsLeapYear(year)).toBeFalsy();
        });
      });
    });
  });
  /*--------------------------------*/
  // describe("getPageCounts()", () => {
  //   test("Check for number of pages regardless of read or not.", () => {
  //     expect(getPageCounts(bookMockDataA)).toEqual(596);
  //   });
  //   test("Check for number or pages for only read books", () => {
  //     expect(getPageCounts(filterBooksByRead(bookMockDataA))).toEqual(308);
  //   });
  // });
  /*--------------------------------*/
  // describe("filterBooksByRead", () => {
  //   test("When data is filtered by read only one book is returned.", () => {
  //     expect(filterBooksByRead(bookMockDataA)).toHaveLength(1);
  //   });
  //   test("When data is filtered by read only four book is returned.", () => {
  //     expect(filterBooksByRead(bookMockDataB)).toHaveLength(2);
  //   });
  // });
  /*--------------------------------*/
  // describe("filterReadBooksByMonthAndYear()", () => {
  //   test("When data is filtered just by month and date only one book is returned.", () => {
  //     expect(
  //       filterReadBooksByMonthAndYear(bookMockDataA, 12, 2020)
  //     ).toHaveLength(1);
  //   });
  //   test("When data is filtered just by month and date no book is returned.", () => {
  //     expect(
  //       filterReadBooksByMonthAndYear(bookMockDataA, 4, 2020)
  //     ).toHaveLength(0);
  //   });
  //   test("When data is filtered just by month one book is returned.", () => {
  //     expect(
  //       filterReadBooksByMonthAndYear(bookMockDataA, 12, null)
  //     ).toHaveLength(1);
  //   });
  //   test("When data is filtered just by year one book is returned.", () => {
  //     expect(
  //       filterReadBooksByMonthAndYear(bookMockDataA, null, 2020)
  //     ).toHaveLength(1);
  //   });
  // });
  /*--------------------------------*/
  // describe("filterReadBooksByUserRating()", () => {
  //   test("When data is filtered by rating of 1 no data is returned", () => {
  //     expect(filterReadBooksByUserRating(bookMockDataA, 1)).toHaveLength(0);
  //   });
  //   test("When data is filtered by rating of 4 two books are returned", () => {
  //     expect(filterReadBooksByUserRating(bookMockDataA, 4)).toHaveLength(1);
  //   });
  // });

  /*--------------------------------*/
  describe("getMonthYearLabel()", () => {
    test("When month and year are undefined the string of All Books all time. is returned.", () => {
      expect(getMonthYearLabel("", undefined, undefined)).toEqual(
        "All Books all time."
      );
    });
    test("When month has value and year is undefined with a modifier of 12345 the string of abcdef 12345 May all years.", () => {
      expect(getMonthYearLabel("12345", 5, undefined)).toEqual(
        "12345 May all years."
      );
    });
    // test("When month is undefined and year is 2020 with a modifier of abcdef the string of abcdef 12345 books for 4004", () => {
    //   expect(getMonthYearLabel("12345", undefined, 4004)).toEqual(
    //     "12345 Books for 4004"
    //   );
    // });

    // test("When month is 5 and year is 2020 with a modifier of abcdef the string of 12345 May, 4004.", () => {
    //   expect(getMonthYearLabel("12345", 5, 4004)).toEqual("12345 May, 4004.");
    // });
  });
});
