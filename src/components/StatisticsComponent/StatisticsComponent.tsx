import * as React from "react";
import classNames from "classnames";
import statiscticStyles from "./StatisticsComponent.module.scss";
import { StatsType } from "../../types";

const StatisticsComponent = (props: StatsType) => {
  const { books, pages, phrase } = props;
  const cardTitleClass = classNames(
    "card-title",
    statiscticStyles["card-title-container"]
  );
  const cardTextClass = classNames(
    "card-text",
    statiscticStyles["card-text-helper"]
  );
  const cardClass = classNames("card", statiscticStyles["card-style"]);

  return (
    <div className={cardClass}>
      <div className="card-body p-0">
        <div className={cardTitleClass}>{phrase}</div>
        {pages === 0 ? (
          <p className={cardTextClass}>{books}</p>
        ) : (
          <p className={cardTextClass}>{pages}</p>
        )}
      </div>
    </div>
  );
};

export default StatisticsComponent;
