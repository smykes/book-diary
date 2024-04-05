import bookTitleStyles from "./BookTitleComponent.module.scss";

function getParsedISBN(
  isbn: string | undefined,
  bookId: number
): string | undefined {
  console.log(bookId);
  console.log("-------");
  return isbn?.split('"').pop();
  // const match = isbn.match(/=\\"(\d{10})/g);
  // if (match) {
  //   console.log(match);
  //   return match[1];
  // }
  // console.log(match);
  // return "";
}
interface BookTitleText {
  isbn: string | undefined;
  title: string;
  bookId: number;
}

export const BookTitle: React.FC<BookTitleText> = (props) => {
  const { isbn, title, bookId } = props;
  console.log(bookId);
  const parsedISBN = getParsedISBN(isbn, bookId);
  return (
    <>
      {parsedISBN && (
        <a
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
