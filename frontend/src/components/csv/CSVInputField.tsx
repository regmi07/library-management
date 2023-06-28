import React, { ChangeEvent } from "react";
import Papa from "papaparse";
import { Input } from "../issue-books/IssueBookForm/styles";

interface CSVFileInputProps {
  onCSVFileLoaded: (data: any) => void;
}

const CSVInputField: React.FC<CSVFileInputProps> = ({ onCSVFileLoaded }) => {
  console.log("this called");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    console.log("handleFileChange called");
    const file = event.target.files && event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log(results);
          onCSVFileLoaded({
            data: results.data,
            file,
          });
        },
      });
    }
  };
  return (
    <div>
      <Input
        type="file"
        accept=".csv"
        value={undefined}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CSVInputField;
