import React from "react";
import { LogoContainer } from "./style";
import logo from "/iiconly.png";

function Header() {
  return (
    <div>
      <div style={{ marginTop: "3em" }}>
        <LogoContainer src={logo} alt="Itahari International College logo" />
      </div>
    </div>
  );
}

export default Header;
