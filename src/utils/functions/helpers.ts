import { BookType } from "../../types/index";
import { MONTH_DATA } from "../../constants";

const formatDate = (dateRead: string | null): string => {
  if (dateRead) {
    const d = new Date(dateRead);
    return `${getMonthName(
      d.getMonth() + 1
    )} ${d.getDate()}, ${d.getFullYear()}`;
  }
  return "No Date Recorded";
};
const getPageCounts = (BookData: BookType[]): number => {
  let count = 0;
  BookData.forEach((book) => {
    if (book.number_of_pages) {
      count += book.number_of_pages;
    }
  });

  return count;
};

const getIsLeapYear = (year: number): boolean => {
  // If the year is evenly divisible by 4 (year % 4 === 0)
  if (year % 4 === 0) {
    // If the year is evenly divisible by 100 (year % 100 === 0)
    if (year % 100 === 0) {
      // If the year is divisble by 400 (year % 400 === 0)
      if (year % 400 === 0) {
        return true;
      }
      // If it is not divisble by 100 (year % 100 !== 0)
    } else {
      return true;
    }
  }

  return false;
};

const getMonthYearLabel = (
  modifier: string,
  month: number | undefined,
  year: number | undefined
): string => {
  // All years all months.

  // Book Count {MM/YYYY}:
  // Page Count {}:

  // All Books since the beginning.
  if (month === undefined && year === undefined) {
    return "All Books all time.";
  }
  // A month all year specified
  if (month === undefined && year !== undefined) return `Book Count ${year}`;

  // A month year specified
  if (month !== undefined && year === undefined)
    return `${modifier} ${MONTH_DATA[month - 1].monthName} all years.`;

  // If year and month are defined.
  if (month !== undefined && year !== undefined)
    return `1234 ${modifier} ${MONTH_DATA[month - 1].monthName}, ${year}.`;
  return "Something went wrong.";
};

const getMonthName = (month: number | undefined) => {
  if (month) return `${MONTH_DATA[month - 1].monthName}`;
  return "All Months";
};

// All Books

// Books read all time with any rating
// selectedMonth === undefined && selectedYear === undefined && selectedRating === undefined
// currentData.length
// ------------------------

// Books read all time with rating {r}
// selectedMonth !== undefined && selectedYeare !== undefined && selectedRating !== undefined
// currentData.length
// ------------------------

// Months

// Books read in Month {m} any year {y}, with any Rating
// selectedMonth === undefined && selectedYear !== undefined && selectedRating === undefined
// currentData.length
// ------------------------

// Books read in Month {m} any year, with rating {y}
// selectedMonth !== undefined && selectedYear === undefined && selectedRating === undefined
// currentData.length
// ------------------------

// Years

// Books read in any Month and year {y}, with any rating
// selectedMonth === undefined && selectedYear !== undefined && selectedRating === undefined
// currentData.length
// -----------------------

// Books read in any Month and year {y}, with {r} rating
// selectedMonth === undefined && selectedYear !== undefined
// currentData.length
// -----------------------

// Years and Months

// Books read in month {m} and year {y}, with any rating
// selectedMonth !== undefined && selectedYear !== undefined && rating === undefined
// currentData.length

// Books read in month {m} and year {y}, with rating {r}
// selectedMonth !=== undefined && selectedYear !== undefined && rating !== undefined
// currentData.length

// Statisics Component
// pages
// books
// phrase

const getComponentPhraseForBooks = (
  year: number | undefined,
  month: number | undefined,
  rating: number | undefined
) => {
  // All Time
  if (month === undefined && year === undefined && rating === undefined) {
    return "Books read all time";
  }
  if (month === undefined && year === undefined && rating !== undefined) {
    return `Books read all time with a rating of ${rating}`;
  }
  // Months

  if (month !== undefined && year === undefined && rating === undefined) {
    return `Books read in ${getMonthName(month)}es`;
  }
  if (month !== undefined && year === undefined && rating !== undefined) {
    return `Books read in ${getMonthName(month)}es with a rating of ${rating}`;
  }

  // Years
  if (month === undefined && year !== undefined && rating === undefined) {
    return `Books read in ${year}`;
  }
  if (month === undefined && year !== undefined && rating !== undefined) {
    return `Books read in ${year} with a rating of ${rating}`;
  }

  // Months and Years
  if (month !== undefined && year !== undefined && rating === undefined) {
    return `Books read in ${getMonthName(month)} of ${year}`;
  }
  if (month !== undefined && year !== undefined && rating !== undefined) {
    return `Books read in ${getMonthName(
      month
    )} of ${year} with a rating of ${rating}`;
  }

  return "An error occured.";
};

const getComponentPhraseForPages = (
  year: number | undefined,
  month: number | undefined,
  rating: number | undefined
) => {
  // All Time
  if (month === undefined && year === undefined && rating === undefined) {
    return "Pages read all time";
  }
  if (month === undefined && year === undefined && rating !== undefined) {
    return `Pages read all time with a rating of ${rating}`;
  }
  // Months

  if (month !== undefined && year === undefined && rating === undefined) {
    return `Pages read in ${getMonthName(month)}es`;
  }
  if (month !== undefined && year === undefined && rating !== undefined) {
    return `Pages read in ${getMonthName(month)}es with a rating of ${rating}`;
  }

  // Years
  if (month === undefined && year !== undefined && rating === undefined) {
    return `Pages read in ${year}`;
  }
  if (month === undefined && year !== undefined && rating !== undefined) {
    return `Pages read in ${year} with a rating of ${rating}`;
  }

  // Months and Years
  if (month !== undefined && year !== undefined && rating === undefined) {
    return `Pages read in ${getMonthName(month)} of ${year}`;
  }
  if (month !== undefined && year !== undefined && rating !== undefined) {
    return `Pages read in ${getMonthName(
      month
    )} of ${year} with a rating of ${rating}`;
  }

  return "An error occured.";
};

export {
  getPageCounts,
  getIsLeapYear,
  getMonthYearLabel,
  getMonthName,
  getComponentPhraseForBooks,
  getComponentPhraseForPages,
  formatDate,
};
