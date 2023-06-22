import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SidebarContainer = styled.div`
  height: 100vh;
  background-color: #383c7a;
  max-width: 260px;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4em;
`;

export const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 0.35rem;
  margin: 0.75rem auto;
  font-size: 1.1rem;
  &:hover {
    background-color: #6369bb;
  }
`;
