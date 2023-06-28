import FileInputModal from "@/components/Modal/FIleInputModal";
import React from "react";

function BulkAddBook() {
  const [open, setOpen] = React.useState(false);

  const [csvFile, setCsvFile] = React.useState();

  const handleOnClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Bulk add book</button>
      <FileInputModal isOpen={open} onClose={handleOnClose} />
    </div>
  );
}

export default BulkAddBook;
