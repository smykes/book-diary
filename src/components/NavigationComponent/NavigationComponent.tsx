import * as React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const NavigationComponent = () => {
  return (
    <nav className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
      <div className="dark:text-white w-full mx-auto max-w-(--breakpoint-xl) p-4 flex items-center justify-between">
        <div>📚 Book Diary</div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default NavigationComponent;
