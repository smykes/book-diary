import React, { useEffect, useState, useMemo } from "react";
import BookComponent from "./components/BookComponent/BookComponent";
import NavigationComponent from "./components/NavigationComponent/NavigationComponent";
import StatisticsComponent from "./components/StatisticsComponent/StatisticsComponent";
import { MONTH_DATA, BOOK_RATINGS, ENDPOINT } from "./constants";
import { BookType, MonthObject } from "./types/index";
import {
  getComponentPhraseForBooks,
  getComponentPhraseForPages,
} from "./utils/functions/helpers";

import FooterComponent from "./components/FooterComponent/FooterComponent";
import NoResultsCommponent from "./components/NoResultsComponent/NoResultsComponent";
import BookSkeleton from "./components/SkeletonComponent/BookSkeleton";
import StatisticsSkeleton from "./components/SkeletonComponent/StatisticsSkeleton";
const apiUrl = ENDPOINT.BACKEND_API;

function App() {
  const [activeYears, setActiveYears] = useState<number[] | undefined>();

  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    undefined
  );

  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined
  );

  const [selectedRating, setSelectedRating] = useState<number | undefined>(
    undefined
  );

  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const [selectedSortOrder, setSelectedOrder] = useState<number>(0);
  const [currentData, setCurrentData] = useState<BookType[] | undefined>();
  const [pagesRead, setPagesRead] = useState<number | undefined>();
  const getURL = (
    month: number | undefined,
    year: number | undefined,
    rating: number | undefined,
    sort: number | undefined,
    term: string | undefined
  ): string => {
    let baseUrl = `${apiUrl}/books`;
    console.info(`gerURL Base URL ${baseUrl}`);
    if (!year && !month && !rating && !sort && !term) return baseUrl;
    const sortIt = sort === undefined || sort === 0 ? "asc" : "desc";
    const varArray = [month, year, rating, sortIt, term];
    const wordArray = ["month", "year", "rating", "sort", "term"];
    let hasFirst = false;
    let urlString;
    for (let i = 0; i < 5; i += 1) {
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
  const getAllBooks = async (
    month: number | undefined,
    year: number | undefined,
    rating: number | undefined,
    sort: number | undefined,
    term: string | undefined
  ) => {
    const url = getURL(month, year, rating, sort, term);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      const e = error as Error;
      console.error(e.message);
    }
  };
  const getAllYears = async () => {
    const url = `${apiUrl}/years`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      const e = error as Error;
      console.error(e.message);
    }
  };

  const setTerm = (e: any) => {
    setSearchTerm(encodeURI(e.target.value));
  };

  useEffect(() => {
    const getBooks = async () => {
      if (!activeYears) {
        const historicallyActiveYears = await getAllYears();
        setActiveYears(historicallyActiveYears);
      }
      const books = await getAllBooks(
        selectedMonth,
        selectedYear,
        selectedRating,
        selectedSortOrder,
        searchTerm
      );
      setCurrentData(books.books);
      setPagesRead(books.numberOfPages);
    };

    getBooks();
  }, [
    selectedMonth,
    selectedYear,
    selectedRating,
    selectedSortOrder,
    searchTerm,
  ]);

  const optionYears = activeYears?.map((year: any) => {
    return (
      <option key={year.year_read} value={year.year_read}>
        {year.year_read}
      </option>
    );
  });

  const optionMonths = MONTH_DATA.map(
    (currentMonth: MonthObject, index: number) => {
      return (
        <option key={currentMonth.monthName} value={index}>
          {currentMonth.monthName}
        </option>
      );
    }
  );

  const optionRatings = BOOK_RATINGS.map((rating: number) => {
    return (
      <option key={rating} value={rating}>
        {rating}
      </option>
    );
  });

  const bookComponent = currentData?.map((book: BookType) => {
    return (
      <BookComponent
        key={book.id}
        title={book.title}
        author={book.author}
        dateRead={book.date_read}
        numberOfPages={book.number_of_pages}
        rating={book.user_rating}
        averageRating={book.avg_rating}
        isbn={book.isbn}
        bookId={book.book_id}
      />
    );
  });

  return (
    <div className="App">
      <NavigationComponent />

      <main className="px-7">
        {/* Books Per Month */}
        {/* Pages Per Month */}
        {/* Average Pages Per Day */}
        {/* Average Books Per Week */}

        <div className="w-100 flex flex-col gap-2 md:flex-row">
          {!currentData && <StatisticsSkeleton />}
          {currentData && pagesRead && (
            <StatisticsComponent
              books={currentData.length}
              pages={0}
              phrase={getComponentPhraseForBooks(
                selectedYear,
                selectedMonth,
                selectedRating
              )}
            />
          )}

          {!currentData && <StatisticsSkeleton />}
          {currentData && pagesRead && (
            <StatisticsComponent
              books={0}
              pages={pagesRead}
              phrase={getComponentPhraseForPages(
                selectedYear,
                selectedMonth,
                selectedRating
              )}
            />
          )}
        </div>

        {/* Title Search */}
        <div className="w-100 mt-4 flex flex-col">
          <label
            htmlFor="titleSearch"
            className="blocktext-slate-800 text-sm font-medium text-gray-100 dark:text-slate-800"
          >
            Title Search
          </label>
          <input
            id="searchInput"
            className="rounded h-10 px-2"
            type="text"
            onChange={(e) => setTerm(e)}
          ></input>
        </div>

        {/* New Months / Years / Ratings / Sorting */}
        <div className="w-100 flex flex-col gap-2 md:flex-row mt-4 mb-2">
          {/* Years */}
          <label
            htmlFor="optionYear"
            className="text-sm font-medium text-gray-900 dark:text-slate-800 sr-only"
          >
            Select a Year
          </label>
          <select
            id="optionYear"
            className="w-100 px-4 rounded-md md:w-1/2 w-100 shadow h-10 text-slate-700"
            aria-label="Year Filter"
            onChange={(e) => {
              if (e.target.value === "-1") {
                setSelectedYear(undefined);
              } else {
                setSelectedYear(parseInt(e.target.value, 10));
              }
            }}
          >
            <option value="-1">All Years</option>
            {optionYears}
          </select>
          {/* End Years */}

          {/* Months */}
          <label
            htmlFor="optionMonth"
            className="text-sm font-medium text-gray-900 dark:text-slate-800 sr-only"
          >
            Select a Month
          </label>
          <select
            id="optionMonth"
            aria-label="Month Filter"
            onChange={(e) => {
              if (e.target.value === "-1") {
                setSelectedMonth(undefined);
              } else {
                setSelectedMonth(parseInt(e.target.value, 10) + 1);
              }
            }}
            className="border-gray-300 w-100 px-4 rounded-md md:w-1/2 w-100 shadow h-10 text-slate-700"
          >
            <option value="-1">All Months</option>
            {optionMonths}
          </select>
          {/* End Months */}

          {/* Ratings */}
          <label
            htmlFor="optionRating"
            className="text-sm font-medium text-gray-900 dark:text-slate-800 sr-only"
          >
            Select a Rating
          </label>
          <select
            id="optionRating"
            className=" border-gray-300 w-100 px-4 rounded-md md:w-1/2 w-100 shadow h-10 text-slate-700"
            aria-label="Rating Filter"
            onChange={(e) => {
              if (e.target.value === "-1") {
                setSelectedRating(undefined);
              } else {
                setSelectedRating(parseInt(e.target.value, 10));
              }
            }}
          >
            <option value="-1">All Ratings</option>
            {optionRatings}
          </select>

          {/* End Ratings */}

          {/* Sort By */}
          <label
            htmlFor="optionRating"
            className="border-gray-300 text-sm font-medium text-gray-900 dark:text-slate-800 sr-only"
          >
            Sort By
          </label>
          <select
            className="border-gray-300 w-100 px-4 rounded-md md:w-1/2 w-100 shadow h-10 text-slate-700"
            aria-label="Sort Order"
            onChange={(e) => {
              if (e.target.value === "0") {
                setSelectedOrder(0);
              } else {
                setSelectedOrder(1);
              }
            }}
          >
            <option value="0">Asc Date</option>
            <option value="1">Desc Date</option>
          </select>
          {/* End Sort By */}
        </div>

        {/* Book List */}

        <div className="flex flex-col gap-3 mb-2">
          {currentData && bookComponent}
          {!currentData && <BookSkeleton />}
          {currentData?.length === 0 && <NoResultsCommponent />}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}

export default App;
