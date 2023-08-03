import React from "react";
import { LogoContainer } from "../sidebar/Header/style";
import { CopyrightInfo, FooterContainer } from "./style";

type Props = {};

const Footer = (props: Props) => {
  return (
    <FooterContainer>
      <CopyrightInfo>
        &#169; &nbsp;
        {new Date().getFullYear()}
        &nbsp; Itahari International College, All rights reserved
      </CopyrightInfo>
      <LogoContainer src="iiconly.png" marginTop="5px" maxWidth="80px" />
    </FooterContainer>
  );
};

export default Footer;
