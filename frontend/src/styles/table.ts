import styled from "styled-components";

export const TableContainer = styled.div``;

export const CustomTable = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;

  thead,
  tr,
  td,
  th {
    padding: 1.25em;
  }

  thead {
    font-size: 0.95rem;
    font-weight: 800;
    background-color: #4681f4;
    color: #fff;
  }

  tbody {
    font-size: 0.9rem;
    line-height: 1.25;
    text-transform: capitalize;
  }

  tr,
  td {
    border-bottom: 1px solid #e5e5e5;
  }
`;

export const Status = styled.div<any>`
  width: 100%;
  min-width: 70px;
  text-align: center;
  font-size: 0.9rem;
  padding: 0.15em 0.2em;
  font-weight: 800;
  border-radius: 4px;
  border: 2px solid
    ${(props) => {
      if (props.isReturned) return "#0F730D";
      else if (props.isExpired) return "#CA0B00";
      else return "#4681f4";
    }};
  color: ${(props) => {
    if (props.isReturned) return "#0F730D";
    else if (props.isExpired) return "#CA0B00";
    else return "#4681f4";
  }};
`;
