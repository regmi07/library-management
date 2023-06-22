export interface GetIssuedBookQueryType {
  studentId?: string;
  studentName?: string;
  bookIsbn?: string;
  bookName?: string;
  categoryName?: string;
  returned?: boolean | null;
  skip?: number;
  limit?: number;
}
