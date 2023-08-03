import IssueBooksForm from "@/components/issue-books/IssueBookForm/IssueBooksForm";
import { IssueBookPageContainer } from "./style";
import IssueBookImage from "@/components/issue-books/IssueBookImage/IssueBookImage";
import { IssueBookProvider } from "@/contexts/issue-books_context";
import IssueBookStudentInfo from "@/components/issue-books/IssueBookStudentInfo/IssueBookStudentInfo";

function IssueBooks() {
  return (
    <IssueBookProvider>
      <IssueBookPageContainer>
        <IssueBooksForm />
        <div>
          <IssueBookImage />
          <IssueBookStudentInfo />
        </div>
      </IssueBookPageContainer>
    </IssueBookProvider>
  );
}

export default IssueBooks;
