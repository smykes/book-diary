interface BookType {
  "Book Id": number;
  Title: any;
  Author: string;
  "Author l-f": string | null;
  "Additional Authors": string | null;
  ISBN: string;
  ISBN13: string | null;
  "My Rating": number;
  "Average Rating": number;
  Publisher: string | null;
  Binding: string | null;
  "Number of Pages": number;
  "Year Published": number | string | null;
  "Original Publication Year": number | string | null;
  "Date Read": string;
  "Date Added": string;
  Bookshelves: string | null;
  "Bookshelves with positions": string | null;
  "Exclusive Shelf": string | null;
  "My Review": string | null;
  Spoiler: string | null;
  "Private Notes": string | null;
  "Read Count": number | null;
  "Owned Copies": number | null;
}

interface MonthObject {
  monthName: string;
  isLeapYearMonth: boolean;
  dayCount: number;
}

interface Book {
  title: string;
  author: string;
  finishedDate: string;
  numberOfPages: number;
  rating: number;
  averageRating: number;
  isbn: string;
  bookId: number;
}

interface StatsType {
  books: number | undefined;
  pages: number | undefined;
  phrase: string;
}

export type { BookType, MonthObject, Book, StatsType };
