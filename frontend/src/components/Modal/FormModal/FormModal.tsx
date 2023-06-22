import Modal from "@/components/update/Modal";
import {
  ModalOverlay,
  ModalContent,
  ModalWrapper,
  ModalTitle,
  ModalMessage,
  ModalButton,
  ModalButtonWrapper,
  ModalForm,
  ModalInput,
} from "../style";
import ReactDOM from "react-dom";
import CategorySelectComponent from "@/components/SelectComponents/CategorySelectComponent";
import { useEffect, useState } from "react";
import { Label } from "@/components/issue-books/IssueBookForm/styles";
import SubCategorySelectComponent from "@/components/SelectComponents/SubCategorySelectComponent";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmYes: (payload: any) => void;
  onConfirmNo: () => void;
  modalTitle: string;
  confirmationMessage: string;
  data: any;
  notEditableList: any;
}

function FormModal({
  isOpen,
  onClose,
  onConfirmYes,
  onConfirmNo,
  modalTitle,
  confirmationMessage,
  data,
  notEditableList,
}: ModalProps) {
  const [formData, setFormData] = useState<any>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const isEditable = (name: string) => {
    return !notEditableList.includes(name.toLowerCase());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const parsedValue = e.target.type === "number" ? parseInt(value) : value;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleCategoryChange = (value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      category: value,
      subCategory: null,
    }));
  };

  const handleSubCategoryChange = (value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      subCategory: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const { category, subCategory, ...updatedData } = formData;
    const updatedCategory = category ? category.catgory_id : null;
    const updatedSubCategory = subCategory ? subCategory.subCategoryId : null;

    let payload;

    if (updatedCategory || subCategory) {
      payload = {
        ...updatedData,
        category: updatedCategory,
        subCategory: updatedSubCategory,
      };
    }

    payload = updatedData;

    onConfirmYes(payload);
  };

  if (!isOpen) {
    return null;
  }

  if (!formData) return <h1>No data</h1>;

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalWrapper>
        <ModalContent onClick={(event) => event.stopPropagation()}>
          <ModalTitle>{modalTitle}</ModalTitle>
          <ModalMessage>{confirmationMessage}</ModalMessage>
          <ModalForm>
            {Object.entries(formData).map(([key, value], index) => {
              if (!isEditable(key)) return;

              if (key === "category") {
                return (
                  <CategorySelectComponent
                    key={index}
                    name={key}
                    selected={value}
                    onSelectedChange={handleCategoryChange}
                  />
                );
              } else if (key === "subCategory") {
                return (
                  <SubCategorySelectComponent
                    key={index}
                    selectedCategory={formData["category"]}
                    selectedSubCategory={value}
                    onSelectedChange={handleSubCategoryChange}
                  />
                );
              } else {
                return (
                  <div key={index} style={{ flex: 1 }}>
                    <Label>{key}</Label>
                    <ModalInput
                      type={typeof value === "number" ? "number" : "text"}
                      name={key}
                      value={value ? `${value}` : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                );
              }
            })}
          </ModalForm>
          <ModalButtonWrapper>
            <ModalButton onClick={handleSubmit}>Edit</ModalButton>
            <ModalButton onClick={onConfirmNo}>Cancel</ModalButton>
          </ModalButtonWrapper>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>,
    document.body
  );
}

export default FormModal;
