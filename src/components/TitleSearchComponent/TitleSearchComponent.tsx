import { ChangeEvent } from "react";

interface ITitleSearchComponent {
  setTerm: (value: ChangeEvent) => void;
  setCurrentPage: (value: number) => void;
}

const TitleSearchComponent = (props: ITitleSearchComponent) => {
  const { setTerm, setCurrentPage } = props;
  return (
    <>
      <label
        htmlFor="titleSearch"
        className="blocktext-slate-800 text-sm font-medium text-gray-100 dark:text-white"
      >
        Title Search
      </label>
      <input
        id="titleSearch"
        className="rounded h-10 px-2 dark:bg-gray-800 dark:text-gray-100"
        type="text"
        onChange={(e) => {
          setTerm(e);
          setCurrentPage(0);
        }}
      ></input>
    </>
  );
};

export default TitleSearchComponent;
