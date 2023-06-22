import { getAllIssuedBooks } from "@/adapters/issues.adapter/issues";
import { Button } from "@/styles/button";
import { CustomTable, Status, TableContainer } from "@/styles/table";
import React, { useEffect, useState } from "react";
import { RenewIcon, ReturnIcon } from "../Icons";

function StudentIssueInfo({ collegeId }: any) {
  const [issues, setIssues] = useState<any>(null);
  useEffect(() => {
    getAllIssuedBooks({ studentId: collegeId }).then((response) =>
      setIssues(response.data.data)
    );
  }, []);

  const getStatus = (returned: boolean, expired: boolean) => {
    if (returned) return "Returned";
    else if (expired) return "Expired";
    else return "Active";
  };

  console.log(issues);
  return (
    <TableContainer>
      <CustomTable>
        <thead>
          <tr>
            <th scope="col">ISBN</th>
            <th scope="col">Book Name</th>
            <th scope="col">Issued On</th>
            <th scope="col">Due Date</th>
            <th scope="col">Fine</th>
            <th scope="col">Renewed</th>
            <th scope="col">Last Renew</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues && issues?.length > 0 ? (
            issues.map((issue: any) => {
              function handleRenew(id: any) {
                throw new Error("Function not implemented.");
              }

              return (
                <tr key={issue?.id}>
                  <td>{issue?.bookId}</td>
                  <td>{issue?.book?.title}</td>
                  <td>{issue?.issueDate?.substring(0, 10)}</td>
                  <td>{issue?.expireDate?.substring(0, 10)}</td>
                  <td>Rs. {issue?.fine}</td>
                  <td>{issue?.totalRenew}</td>
                  <td>
                    {issue?.latestRenewDate
                      ? issue?.latestRenewDate?.substring(0, 10)
                      : "N/A"}
                  </td>
                  <td>
                    <Status
                      isExpired={issue?.isExpired}
                      isReturned={issue?.returned}
                    >
                      {getStatus(issue?.returned, issue?.isExpired)}
                    </Status>
                  </td>
                  <td>
                    <Button
                      disabled={issue?.returned}
                      backgroundColor="red"
                      // onClick={() => handleReturn(issue?.id)}
                    >
                      <ReturnIcon size={15} />
                      <span>Return</span>
                    </Button>
                    <Button
                      disabled={!issue?.canRenew}
                      backgroundColor="green"
                      // onClick={() => handleRenew(issue?.id)}
                    >
                      <RenewIcon size={15} />
                      <span>Renew</span>
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No active issue found</td>
            </tr>
          )}
        </tbody>
      </CustomTable>
    </TableContainer>
  );
}

export default StudentIssueInfo;
