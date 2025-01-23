import { useState } from "react";

interface IPaginationComponentProps {
  pagination: number | undefined;
  setPage: (value: number) => void;
  booksRead: number | undefined;
  currentPage: number;
}
const PaginationComponent = (props: IPaginationComponentProps) => {
  const { pagination, setPage, booksRead, currentPage } = props;

  const handleClick = (event: React.MouseEvent) => {
    let value;
    if (event.currentTarget.id === "up-1") value = 1;
    else value = -1;
    if (currentPage !== undefined) setPage(currentPage + value);
  };

  const getLastNumber = () => {
    if (booksRead !== undefined) {
      if (currentPage + 1 === pagination) {
        return booksRead;
      } else if (currentPage === 0) {
        return 10;
      }

      return 10 * currentPage + 10;
    }
  };

  return (
    <nav>
      <div className="flex flex-col items-center">
        {!!pagination && (
          <span className="text-sm text-gray-100 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-400 dark:text-white">
              {pagination && currentPage === 0 && "1"}
              {pagination && currentPage > 0 && 10 * currentPage}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-gray-400 dark:text-white">
              {getLastNumber()}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-400 dark:text-white">
              {booksRead}
            </span>{" "}
            Entries
          </span>
        )}

        <div className="inline-flex mt-2 xs:mt-0">
          {!!pagination && (
            <button
              onClick={handleClick}
              id="down-1"
              className="
                flex
                items-center
                justify-center
                px-4
                h-10
                text-base
                font-medium
                rounded-s

                text-white 
                dark:text-gray-400

                bg-indigo-600
                dark:bg-slate-800

                hover:bg-indigo-800
                dark:hover:bg-gray-700 

                dark:border-gray-700 
                dark:hover:text-white

                disabled:hover:cursor-not-allowed
                disabled:shadow-none 

                disabled:hover:bg-indigo-300
                disabled:bg-indigo-300
                dark:disabled:hover:bg-gray-400 
                
                dark:disabled:border-gray-400 
                dark:disabled:bg-gray-400 
                dark:disabled:text-gray-500 
                dark:disabled:hover:text-slate-500"
              disabled={currentPage === 0}
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Prev
            </button>
          )}
          {!!pagination && (
            <button
              id="up-1"
              onClick={handleClick}
              className="                
                flex
                items-center
                justify-center
                px-4
                h-10
                text-base
                font-medium
                rounded-e

                text-white 
                dark:text-gray-400

                bg-indigo-600
                dark:bg-slate-800

                hover:bg-indigo-800
                dark:hover:bg-gray-700 

                dark:border-gray-700 
                dark:hover:text-white

                disabled:hover:cursor-not-allowed
                disabled:shadow-none 

                disabled:hover:bg-indigo-600
                dark:disabled:hover:bg-gray-400 
                
                dark:disabled:border-gray-400 
                dark:disabled:bg-gray-400 
                dark:disabled:text-gray-500 
                dark:disabled:hover:text-slate-500 "
              disabled={currentPage + 1 === pagination}
            >
              Next
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PaginationComponent;
