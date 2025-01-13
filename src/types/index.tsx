interface BookType {
  author: string;
  avg_rating: number;
  book_id: number;
  date_read: string | null;
  id: number;
  isbn: string;
  month_read: number;
  number_of_pages: number;
  title: string;
  user_rating: number;
  year_read: number;
}

// interface BookType {
//   "Book Id": number;
//   Title: any;
//   Author: string;
//   "Author l-f": string | null;
//   "Additional Authors": string | null;
//   ISBN: string;
//   ISBN13: string | null;
//   "My Rating": number;
//   "Average Rating": number;
//   Publisher: string | null;
//   Binding: string | null;
//   "Number of Pages": number;
//   "Year Published": number | string | null;
//   "Original Publication Year": number | string | null;
//   "Date Read": string | null;
//   "Date Added": string;
//   Bookshelves: string | null;
//   "Bookshelves with positions": string | null;
//   "Exclusive Shelf": string | null;
//   "My Review": string | null;
//   Spoiler: string | null;
//   "Private Notes": string | null;
//   "Read Count": number | null;
//   "Owned Copies": number | null;
// }

interface MonthObject {
  monthName: string;
  isLeapYearMonth: boolean;
  dayCount: number;
}

interface Book {
  title: string;
  author: string;
  numberOfPages: number;
  rating: number;
  averageRating: number;
  isbn: string;
  bookId: number;
  dateRead: string | null;
}

interface StatsType {
  books: number | undefined;
  pages: number | undefined;
  phrase: string;
}

export type { BookType, MonthObject, Book, StatsType };
