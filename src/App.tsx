import React, { useEffect, useState, useMemo } from "react";
import BookComponent from "./components/BookComponent/BookComponent";
import NavigationComponent from "./components/NavigationComponent/NavigationComponent";
import StatisticsComponent from "./components/StatisticsComponent/StatisticsComponent";
import BookData from "./data/books.json";
import { MONTH_DATA, BOOK_RATINGS } from "./constants";
import { BookType, MonthObject } from "./types/index";
import {
  filterBooksByRead,
  getYearsByBookData,
  filterReadBooksByMonthAndYear,
  getPageCounts,
  filterReadBooksByUserRating,
  getComponentPhraseForBooks,
  getComponentPhraseForPages,
} from "./utils/functions/helpers";

import "./styles/styles.scss";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import NoResultsCommponent from "./components/NoResultsComponent/NoResultsComponent";

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
  const booksRead = useMemo(() => filterBooksByRead(BookData), []);

  useEffect(() => {
    console.log("useEffect");
    const readBooks = booksRead;
    const historicallyActiveYears = getYearsByBookData(readBooks);
    setActiveYears(historicallyActiveYears);
    console.group("Dates:");
    console.log("Currently Selected Month: ", selectedMonth);
    console.log("Currently Selected Yea: ", selectedYear);
    console.log("Currently Selected Rating: ", selectedRating);
    console.groupEnd();

    /* 
      If the selected year is undefined && the selectedmonth
      is undefined set the current data to the books that have
      been read.
    */
    if (!selectedYear && !selectedMonth) {
      if (selectedSortOrder === 0) {
        readBooks.sort(function (a, b) {
          return (
            new Date(a["Date Read"]).valueOf() -
            new Date(b["Date Read"]).valueOf()
          );
        });
      } else {
        readBooks.sort(function (a, b) {
          return (
            new Date(b["Date Read"]).valueOf() -
            new Date(a["Date Read"]).valueOf()
          );
        });
      }
      const ratingsFilteredBooks =
        selectedRating !== undefined
          ? filterReadBooksByUserRating(readBooks, selectedRating)
          : readBooks;
      setCurrentData(ratingsFilteredBooks);
      setPagesRead(getPageCounts(ratingsFilteredBooks));
    }
    if (selectedYear && !selectedMonth) {
      const finishedBooks = filterReadBooksByMonthAndYear(
        readBooks,
        null,
        selectedYear
      );
      if (selectedSortOrder === 0) {
        finishedBooks.sort(function (a, b) {
          return (
            new Date(a["Date Read"]).valueOf() -
            new Date(b["Date Read"]).valueOf()
          );
        });
      } else {
        finishedBooks.sort(function (a, b) {
          return (
            new Date(b["Date Read"]).valueOf() -
            new Date(a["Date Read"]).valueOf()
          );
        });
      }
      const ratingsFilteredBooks =
        selectedRating !== undefined
          ? filterReadBooksByUserRating(finishedBooks, selectedRating)
          : finishedBooks;
      setCurrentData(ratingsFilteredBooks);
      setPagesRead(getPageCounts(ratingsFilteredBooks));
    }
    if (!selectedYear && selectedMonth) {
      const finishedBooks = filterReadBooksByMonthAndYear(
        readBooks,
        selectedMonth,
        null
      );
      if (selectedSortOrder === 0) {
        finishedBooks.sort(function (a, b) {
          return (
            new Date(a["Date Read"]).valueOf() -
            new Date(b["Date Read"]).valueOf()
          );
        });
      } else {
        finishedBooks.sort(function (a, b) {
          return (
            new Date(b["Date Read"]).valueOf() -
            new Date(a["Date Read"]).valueOf()
          );
        });
      }

      const ratingsFilteredBooks =
        selectedRating !== undefined
          ? filterReadBooksByUserRating(finishedBooks, selectedRating)
          : finishedBooks;

      setCurrentData(ratingsFilteredBooks);
      setPagesRead(getPageCounts(ratingsFilteredBooks));
    }
    if (selectedYear && selectedMonth) {
      const finishedBooks = filterReadBooksByMonthAndYear(
        readBooks,
        selectedMonth,
        selectedYear
      );
      if (selectedSortOrder === 0) {
        finishedBooks.sort(function (a, b) {
          return (
            new Date(a["Date Read"]).valueOf() -
            new Date(b["Date Read"]).valueOf()
          );
        });
      } else {
        finishedBooks.sort(function (a, b) {
          return (
            new Date(b["Date Read"]).valueOf() -
            new Date(a["Date Read"]).valueOf()
          );
        });
      }
      const ratingsFilteredBooks =
        selectedRating !== undefined
          ? filterReadBooksByUserRating(finishedBooks, selectedRating)
          : finishedBooks;
      setCurrentData(ratingsFilteredBooks);
      setPagesRead(getPageCounts(ratingsFilteredBooks));
    }
  }, [
    selectedMonth,
    selectedYear,
    booksRead,
    selectedRating,
    selectedSortOrder,
  ]);

  const optionYears = activeYears?.map((year: number) => {
    return (
      <option key={year} value={year}>
        {year}
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
        key={book["Book Id"]}
        title={book.Title}
        author={book.Author}
        finishedDate={book["Date Read"]}
        numberOfPages={book["Number of Pages"]}
        rating={book["My Rating"]}
        averageRating={book["Average Rating"]}
        isbn={book["ISBN"]}
        bookId={book["Book Id"]}
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
