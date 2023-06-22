import styled from "styled-components";

export const IssueBookContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const IssueBookBody = styled.div`
  padding: 0.25rem 1.5rem;
`;

export const InputContainer = styled.div`
  font-size: 1rem;
  width: 100%;
  padding: 0.75em 0;
  margin: 0 0.25em;
`;

export const Label = styled.p`
  padding: 0.25em 0;
  margin: 0.25em 0;
  text-transform: capitalize;
`;

export const HorizontalLine = styled.div`
  margin-top: 0.25em;
  border: 1px solid red;
`;

export const PrimaryButton = styled.button<any>`
  background-color: #4681f4;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  color: #fff;
  margin-top: 0.75em;
  border: none;
  cursor: pointer;
  padding: 0.6em 1.2em;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100%")};
`;

export const IssueDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2em;
`;

export const Input = styled.input`
  height: 40px;
  width: 100%;
  padding: 0.6em;
`;
