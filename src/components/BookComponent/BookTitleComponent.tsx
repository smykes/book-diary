function getParsedISBN(
  isbn: string | undefined,
  bookId: number
): string | undefined {
  return isbn?.split('"').pop();
}
interface BookTitleText {
  isbn: string | undefined;
  title: string;
  bookId: number;
}

export const BookTitle: React.FC<BookTitleText> = (props) => {
  const { isbn, title, bookId } = props;
  const parsedISBN = getParsedISBN(isbn, bookId);
  return (
    <>
      {parsedISBN && (
        <a
          className="underline text-lime-500 dark:text-orange-400"
          target="_blank"
          href={`//search.worldcat.org/search?q=${parsedISBN}`}
        >
          {title}
        </a>
      )}
      {!parsedISBN && <>{title}</>}
    </>
  );
};
