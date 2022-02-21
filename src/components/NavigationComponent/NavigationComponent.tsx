import * as React from "react";
import classNames from "classnames";
import ncStyles from "./NavigationComponent.module.scss";

const NavigationComponent = () => {
  const navClasses = classNames(
    "position-sticky",
    "navbar",
    "navbar-expanded",
    "mb-3",
    ncStyles.navBackground
  );
  return (
    <nav className={navClasses}>
      <div className="container">
        <a className="navbar-brand" href="#">
          📚 Book Diary
        </a>
      </div>
    </nav>
  );
};

export default NavigationComponent;
