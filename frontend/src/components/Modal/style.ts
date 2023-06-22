import styled from "styled-components";

export const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;
`;

export const ModalWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  width: 100%;
  padding: 20px;
  position: relative;
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  margin: 0;
`;

export const ModalMessage = styled.p`
  font-size: 16px;
  margin: 20px 0;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  // flex-direction: row;
`;

export const ModalInput = styled.input`
  margin-bottom: 10px;
  min-width: 200px;
  width: 100%;
  padding: 8px;
`;

export const ModalButtonWrapper = styled.div`
  float: center;
`;

export const ModalButton = styled.button`
  background-color: #446cf6;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  margin: 0.25em;
`;
