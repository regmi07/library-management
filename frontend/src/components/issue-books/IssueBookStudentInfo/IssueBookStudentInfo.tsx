import { useIssueBookContext } from "@/contexts/issue-books_context";
import { Status } from "@/styles/table";
import { IssueInfo, IssueInfoContainer } from "./style";

const style = {
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
};

function IssueBookStudentInfo() {
  const {
    issue: { student },
  } = useIssueBookContext();

  return (
    <IssueInfoContainer>
      <h4>Active Issues</h4>
      {student?.issue?.length > 0 ? (
        student?.issue?.map((singleIssue: any) => {
          return (
            <div key={singleIssue?.id}>
              <IssueInfo>{singleIssue?.book?.title}</IssueInfo>
              <IssueInfo>Renew: {singleIssue?.totalRenew}</IssueInfo>
              <Status
                isExpired={singleIssue?.isExpired}
                isReturned={singleIssue?.returned}
                marginTop="0.3em"
              >
                {singleIssue?.isExpired ? "Expired" : "Active"}
              </Status>
            </div>
          );
        })
      ) : (
        <IssueInfo>No active issue found!</IssueInfo>
      )}
    </IssueInfoContainer>
  );
}

export default IssueBookStudentInfo;
