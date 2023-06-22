import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const DashboardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DashboardInfoCard = styled.div<any>`
  color: #fff;
  background-color: ${(props) => (props.background ? props.background : "red")};
  width: 100%;
  padding: 1rem;
  height: 100%;
`;

export const StyledLink = styled(NavLink)`
  display: block;
  margin: 0 0.5rem;
  width: 100%;
  min-width: 80px;
  height: 110px;
`;
