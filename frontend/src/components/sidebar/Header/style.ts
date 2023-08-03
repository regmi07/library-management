import styled from "styled-components";

export const LogoContainer = styled.img<any>`
  display: block;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "25px")};
  width: 100%;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "140px")};
`;
