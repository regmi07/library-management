import styled from "styled-components";

export const ImageContainer = styled.img<any>`
  width: 100%;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "250px")};
  display: block;
`;
