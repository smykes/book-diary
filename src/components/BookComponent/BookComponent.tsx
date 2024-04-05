import React from "react";
import { BookTitle } from "./BookTitleComponent";
import { Book } from "../../types";
import classNames from "classnames";
import bookComponentStyles from "./BookComponent.module.scss";

const BookComponent: React.FC<Book> = (props) => {
  const {
    title,
    author,
    finishedDate,
    numberOfPages,
    rating,
    averageRating,
    isbn,
    bookId,
  } = props;
  const rowStyles = classNames("row", "mt-3", bookComponentStyles.bookRow);

  return (
    <div className={rowStyles}>
      <div className={bookComponentStyles["title-header-wrapper"]}>
        <h5>
          <BookTitle isbn={isbn} title={title} bookId={bookId} />
        </h5>
      </div>
      <div className={bookComponentStyles["info-wrapper"]}>
        <div>Author: {author}</div>
        <div>Finished On: {finishedDate}</div>
        <div>Page Count: {numberOfPages}</div>
        <div>My Rating: {rating}</div>
        <div>Goodreads Rating: {averageRating.toPrecision(3)}</div>
        <div>Ratings Difference: {(rating - averageRating).toPrecision(3)}</div>
      </div>
    </div>
  );
};

export default BookComponent;
