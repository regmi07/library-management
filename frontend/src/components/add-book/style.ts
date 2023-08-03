import styled from "styled-components";

export const MainContainer = styled.div`
  max-width: 920px;
  width: 100%;
  margin: auto;
`;

export const TextFieldWrapper = styled.div`
  margin-bottom: 2em;
`;

export const Label = styled.label<any>`
  margin-bottom: 0.5em;
  position: relative;
  display: inline-block;

  &::after {
    content: ${(props) => (props.required ? '"*"' : '""')};
    color: red;
    position: absolute;
    top: 0;
    right: -1rem;
    font-size: 1.2rem;
  }
`;
