const FooterComponent = () => {
  return (
    <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) p-4 md:flex md:items-center md:justify-between">
        <span className="dark:text-neutral-400 text-sm text-gray-500 sm:text-center">
          🖤 Made with spite by{" "}
          <a
            href="//smykes.github.io/"
            className="underline hover:underline dark:text-neutral-200"
          >
            smykes
          </a>{" "}
          in Chicago 🖤
        </span>

        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a
              href="//github.com/smykes"
              className="underline hover:underline me-4 md:me-6 dark:text-neutral-200"
            >
              About
            </a>
          </li>
          <li>
            <span className="dark:text-neutral-400 text-sm text-gray-500 sm">
              Data last uploaded 4.29.25
            </span>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterComponent;
