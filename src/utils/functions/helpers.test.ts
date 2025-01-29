// import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import {
  formatNumberWithCommas,
  formatDate,
  getMonthName,
  getComponentPhraseForBooks,
  getIsValidMonth,
  getIsValidRating,
  getComponentPhraseForPages,
} from "./helpers";

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
    test(`When a yyyy/mm/dd string is passed in and the month does not exist invalid date is returned`, () => {
      expect(formatDate("2025/00/26")).toEqual("Invalid Date");
    });
  });

  describe("fn: getIsValidMonth", () => {
    test(`If a number > 0 && <= 12 is passed in true should be returned.`, () => {
      expect(getIsValidMonth(10)).toBeTruthy();
    });
    test(`If a number <= 0 is passed in false should be returned.`, () => {
      expect(getIsValidMonth(0)).toBeFalsy();
    });
    test(`If a number > 12 is passed in false should be returned.`, () => {
      expect(getIsValidMonth(13)).toBeFalsy();
    });
  });

  describe("fn: getIsValidRating", () => {
    test(`If a number > 0 && <= 5 is passed in true should be returned.`, () => {
      expect(getIsValidRating(5)).toBeTruthy();
    });
    test(`If a number > 5 is passed in false should be returned.`, () => {
      expect(getIsValidRating(23)).toBeFalsy();
    });
    test(`If a number < 1 is passed in false should be returned.`, () => {
      expect(getIsValidRating(0)).toBeFalsy();
    });
  });

  describe("fn: getMonthName", () => {
    test(`If the undefined is passed in "All Months" are returned`, () => {
      expect(getMonthName(undefined)).toEqual("All Months");
    });
    test(`If the 10 is passed in "October" is returned`, () => {
      expect(getMonthName(10)).toEqual("October");
    });
    test(`If the 12 is passed in "December is returned"`, () => {
      expect(getMonthName(12)).toEqual("December");
    });
    test(`If the 0 is passed in a strig representing an error is returned`, () => {
      expect(getMonthName(0)).toEqual(
        "An error has occured, month must be a whole number between 1 and 12"
      );
    });
    test(`If the 14 is passed in a strig representing an error is returned`, () => {
      expect(getMonthName(14)).toEqual(
        "An error has occured, month must be a whole number between 1 and 12"
      );
    });
    test(`If the -2 is passed in in a strig representing an error is returned`, () => {
      expect(getMonthName(-2)).toEqual(
        "An error has occured, month must be a whole number between 1 and 12"
      );
    });
    test(`If the 13 is passed in in a strig representing an error is returned`, () => {
      expect(getMonthName(-2)).toEqual(
        "An error has occured, month must be a whole number between 1 and 12"
      );
    });
  });

  describe("fn: getComponentPhraseForBooks", () => {
    // Year
    describe("year", () => {
      test(`If all parameters are undefined "Books read all time" should be returned.`, () => {
        expect(
          getComponentPhraseForBooks(undefined, undefined, undefined)
        ).toEqual("Books read all time");
      });
      test(`If only year is passed in "Books read in {x}" should be returned.`, () => {
        expect(getComponentPhraseForBooks(2025, undefined, undefined)).toEqual(
          "Books read in 2025"
        );
      });
    });

    // Month
    describe("month", () => {
      test(`If only a valid month is passed in "Books read in the month of {month} all time" should be returned`, () => {
        expect(getComponentPhraseForBooks(undefined, 10, undefined)).toEqual(
          "Books read in the month of October all time"
        );
      });
      test(`If only an invalid month (> 12) is passed in "An error has occured." should be returned`, () => {
        expect(getComponentPhraseForBooks(undefined, 14, undefined)).toEqual(
          "An error has occured."
        );
      });
      test(`If only an invalid month (< 1) is passed in "An error has occured." should be returned`, () => {
        expect(getComponentPhraseForBooks(undefined, 0, undefined)).toEqual(
          "An error has occured."
        );
      });
    });

    // Rating
    describe("rating", () => {
      test(`If only rating is passed in >=1 && <=5 "Books read all time with a rating of {n}" should be returned.`, () => {
        expect(getComponentPhraseForBooks(undefined, undefined, 4)).toEqual(
          "Books read all time with a rating of 4"
        );
      });
      test(`If only rating is passed in and is < 1  "An error has occured."`, () => {
        expect(getComponentPhraseForBooks(undefined, undefined, 0)).toEqual(
          "An error has occured."
        );
      });
      test(`If only rating is passed in and is > 5  "An error has occured."`, () => {
        expect(getComponentPhraseForBooks(undefined, undefined, 6)).toEqual(
          "An error has occured."
        );
      });
    });

    // Year/Month

    describe("year/month", () => {
      // good year good month
      test(`good year/good month is passed "Books read in {month} of {year}" should be returned.`, () => {
        expect(getComponentPhraseForBooks(2024, 10, undefined)).toEqual(
          "Books read in October of 2024"
        );
      });
      // good year bad month
      test(`good year/bad month is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForBooks(2024, 15, undefined)).toEqual(
          "An error has occured."
        );
      });
      test(`good year/bad month is passed"An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForBooks(2024, -3, undefined)).toEqual(
          "An error has occured."
        );
      });
    });

    // Year/Rating

    describe("year/rating", () => {
      test(`good year/good rating is passed "Books read in {year} with a rating of {rating}" should be returned.`, () => {
        expect(getComponentPhraseForBooks(2024, undefined, 4)).toEqual(
          "Books read in 2024 with a rating of 4"
        );
      });
      test(`good year/bad rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForBooks(2024, undefined, 6)).toEqual(
          "An error has occured."
        );
      });
      test(`good year/bad rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForBooks(2024, undefined, -2)).toEqual(
          "An error has occured."
        );
      });
    });

    // Month/Rating
    describe("month/rating", () => {
      test(`good month/good rating is passed "Books read in {month} with a rating of {rating}" should be returned.`, () => {
        expect(getComponentPhraseForBooks(undefined, 11, 4)).toEqual(
          "Books read in November with a rating of 4"
        );
      });
      test(`bad month/good rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForBooks(undefined, 14, 4)).toEqual(
          "An error has occured."
        );
      });
      test(`good month/bad rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForBooks(undefined, 8, 6)).toEqual(
          "An error has occured."
        );
      });
      test(`bad month/bad rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForBooks(undefined, 0, 33)).toEqual(
          "An error has occured."
        );
      });
    });

    // Year/Month/Rating
    describe("year/month/raing", () => {
      test(`good year/good month/good rating is passed "Books read in {month} of {year} with a rating of {rating}" should be returned.`, () => {
        expect(getComponentPhraseForBooks(2025, 10, 4)).toEqual(
          "Books read in October of 2025 with a rating of 4"
        );
      });
      test(`good year/bad month/good rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForBooks(2025, 15, 4)).toEqual(
          "An error has occured."
        );
      });
      test(`good year/bad month/good rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForBooks(2025, 11, 7)).toEqual(
          "An error has occured."
        );
      });
      test(`good year/bad month/bad rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForBooks(2025, 0, 7)).toEqual(
          "An error has occured."
        );
      });
    });
  });

  describe("fn: getComponentPhraseForPages", () => {
    // Year
    describe("year", () => {
      test(`If all parameters are undefined "Books read all time" should be returned.`, () => {
        expect(
          getComponentPhraseForPages(undefined, undefined, undefined)
        ).toEqual("Pages read all time");
      });
      test(`If only year is passed in "Books read in {x}" should be returned.`, () => {
        expect(getComponentPhraseForPages(2025, undefined, undefined)).toEqual(
          "Pages read in 2025"
        );
      });
    });

    // Month
    describe("month", () => {
      test(`If only a valid month is passed in "Books read in the month of {month} all time" should be returned`, () => {
        expect(getComponentPhraseForPages(undefined, 10, undefined)).toEqual(
          "Pages read in the month of October all time"
        );
      });
      test(`If only an invalid month (> 12) is passed in "An error has occured." should be returned`, () => {
        expect(getComponentPhraseForPages(undefined, 14, undefined)).toEqual(
          "An error has occured."
        );
      });
      test(`If only an invalid month (< 1) is passed in "An error has occured." should be returned`, () => {
        expect(getComponentPhraseForPages(undefined, 0, undefined)).toEqual(
          "An error has occured."
        );
      });
    });

    // Rating
    describe("rating", () => {
      test(`If only rating is passed in >=1 && <=5 "Books read all time with a rating of {n}" should be returned.`, () => {
        expect(getComponentPhraseForPages(undefined, undefined, 4)).toEqual(
          "Pages read all time with a rating of 4"
        );
      });
      test(`If only rating is passed in and is < 1  "An error has occured."`, () => {
        expect(getComponentPhraseForPages(undefined, undefined, 0)).toEqual(
          "An error has occured."
        );
      });
      test(`If only rating is passed in and is > 5  "An error has occured."`, () => {
        expect(getComponentPhraseForPages(undefined, undefined, 6)).toEqual(
          "An error has occured."
        );
      });
    });

    // Year/Month

    describe("year/month", () => {
      // good year good month
      test(`good year/good month is passed "Books read in {month} of {year}" should be returned.`, () => {
        expect(getComponentPhraseForPages(2024, 10, undefined)).toEqual(
          "Pages read in October of 2024"
        );
      });
      // good year bad month
      test(`good year/bad month is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForPages(2024, 15, undefined)).toEqual(
          "An error has occured."
        );
      });
      test(`good year/bad month is passed"An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForPages(2024, -3, undefined)).toEqual(
          "An error has occured."
        );
      });
    });

    // Year/Rating

    describe("year/rating", () => {
      test(`good year/good rating is passed "Books read in {year} with a rating of {rating}" should be returned.`, () => {
        expect(getComponentPhraseForPages(2024, undefined, 4)).toEqual(
          "Pages read in 2024 with a rating of 4"
        );
      });
      test(`good year/bad rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForPages(2024, undefined, 6)).toEqual(
          "An error has occured."
        );
      });
      test(`good year/bad rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForPages(2024, undefined, -2)).toEqual(
          "An error has occured."
        );
      });
    });

    // Month/Rating
    describe("month/rating", () => {
      test(`good month/good rating is passed "Books read in {month} with a rating of {rating}" should be returned.`, () => {
        expect(getComponentPhraseForPages(undefined, 11, 4)).toEqual(
          "Pages read in the month of November with a rating of 4 all time"
        );
      });
      test(`bad month/good rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForPages(undefined, 14, 4)).toEqual(
          "An error has occured."
        );
      });
      test(`good month/bad rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForPages(undefined, 8, 6)).toEqual(
          "An error has occured."
        );
      });
      test(`bad month/bad rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForPages(undefined, 0, 33)).toEqual(
          "An error has occured."
        );
      });
    });

    // Year/Month/Rating
    describe("year/month/raing", () => {
      test(`good year/good month/good rating is passed "Books read in {month} of {year} with a rating of {rating}" should be returned.`, () => {
        expect(getComponentPhraseForPages(2025, 10, 4)).toEqual(
          "Pages read in October of 2025 with a rating of 4"
        );
      });
      test(`good year/bad month/good rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForPages(2025, 15, 4)).toEqual(
          "An error has occured."
        );
      });
      test(`good year/bad month/good rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForPages(2025, 11, 7)).toEqual(
          "An error has occured."
        );
      });
      test(`good year/bad month/bad rating is passed "An error has occured." should be returned.`, () => {
        expect(getComponentPhraseForPages(2025, 0, 7)).toEqual(
          "An error has occured."
        );
      });
    });
  });
});
