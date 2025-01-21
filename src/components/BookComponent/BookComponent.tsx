import React from "react";
import { BookTitle } from "./BookTitleComponent";
import { Book } from "../../types";
import classNames from "classnames";
import bookComponentStyles from "./BookComponent.module.scss";
import { formatDate } from "../../utils/functions/helpers";
const BookComponent: React.FC<Book> = (props) => {
  const {
    title,
    author,
    dateRead,
    numberOfPages,
    rating,
    averageRating,
    isbn,
    bookId,
  } = props;

  return (
    <div className="shadow bg-gray-100 rounded-lg">
      <div className="w-full rounded-t-lg bg-indigo-700 px-2 py-2 text-sm text-slate-50">
        <h2 className="text-base text-left align-middle">
          <BookTitle isbn={isbn} title={title} bookId={bookId} />
        </h2>
      </div>
      <div className="py-2 text-gray-900">
        <ul className="px-2">
          <li>
            <span className="font-semibold">Author:</span> {author}
          </li>
          <li>
            <span className="font-semibold">Finished On:</span>{" "}
            {formatDate(dateRead)}
          </li>
          <li>
            <span className="font-semibold">Page Count:</span> {numberOfPages}
          </li>
          <li>
            <span className="font-semibold">My Rating:</span> {rating}
          </li>
          <li>
            <span className="font-semibold">Goodreads Rating:</span>{" "}
            {averageRating.toPrecision(3)}
          </li>
          <li>
            <span className="font-semibold">Ratings Difference:</span>{" "}
            {(rating - averageRating).toPrecision(3)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookComponent;
