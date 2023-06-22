import styled from "styled-components";

export const Button = styled.button<any>`
  width: 100%;
  min-width: 75px;
  display: block;
  padding: 0.4em 0.35em;
  margin: 0.5em 0;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  color: ${(props) => props.color || "#fff"};
  background-color: ${(props) => props.backgroundColor};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  span {
    margin-left: 0.25em;
  }
`;

export const IconButton = styled.button<any>`
  width: 2.25rem;
  height: 2.25rem;
  padding: 0.35em;
  border-radius: 50%;
  border: none;
  margin: 0.25em;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};
  &__icon {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;
