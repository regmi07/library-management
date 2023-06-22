import ViewBookSearchBar from "@/components/manage-books/manage-books-searchbar/ViewBookSearchBar";
import ManageBooksTable from "@/components/manage-books/manage-books-table/ManageBooksTable";
import { ViewBookProvider } from "@/contexts/manage-books_context/ViewBookContext";

function ManageBooks() {
  return (
    <ViewBookProvider>
      <div>
        <ViewBookSearchBar />
        <ManageBooksTable />
      </div>
    </ViewBookProvider>
  );
}

export default ManageBooks;
