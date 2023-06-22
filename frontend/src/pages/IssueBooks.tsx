import IssueBooksForm from "@/components/issue-books/IssueBookForm/IssueBooksForm";
import { IssueBookPageContainer } from "./style";
import IssueBookImage from "@/components/issue-books/IssueBookImage/IssueBookImage";
import { IssueBookProvider } from "@/contexts/issue-books_context";

function IssueBooks() {
  return (
    <IssueBookProvider>
      <IssueBookPageContainer>
        <IssueBooksForm />
        <IssueBookImage />
      </IssueBookPageContainer>
    </IssueBookProvider>
  );
}

export default IssueBooks;
