import * as React from "react";
import { StatsType } from "../../types";
import { formatNumberWithCommas } from "../../utils/functions/helpers";

const StatisticsComponent = (props: StatsType) => {
  const { books, pages, phrase } = props;

  return (
    <div className="w-full flex flex-col rounded-lg bg-gray-100 shadow-sm md:w-1/2">
      <div className="card-body p-0">
        <h2 className="w-full rounded-t-lg dark:bg-slate-900 bg-indigo-700 px-2 py-2 text-sm text-slate-50 text-left">
          {phrase}
        </h2>
        {pages === 0 ? (
          <p className="dark:bg-gray-800 w-full rounded-b-lg bg-slate-100 dark:text-slate-50 p-2">
            {formatNumberWithCommas(books)}
          </p>
        ) : (
          <p className="dark:bg-gray-800 w-full rounded-b-lg bg-slate-100 dark:text-slate-50 p-2">
            {formatNumberWithCommas(pages)}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatisticsComponent;
