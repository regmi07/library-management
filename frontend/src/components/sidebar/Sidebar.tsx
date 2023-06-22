import React from "react";
import { SidebarContainer, StyledNavLink } from "./style";
import Header from "./Header/Header";
import { SIDEBAR_DATA } from "./SidebarData";

function Sidebar() {
  return (
    <SidebarContainer>
      <Header />
      <div style={{}}>
        {SIDEBAR_DATA.map((sidebar) => {
          return (
            <StyledNavLink to={sidebar.path} key={sidebar.id}>
              <sidebar.icon />
              <span style={{ marginLeft: ".5em" }}>{sidebar.name}</span>
            </StyledNavLink>
          );
        })}
      </div>
    </SidebarContainer>
  );
}

export default Sidebar;
