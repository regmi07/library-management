import { CustomTable, TableContainer, Status } from "@/styles/table";
import { Button } from "@/styles/button";
import { ReturnIcon, RenewIcon } from "@/components/Icons";
import { updateIssue } from "@/adapters/issues.adapter/issues";
import { toast } from "react-toastify";
import { useViewIssuedBookContext } from "@/contexts/view-issue_context/ViewIssueBookContext";

function ViewIssuedBooksTable() {
  const {
    issuedBook: { data },
    removeIssue,
  } = useViewIssuedBookContext();

  const handleReturn = (issueId: string) => {
    updateIssue(issueId, { returned: true })
      .then((response) => {
        if (response?.data?.update) {
          toast.success("Book returned successfully");
          removeIssue(issueId);
        } else toast.error("Something went wrong! Couldn't return the book");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong! Couldn't return the book");
      });
  };

  const getStatus = (returned: boolean, expired: boolean) => {
    if (returned) return "Returned";
    else if (expired) return "Expired";
    else return "Active";
  };

  const handleRenew = (issueId: string) => {
    updateIssue(issueId, { renew: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TableContainer>
      <CustomTable>
        <thead>
          <tr>
            <th scope="col">College Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">ISBN</th>
            <th scope="col">Book Name</th>
            <th scope="col">Issued On</th>
            <th scope="col">Due Date</th>
            <th scope="col">Fine</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((issue: any) => {
              return (
                <tr key={issue?.id}>
                  <td>{issue?.student?.collegeId}</td>
                  <td>{issue?.student?.name}</td>
                  <td>{issue?.bookId}</td>
                  <td>{issue?.book?.title}</td>
                  <td>{issue?.issueDate?.substring(0, 10)}</td>
                  <td>{issue?.expireDate?.substring(0, 10)}</td>
                  <td>Rs. {issue?.fine}</td>
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
                      onClick={() => handleReturn(issue?.id)}
                    >
                      <ReturnIcon size={15} />
                      <span>Return</span>
                    </Button>
                    <Button
                      disabled={!issue?.canRenew}
                      backgroundColor="green"
                      onClick={() => handleRenew(issue?.id)}
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

export default ViewIssuedBooksTable;
