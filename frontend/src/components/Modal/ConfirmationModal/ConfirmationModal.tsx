import {
  ModalOverlay,
  ModalContent,
  ModalWrapper,
  ModalTitle,
  ModalMessage,
  ModalButton,
  ModalButtonWrapper,
} from "../style";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmYes: () => void;
  onConfirmNo: () => void;
  modalTitle: string;
  confirmationMessage: string;
}

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirmYes,
  onConfirmNo,
  modalTitle,
  confirmationMessage,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalWrapper>
        <ModalContent onClick={(event) => event.stopPropagation()}>
          <ModalTitle>{modalTitle}</ModalTitle>
          <ModalMessage>{confirmationMessage}</ModalMessage>
          <ModalButtonWrapper>
            <ModalButton onClick={onConfirmYes}>Yes</ModalButton>
            <ModalButton onClick={onConfirmNo}>No</ModalButton>
          </ModalButtonWrapper>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>,
    document.body
  );
}

export default ConfirmationModal;
