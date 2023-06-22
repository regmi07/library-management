import styled from "styled-components";

export const StudentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5em;
  background-color: #383c7a;
  color: #fff;
  padding: 1em 2em;
  margin-bottom: 1em;
`;

export const NameHeader = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 2rem;
  text-transform: capitalize;
`;

export const StudentInfoP = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 0.3em;
`;
