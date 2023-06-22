import React, { ChangeEvent } from "react";
import { Input } from "../issue-books/IssueBookForm/styles";

interface PropType {
  image: File | null;
  setImage(value: File): void;
}

function UploadAndDisplayImage({ image, setImage }: PropType) {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div>
      <Input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div>
          <img
            src={URL.createObjectURL(image)}
            style={{ maxWidth: "200px" }}
            alt="Selected Image"
          />
        </div>
      )}
    </div>
  );
}

export default UploadAndDisplayImage;
