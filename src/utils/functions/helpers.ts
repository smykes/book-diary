import { BookType } from "../../types/index";
import { MONTH_DATA } from "../../constants";
const filterBooksByRead = (BookData: BookType[]): BookType[] => {
  /*
    The issue here is that not all read books have a date read.
    Some books were imported manually. We are only going to use the
    read books with the Date Read field populated. These are most likely
    books read on a kindle since it integrates with Goodreads.
  */
  console.log("fn filteredBooksByRead");
  const readBooks = BookData.filter((book) => {
    return book["Exclusive Shelf"] === "read" && book["Date Read"] !== "";
  });

  return readBooks;
};

const filterReadBooksByMonthAndYear = (
  BookData: BookType[],
  month: number | null,
  year: number | null
): BookType[] => {
  const bookReturn: BookType[] = [];
  BookData.forEach((book) => {
    // Turn the book date read into a javascript date we can work with.
    // Date example: Sat Jul 30 2016 00:00:00 GMT-0500 (CDT)

    // Since month is zero indexed in the return from getMonth we were
    // trying to compare it to a 0 indexed month. Since 0 was evaluating
    // as false, it was never hitting the correct evaluation. That's why
    // once inside of the if we have to subtract one from the month.

    const bookReadDate = new Date(book["Date Read"]);
    if (month && year) {
      if (
        bookReadDate.getFullYear() === year &&
        bookReadDate.getMonth() === month - 1
      ) {
        bookReturn.push(book);
      }
    }
    if (month && !year) {
      if (bookReadDate.getMonth() === month - 1) {
        bookReturn.push(book);
      }
    }
    if (!month && year) {
      if (bookReadDate.getFullYear() === year) {
        bookReturn.push(book);
      }
    }
  });
  return bookReturn;
};

const filterReadBooksByUserRating = (
  BookData: BookType[],
  rating: number | null
): BookType[] => {
  const bookReturn: BookType[] = [];
  if (rating === undefined) {
    return BookData;
  }
  BookData.forEach((book) => {
    if (book["Date Read"] !== "") {
      if (book["My Rating"] === rating) {
        bookReturn.push(book);
      }
    }
  });
  return bookReturn;
};

// Returns the years that there are dates for.
// IE if there were books read in 2016, return that
// date. Allows us to show the correct number of years
// based off of data instead of hard coding.
const getYearsByBookData = (BookData: BookType[]): number[] => {
  const yearsRead: number[] = [];
  BookData.forEach((book) => {
    if (book["Date Read"] !== "") {
      const bookReadYear = new Date(book["Date Read"]).getFullYear();
      if (yearsRead.indexOf(bookReadYear) === -1) {
        yearsRead.push(bookReadYear);
      }
    }
  });
  return yearsRead.sort();
};

const getPageCounts = (BookData: BookType[]): number => {
  let count = 0;
  BookData.forEach((book) => {
    if (book["Number of Pages"]) {
      count += book["Number of Pages"];
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
  filterBooksByRead,
  filterReadBooksByMonthAndYear,
  filterReadBooksByUserRating,
  getYearsByBookData,
  getPageCounts,
  getIsLeapYear,
  getMonthYearLabel,
  getMonthName,
  getComponentPhraseForBooks,
  getComponentPhraseForPages,
};
