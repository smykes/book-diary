import React, { useEffect, useState, useMemo } from "react";
import BookComponent from "./components/BookComponent/BookComponent";
import NavigationComponent from "./components/NavigationComponent/NavigationComponent";
import StatisticsComponent from "./components/StatisticsComponent/StatisticsComponent";
import { MONTH_DATA, BOOK_RATINGS, ENDPOINT } from "./constants";
import { BookType, MonthObject } from "./types/index";
import {
  getPageCounts,
  getComponentPhraseForBooks,
  getComponentPhraseForPages,
} from "./utils/functions/helpers";

import "./styles/styles.scss";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import NoResultsCommponent from "./components/NoResultsComponent/NoResultsComponent";
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

  const [selectedSortOrder, setSelectedOrder] = useState<number>(0);
  const [currentData, setCurrentData] = useState<BookType[] | undefined>();
  const [pagesRead, setPagesRead] = useState<number | undefined>();
  const getURL = (
    month: number | undefined,
    year: number | undefined,
    rating: number | undefined,
    sort: number | undefined
  ): string => {
    let baseUrl = `${apiUrl}/books`;
    console.info(`gerURL Base URL ${baseUrl}`);
    if (!year && !month && !rating && !sort) return baseUrl;
    const sortIt = sort === undefined || sort === 0 ? "asc" : "desc";
    const varArray = [month, year, rating, sortIt];
    const wordArray = ["month", "year", "rating", "sort"];
    let hasFirst = false;
    let urlString;
    for (let i = 0; i < 4; i += 1) {
      if (varArray[i]) {
        if (!hasFirst) {
          urlString = `?${wordArray[i]}=${varArray[i]}`;
          hasFirst = true;
        } else {
          urlString = `${urlString}&${wordArray[i]}=${varArray[i]}`;
        }
      }
    }
    console.log(`${baseUrl}/books${urlString}`);
    return `${baseUrl}${urlString}`;
  };
  const getAllBooks = async (
    month: number | undefined,
    year: number | undefined,
    rating: number | undefined,
    sort: number | undefined
  ) => {
    console.info(`getAllBoks Base URL ${apiUrl}`);

    const url = getURL(month, year, rating, sort);
    console.info(`getAllBoks Calculated URL ${url}`);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
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
      console.log(json);
      return json;
    } catch (error) {
      const e = error as Error;
      console.error(e.message);
    }
  };

  useEffect(() => {
    console.log("useEffect");

    const getBooks = async () => {
      console.log("getBooks");
      if (!activeYears) {
        const historicallyActiveYears = await getAllYears();
        setActiveYears(historicallyActiveYears);
      }
      const books = await getAllBooks(
        selectedMonth,
        selectedYear,
        selectedRating,
        selectedSortOrder
      );
      console.log(books);
      setCurrentData(books.books);
      setPagesRead(books.numberOfPages);
    };

    getBooks();
  }, [selectedMonth, selectedYear, selectedRating, selectedSortOrder]);

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
      <header>
        <NavigationComponent />
      </header>

      <main>
        {/* Books Per Month */}
        {/* Pages Per Month */}
        {/* Average Pages Per Day */}
        {/* Average Books Per Week */}

        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6">
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
            </div>

            <div className="col-12 col-sm-6">
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
          </div>
        </div>

        {/* Months / Years / Ratings / Sorting */}

        <div className="container my-4">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-3">
              <select
                className="form-select"
                aria-label="Month Filter"
                onChange={(e) => {
                  if (e.target.value === "-1") {
                    setSelectedMonth(undefined);
                  } else {
                    setSelectedMonth(parseInt(e.target.value, 10) + 1);
                  }
                }}
              >
                <option value="-1">All Months</option>
                {optionMonths}
              </select>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
              <select
                className="form-select"
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
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
              <select
                className="form-select"
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
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
              <select
                className="form-select"
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
            </div>
          </div>
        </div>

        {/* Book List */}

        <div className="container">
          {currentData && bookComponent}
          {currentData?.length === 0 && <NoResultsCommponent />}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}

export default App;
