import { GetIssuedBookQueryType } from "@/types/get_issued_books.interface";
import { post, get, patch } from "../xhr/index";

interface IssueBookType {
  studentId: string;
  bookId: string;
}

interface RenewReturnType {
  renew?: boolean;
  returned?: boolean;
}

export const issueNewBook = (data: IssueBookType) => {
  return post("issues", data);
};

export const getAllIssuedBooks = (params: GetIssuedBookQueryType) => {
  let query = "issues?";
  if (params.studentId) query += `studentId=${params.studentId}&`;
  if (params.studentName) query += `studentName=${params.studentName}&`;
  if (params.bookIsbn) query += `bookIsbn=${params.bookIsbn}&`;
  if (params.bookName) query += `bookName=${params.bookName}&`;
  if (params.categoryName) query += `categoryName=${params.categoryName}&`;
  if (typeof params.returned === "boolean")
    query += `returned=${params.returned}&`;
  if (params.skip) query += `skip=${params.skip}&`;
  if (params.limit) query += `limit=${params.limit}&`;
  return get(query);
};

export const updateIssue = (issueId: string, data: RenewReturnType) => {
  return patch(`issues/${issueId}`, data);
};
