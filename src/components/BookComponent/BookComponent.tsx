import React from "react";
import { BookTitle } from "./BookTitleComponent";
import { Book } from "../../types";
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
    <div className="shadow-sm bg-gray-100 rounded-lg">
      <div className="w-full rounded-t-lg dark:bg-slate-900 bg-indigo-700 px-2 py-2 text-sm text-slate-50">
        <h2 className="text-base text-left align-middle">
          <BookTitle isbn={isbn} title={title} bookId={bookId} />
        </h2>
      </div>
      <div className="py-2 text-gray-900 dark:bg-gray-800 rounded-b-lg">
        <ul className="px-2 dark:text-gray-400">
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
            {Number(averageRating.toPrecision(4))}
          </li>
          <li>
            <span className="font-semibold">Ratings Difference:</span>{" "}
            {Number((rating - averageRating).toPrecision(4))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookComponent;
