const NoResultsCommponent = () => {
  return (
    <div
      id="informational-banner"
      className="rounded-lg flex flex-col justify-between w-full p-4 border-b border-gray-200 md:flex-row bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="mb-4 md:mb-0 md:me-4">
        <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
          Something happened...
        </h3>
        <p className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
          Choose your fate:
        </p>
        <p className="flex items-center text-sm font-normal text-gray-50 dark:text-gray-50">
          {" "}
          <ul className="dark:text-gray-50 text-gray-900 ">
            <li>I had not started using a Kindle yet.</li>
            <li>The date is in the future.</li>
            <li>
              There are books that have been read but a new export hasn't been
              done yet.
            </li>
            <li>There were no books read during this time period.</li>
            <li>Some other scenario I can't think of.</li>
            <li>👻 Gohsts in the machine... spooky.</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default NoResultsCommponent;
