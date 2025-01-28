import { BookType } from "../../types/index";
import { MONTH_DATA, ENDPOINT } from "../../constants";

// ✅
const formatNumberWithCommas = (num: number | undefined) => {
  let formatted;
  if (num && num > 0) {
    formatted = new Intl.NumberFormat("en-US", {
      maximumSignificantDigits: 6,
    }).format(num);
  }
  return formatted;
};

// ✅
const formatDate = (dateRead: string | null): string => {
  if (dateRead) {
    const d = new Date(dateRead);
    if (isNaN(d.getTime())) {
      return "Invalid Date";
    }
    return `${getMonthName(
      d.getMonth() + 1
    )} ${d.getDate()}, ${d.getFullYear()}`;
  }
  return "No Date Recorded";
};

// ✅
const getMonthName = (month: number | undefined) => {
  if (month) return `${MONTH_DATA[month - 1].monthName}`;
  return "All Months";
};

// ✅
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

// ✅
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

// ✅
const getURL = (
  month: number | undefined,
  year: number | undefined,
  rating: number | undefined,
  sort: number | undefined,
  term: string | undefined,
  page: number | undefined
): string => {
  let baseUrl = `${ENDPOINT.BACKEND_API}/books`;
  if (!year && !month && !rating && !sort && !term && !page) return baseUrl;
  const sortIt = sort === undefined || sort === 0 ? "asc" : "desc";
  const varArray = [month, year, rating, sortIt, term, page];
  const wordArray = ["month", "year", "rating", "sort", "term", "page"];
  let hasFirst = false;
  let urlString;
  for (let i = 0; i < 6; i += 1) {
    if (varArray[i]) {
      if (!hasFirst) {
        urlString = `?${wordArray[i]}=${varArray[i]}`;
        hasFirst = true;
      } else {
        urlString = `${urlString}&${wordArray[i]}=${varArray[i]}`;
      }
    }
  }
  return `${baseUrl}${urlString}`;
};

// ✅
const getMonthsByYear = (year: number) => {
  const cuurentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  let months = [];
  if (year === cuurentYear) {
    for (let i = 0; i < currentMonth + 1; i += 1) {
      months.push(MONTH_DATA[i]);
    }
  }
  return months;
};

export {
  formatDate,
  formatNumberWithCommas,
  getComponentPhraseForBooks,
  getComponentPhraseForPages,
  getMonthName,
  getMonthsByYear,
  getURL,
};
//
