import React from "react";
import {
  ModalButton,
  ModalButtonWrapper,
  ModalContent,
  ModalForm,
  ModalMessage,
  ModalOverlay,
  ModalTitle,
  ModalWrapper,
} from "./style";
import ReactDOM from "react-dom";
import CSVInputField from "../csv/CSVInputField";
import Preview_Csv from "../csv/Preview_Csv";
import { bulkAddBook } from "@/adapters/books.adapter/books";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  saveData: (csvFile: any) => void;
}

function FileInputModal({ isOpen, onClose, saveData }: ModalProps) {
  const [csvData, setCSVData] = React.useState<any>(null);
  const [csvFile, setCsvFile] = React.useState<any>(null);

  const handleCSVFileLoaded = (data: any) => {
    console.log("this called");
    setCSVData(data.data);
    setCsvFile(data.file);
  };

  // const handleCsvFileSubmit = () => {
  //   const formData = new FormData();
  //   formData.append("file", csvFile);

  //   bulkAddBook(formData);
  //   onClose();
  // };

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <ModalTitle>Select a file</ModalTitle>
          <ModalMessage>This is a message for a modal</ModalMessage>
          <ModalForm>
            <CSVInputField onCSVFileLoaded={handleCSVFileLoaded} />
          </ModalForm>
          {csvData?.length > 0 && <Preview_Csv data={csvData} />}
          <ModalButtonWrapper>
            <ModalButton onClick={() => saveData(csvFile)}>Submit</ModalButton>
            <ModalButton onClick={onClose}>Cancel</ModalButton>
          </ModalButtonWrapper>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>,
    document.body
  );
}

export default FileInputModal;
