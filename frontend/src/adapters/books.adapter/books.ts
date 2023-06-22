import { QueryType } from "@/types/query.interface";
import { get, patch, post, remove } from "../xhr";

interface BookType {
  isbn: string;
  title: string;
  category?: string;
  subCategory?: string;
  authors: string;
  publisher?: string | null;
  publishedDate?: string | null;
  totalCopies: number;
  image?: File | string | null;
}

export const getBooks = ({
  network,
  isbn,
  title,
  category,
  authors,
  limit,
  skip,
}: QueryType) => {
  let url = "books?";
  if (network) url += `network=${network}&`;
  if (isbn) url += `isbn=${isbn}&`;
  if (title) url += `title=${title}&`;
  if (category) url += `category=${category}&`;
  if (authors) url += `authors=${authors}&`;
  if (limit) url += `limit=${limit}&`;
  if (skip) url += `skip=${skip}&`;

  return get(url);
};

export const addBook = (bookDetails: BookType) => {
  return post("books", bookDetails);
};

export const deleteBook = (isbn: string) => {
  return remove(`books/${isbn}`);
};

export const updateBookRequest = (isbn: string, bookDetails: BookType) => {
  return patch(`books/${isbn}`, bookDetails);
};
