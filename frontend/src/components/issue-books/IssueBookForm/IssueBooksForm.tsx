import { SaveIcon } from "../../Icons";
import {
  HorizontalLine,
  IssueBookBody,
  IssueBookContainer,
  Label,
  PrimaryButton,
  IssueDateContainer,
  Input,
} from "./styles";
import moment from "moment";
import StudentSelectComponent from "./StudentSelectComponent";
import { useIssueBookContext } from "@/contexts/issue-books_context";
import BooksSelectComponent from "./BooksSelectComponent";

function IssueBooksForm() {
  const {
    issue: { issueDate },
    issueBook,
  } = useIssueBookContext();

  return (
    <IssueBookContainer>
      <div style={{ padding: " 1rem 1.5rem" }}>
        <h3 style={{ fontWeight: 800 }}>Issue Book</h3>
      </div>
      <HorizontalLine />
      <IssueBookBody>
        <BooksSelectComponent />
        <StudentSelectComponent />
        <IssueDateContainer>
          <div style={{ flex: 1 }}>
            <Label>Date Issued</Label>
            <Input
              type="date"
              name="issue-date"
              id="issue-date"
              value={issueDate}
              readOnly
            />
          </div>
          <div style={{ flex: 1 }}>
            <Label>Return Date</Label>
            <Input
              type="date"
              name="return-date"
              id="return-date"
              disabled
              readOnly
              value={moment(issueDate).add(3, "day").format("YYYY-MM-DD")}
            />
          </div>
        </IssueDateContainer>
      </IssueBookBody>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "1.5rem",
        }}
      >
        <PrimaryButton onClick={issueBook}>
          <SaveIcon size={24} />
          <span style={{ marginLeft: ".5em" }}>Issue Book</span>
        </PrimaryButton>
      </div>
    </IssueBookContainer>
  );
}

export default IssueBooksForm;
