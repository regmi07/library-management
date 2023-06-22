import ViewIssuedBooksTable from "@/components/ViewIssuedBooks/ViewIssuedBooksTable/ViewIssuedBooksTable";
import ViewIssuedBookSearchBar from "@/components/ViewIssuedBooks/ViewIssuedBookSearchBar/ViewIssuedBookSearchBar";
import { ViewIssuedBookProvider } from "@/contexts/view-issue_context/ViewIssueBookContext";

function ViewIssuedBooks() {
  return (
    <ViewIssuedBookProvider>
      <div>
        <ViewIssuedBookSearchBar />
        <ViewIssuedBooksTable />
      </div>
    </ViewIssuedBookProvider>
  );
}

export default ViewIssuedBooks;
