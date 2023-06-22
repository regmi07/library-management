import React from "react";
import { DashboardInfoCard as CardContainer, StyledLink } from "./styles";
import { NavLink } from "react-router-dom";

function DashboardInfoCard({
  total,
  name,
  background,
  route,
}: {
  total: number;
  name: string;
  route: string;
  background?: string;
}) {
  return (
    <StyledLink to={route}>
      <CardContainer background={background}>
        <h1 style={{ marginBottom: ".75rem" }}>{total ?? "0"}</h1>
        <p>{name}</p>
      </CardContainer>
    </StyledLink>
  );
}

export default DashboardInfoCard;
