import { bulkAddBook } from "@/adapters/books.adapter/books";
import FileInputModal from "@/components/Modal/FIleInputModal";
import React from "react";

function BulkAddBook() {
  const [open, setOpen] = React.useState(false);

  const handleOnClose = () => {
    setOpen(!open);
  };

  const saveData = (csvFile: any) => {
    const formData = new FormData();
    formData.append("file", csvFile);

    bulkAddBook(formData);
    handleOnClose();
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Bulk add book</button>
      <FileInputModal
        isOpen={open}
        onClose={handleOnClose}
        saveData={saveData}
      />
    </div>
  );
}

export default BulkAddBook;
