import AddBookForm from "@/components/add-book/AddBookForm";
import BulkAddBook from "@/components/add-book/BulkAddModal/BulkAddBook";

function AddBook() {
  return (
    <>
      <BulkAddBook />
      <AddBookForm />
    </>
  );
}

export default AddBook;
