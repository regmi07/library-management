import { Label } from "@/components/add-book/style";
import { useField } from "formik";
import React, { ChangeEvent, useState } from "react";

interface FileInputAndPreviewProps {
  field: any;
  form: {
    setFieldValue: (field: string, value: any) => void;
  };
}

function FileInputAndPreview({
  field,
  form,
  ...props
}: FileInputAndPreviewProps) {
  const [preview, setPreview] = useState<string | undefined>("");
  const [_, meta] = useField(field);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    form.setFieldValue(field.name, file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(undefined);
    }
  };

  return (
    <>
      <Label htmlFor="file">Student Image</Label>
      <input
        type="file"
        id="file"
        name="file"
        value={undefined}
        placeholder="Select Student File"
        onChange={handleChange}
      />
      {preview && (
        <img src={preview} style={{ maxWidth: "200px" }} alt="Preview" />
      )}
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </>
  );
}

export default FileInputAndPreview;
