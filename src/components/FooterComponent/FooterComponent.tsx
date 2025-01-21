const FooterComponent = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          🖤 Made with spite by{" "}
          <a href="//smykes.github.io/" className="hover:underline">
            smykes
          </a>{" "}
          in Chicago 🖤
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a
              href="//github.com/smykes"
              className="hover:underline me-4 md:me-6"
            >
              About
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterComponent;
