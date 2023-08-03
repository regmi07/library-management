import { bulkAddBook } from "@/adapters/books.adapter/books";
import FileInputModal from "@/components/Modal/FIleInputModal";
import { PrimaryButton } from "@/components/issue-books/IssueBookForm/styles";
import React from "react";
import { toast } from "react-toastify";

function BulkAddBook() {
  const [open, setOpen] = React.useState(false);

  const handleOnClose = () => {
    setOpen(!open);
  };

  const saveData = (csvData: any, images?: FileList | null) => {
    bulkAddBook(csvData).then((response) => {
      toast.info(response.data.message);
    });
    handleOnClose();
  };

  return (
    <div>
      <PrimaryButton maxWidth="155px" onClick={() => setOpen(true)}>
        Bulk add book
      </PrimaryButton>
      <FileInputModal
        isOpen={open}
        onClose={handleOnClose}
        saveData={saveData}
      />
    </div>
  );
}

export default BulkAddBook;
