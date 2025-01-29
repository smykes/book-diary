import React, { useEffect, useState, useMemo } from "react";
import BookComponent from "./components/BookComponent/BookComponent";
import NavigationComponent from "./components/NavigationComponent/NavigationComponent";
import StatisticsComponent from "./components/StatisticsComponent/StatisticsComponent";
import { MONTH_DATA, BOOK_RATINGS, ENDPOINT } from "./constants";
import { BookType, MonthObject } from "./types/index";
import {
  getComponentPhraseForBooks,
  getComponentPhraseForPages,
  getMonthsByYear,
  getURL,
} from "./utils/functions/helpers";

import { getAllBooks, getAllYears } from "./utils/functions/async";

const apiUrl = ENDPOINT.BACKEND_API;

import FooterComponent from "./components/FooterComponent/FooterComponent";
import NoResultsCommponent from "./components/NoResultsComponent/NoResultsComponent";
import BookSkeleton from "./components/SkeletonComponent/BookSkeleton";
import StatisticsSkeleton from "./components/SkeletonComponent/StatisticsSkeleton";
import PaginationComponent from "./components/PaginationComponent/PaginationComponent";
import TitleSearchComponent from "./components/TitleSearchComponent/TitleSearchComponent";

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
  const [booksRead, setBooksRead] = useState<number | undefined>();
  const [paginationCount, setPaginationCount] = useState<number | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(0);

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
        searchTerm,
        currentPage
      );
      setCurrentData(books.books);
      setPagesRead(books.numberOfPages);
      setBooksRead(books.numberOfBooks);
      setPaginationCount(Math.ceil(books.numberOfPagination));
    };

    getBooks();
  }, [
    selectedMonth,
    selectedYear,
    selectedRating,
    selectedSortOrder,
    searchTerm,
    currentPage,
  ]);

  const optionYears = activeYears?.map((year: any) => {
    return (
      <option key={year.year_read} value={year.year_read}>
        {year.year_read}
      </option>
    );
  });

  const optionMonths = () => {
    if (
      selectedYear !== undefined &&
      selectedYear === new Date().getFullYear()
    ) {
      return getMonthsByYear(selectedYear).map(
        (currentMonth: MonthObject, index: number) => {
          return (
            <option key={currentMonth.monthName} value={index}>
              {currentMonth.monthName}
            </option>
          );
        }
      );
    } else {
      return MONTH_DATA.map((currentMonth: MonthObject, index: number) => {
        return (
          <option key={currentMonth.monthName} value={index}>
            {currentMonth.monthName}
          </option>
        );
      });
    }
  };

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

        <div className="flex flex-col gap-2 md:flex-row">
          {!currentData && <StatisticsSkeleton />}
          {currentData && pagesRead && (
            <StatisticsComponent
              books={booksRead}
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

        <div className="w-full mt-4 flex flex-col">
          <TitleSearchComponent
            setTerm={setTerm}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* New Months / Years / Ratings / Sorting */}
        <div className="w-full flex flex-col gap-2 md:flex-row mt-4 mb-2">
          {/* Years */}
          <label
            htmlFor="optionYear"
            className="text-sm font-medium text-gray-900 dark:text-slate-800 sr-only"
          >
            Select a Year
          </label>
          <select
            id="optionYear"
            className="px-4 rounded-md md:w-1/2 w-full shadow-sm h-10 text-slate-700 dark:text-gray-100 dark:bg-slate-800 bg-white"
            aria-label="Year Filter"
            onChange={(e) => {
              if (e.target.value === "-1") {
                setSelectedYear(undefined);
                setCurrentPage(0);
              } else {
                setSelectedYear(parseInt(e.target.value, 10));
                setCurrentPage(0);
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
                setCurrentPage(0);
              } else {
                setSelectedMonth(parseInt(e.target.value, 10) + 1);
                setCurrentPage(0);
              }
            }}
            className="border-gray-300 w-full px-4 rounded-md md:w-1/2 shadow-sm h-10 text-slate-700 dark:text-gray-100 dark:bg-slate-800 bg-white"
          >
            <option value="-1">All Months</option>
            {optionMonths()}
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
            className=" border-gray-300 w-full px-4 rounded-md md:w-1/2 shadow-sm h-10 text-slate-700 dark:text-gray-100 dark:bg-slate-800 bg-white"
            aria-label="Rating Filter"
            onChange={(e) => {
              if (e.target.value === "-1") {
                setSelectedRating(undefined);
                setCurrentPage(0);
              } else {
                setSelectedRating(parseInt(e.target.value, 10));
                setCurrentPage(0);
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
            className="border-gray-300 w-full px-4 rounded-md md:w-1/2 shadow-sm h-10 text-slate-700 dark:text-gray-100 dark:bg-slate-800 bg-white"
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
        <PaginationComponent
          pagination={paginationCount}
          setPage={setCurrentPage}
          currentPage={currentPage}
          booksRead={booksRead}
        />
      </main>
      <FooterComponent />
    </div>
  );
}

export default App;
