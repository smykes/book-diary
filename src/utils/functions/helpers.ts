import { BookType } from "../../types/index";
import { MONTH_DATA, ENDPOINT } from "../../constants";

const formatDate = (dateRead: string | null): string => {
  if (dateRead) {
    const d = new Date(dateRead);
    return `${getMonthName(
      d.getMonth() + 1
    )} ${d.getDate()}, ${d.getFullYear()}`;
  }
  return "No Date Recorded";
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

export {
  getMonthYearLabel,
  getMonthName,
  getComponentPhraseForBooks,
  getComponentPhraseForPages,
  formatDate,
  getURL,
};
