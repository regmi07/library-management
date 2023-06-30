import { bulkAddStudent } from "@/adapters/student.adapter/student";
import FileInputModal from "@/components/Modal/FIleInputModal";
import React from "react";

function BulkAddStudent() {
  const [open, setOpen] = React.useState(false);

  const handleOnClose = () => {
    setOpen(!open);
  };

  const saveData = (csvFile: any) => {
    const formData = new FormData();
    formData.append("file", csvFile);

    bulkAddStudent(formData);
    handleOnClose();
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Bulk add Student</button>
      <FileInputModal
        isOpen={open}
        onClose={handleOnClose}
        saveData={saveData}
      />
    </div>
  );
}

export default BulkAddStudent;
