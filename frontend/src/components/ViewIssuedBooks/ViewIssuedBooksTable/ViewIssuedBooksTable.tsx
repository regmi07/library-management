import { CustomTable, TableContainer, Status } from "@/styles/table";
import { Button } from "@/styles/button";
import { ReturnIcon, RenewIcon } from "@/components/Icons";
import { updateIssue } from "@/adapters/issues.adapter/issues";
import { toast } from "react-toastify";
import { useViewIssuedBookContext } from "@/contexts/view-issue_context/ViewIssueBookContext";
import { useState } from "react";
import ConfirmationModal from "@/components/Modal/ConfirmationModal/ConfirmationModal";

function ViewIssuedBooksTable() {
  const {
    issuedBook: { data },
    removeIssue,
  } = useViewIssuedBookContext();

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);

  const [selectedIssue, setSelectedIssue] = useState("");

  // return modal related code
  const handleReturnModalOpen = (issueId: string) => {
    setSelectedIssue(issueId);
    setShowReturnModal(true);
  };

  const handleReturnModalClose = () => {
    setSelectedIssue("");
    setShowReturnModal(false);
  };

  const handleReturnModalConfirmYes = () => {
    updateIssue(selectedIssue, { returned: true })
      .then((response) => {
        if (response?.data?.update) {
          toast.success("Book returned successfully");
          removeIssue(selectedIssue);
        } else toast.error("Something went wrong! Couldn't return the book");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong! Couldn't return the book");
      })
      .finally(() => {
        setSelectedIssue("");
        setShowReturnModal(false);
      });
  };

  const handleReturnModalConfirmNo = () => {
    setSelectedIssue("");
    setShowReturnModal(false);
  };

  // renew modal related code
  const handleRenewModalOpen = (issueId: string) => {
    console.log("handle renew modal open");
    setSelectedIssue(issueId);
    setShowRenewModal(true);
  };

  const handleRenewModalClose = () => {
    setSelectedIssue("");
    setShowRenewModal(false);
  };

  const handleRenewModalConfirmYes = () => {
    console.log("yes in renew clicked");
    updateIssue(selectedIssue, { renew: true })
      .then((response) => {
        if (response?.data?.update) {
          toast.success("Book renewed successfully");
          removeIssue(selectedIssue);
        } else toast.error("Something went wrong! Couldn't renew the book");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong! Couldn't renewing the book");
      })
      .finally(() => {
        setSelectedIssue("");
        setShowRenewModal(false);
      });
  };

  const handleRenewModalConfirmNo = () => {
    setSelectedIssue("");
    setShowRenewModal(false);
  };

  const getStatus = (returned: boolean, expired: boolean) => {
    if (returned) return "Returned";
    else if (expired) return "Expired";
    else return "Active";
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
            <th scope="col">Latest Renew Date</th>
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
                  <td>
                    {issue?.latestRenewDate
                      ? issue?.latestRenewDate?.substring(0, 10)
                      : "N/A"}
                  </td>
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
                      onClick={() => handleReturnModalOpen(issue?.id)}
                    >
                      <ReturnIcon size={15} />
                      <span>Return</span>
                    </Button>
                    <Button
                      disabled={!issue?.canRenew}
                      backgroundColor="green"
                      onClick={() => handleRenewModalOpen(issue?.id)}
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
      <ConfirmationModal
        isOpen={showReturnModal}
        onClose={handleReturnModalClose}
        onConfirmYes={handleReturnModalConfirmYes}
        onConfirmNo={handleReturnModalConfirmNo}
        modalTitle="Return Book"
        confirmationMessage={`Are you sure you want to return the book?`}
      />
      <ConfirmationModal
        isOpen={showRenewModal}
        onClose={handleRenewModalClose}
        onConfirmYes={handleRenewModalConfirmYes}
        onConfirmNo={handleRenewModalConfirmNo}
        modalTitle="Renew Book"
        confirmationMessage={`Are you sure you want to renew the book?`}
      />
    </TableContainer>
  );
}

export default ViewIssuedBooksTable;
