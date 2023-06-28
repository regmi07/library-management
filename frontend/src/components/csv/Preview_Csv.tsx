import { CustomTable, TableContainer } from "@/styles/table";
import React from "react";

interface CSVPreviewProps {
  data: any[];
}

const Preview_Csv: React.FC<CSVPreviewProps> = ({ data }) => {
  return (
    <TableContainer
      style={{
        maxHeight: "200px",
        overflowX: "hidden",
      }}
    >
      <CustomTable padding=".5em">
        <thead style={{ fontSize: "0.8rem" }}>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ fontSize: "0.8rem" }}>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value: any, index) => (
                <td key={index}>
                  {value.length > 10
                    ? `${value.substring(0, 10)}..`
                    : `${value}`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CustomTable>
    </TableContainer>
  );
};

export default Preview_Csv;
