interface BookType {
  "Book Id": number;
  Title: any;
  Author: string;
  "Author l-f": string;
  "Additional Authors": string;
  ISBN: string;
  ISBN13: string | null;
  "My Rating": number;
  "Average Rating": number;
  Publisher: string;
  Binding: string;
  "Number of Pages": number;
  "Year Published": number | string;
  "Original Publication Year": number | string;
  "Date Read": string;
  "Date Added": string;
  Bookshelves: string;
  "Bookshelves with positions": string;
  "Exclusive Shelf": string;
  "My Review": string;
  Spoiler: string;
  "Private Notes": string;
  "Read Count": number;
  "Owned Copies": number;
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
