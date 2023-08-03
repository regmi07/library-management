import { bulkAddStudent } from "@/adapters/student.adapter/student";
import FileInputModal from "@/components/Modal/FIleInputModal";
import React from "react";
import { toast } from "react-toastify";

function BulkAddStudent() {
  const [open, setOpen] = React.useState(false);

  const handleOnClose = () => {
    setOpen(!open);
  };

  const saveData = (csvFile: any, images: FileList | null) => {
    const formData = new FormData();
    if (images?.length) {
      for (const image of images) {
        formData.append("images", image);
      }
    }

    formData.append("datas", JSON.stringify(csvFile));

    bulkAddStudent(formData).then((response) => {
      console.log(response);
      toast.info(response.data.message);
    });
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
