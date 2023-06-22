import styled, { css } from "styled-components";
import { ErrorMessage, Field } from "formik";

export const InputField = styled(Field)`
  height: 40px;
  width: 100%;
  padding: 0.6em;
  margin-top: 0.6em;

  ${(props) =>
    props.readOnly &&
    css`
      background-color: #f0f0f0;
      cursor: not-allowed;
    `}
`;

export const Error = styled(ErrorMessage)`
  color: red;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;
