import React, { ChangeEvent } from "react";
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
import { Label } from "../add-book/style";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  saveData: (csvFile: any, images: FileList | null) => void;
}

function FileInputModal({ isOpen, onClose, saveData }: ModalProps) {
  const [csvData, setCSVData] = React.useState<any[]>([]);
  const [images, setImages] = React.useState<FileList | null>(null);

  const handleCSVFileLoaded = (data: any) => {
    console.log("this called");
    setCSVData(data.data);
  };

  const handleFolderSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const folder = event.target.files;
    console.log(folder);
    setImages(folder);
  };

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
            <div>
              <Label>Select folder (student photos)</Label>
              <input
                type="file"
                multiple
                webkitdirectory=""
                directory=""
                placeholder="Select a folder of student photos"
                onChange={handleFolderSelect}
              />
            </div>
          </ModalForm>
          {csvData?.length > 0 && <Preview_Csv data={csvData} />}
          <ModalButtonWrapper>
            {/* <ModalButton onClick={() => saveData(csvFile)}>Submit</ModalButton> */}
            <ModalButton onClick={() => saveData(csvData, images)}>
              Submit
            </ModalButton>

            <ModalButton onClick={onClose}>Cancel</ModalButton>
          </ModalButtonWrapper>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>,
    document.body
  );
}

export default FileInputModal;

// This is a hack:
// read this comment for more information: https://stackoverflow.com/questions/72787050/typescript-upload-directory-property-directory-does-not-exist-on-type
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
  }
}
