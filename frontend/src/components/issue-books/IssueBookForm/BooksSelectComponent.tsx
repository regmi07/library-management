import React from "react";
import { InputContainer, Label } from "./styles";
import SelectComponent from "../../SelectComponents/SelectComponent";
import { getBooks } from "@/adapters/books.adapter/books";
import { useIssueBookContext } from "@/contexts/issue-books_context";

function BooksSelectComponent() {
  const [books, setBooks] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState("");

  const { setIsbn } = useIssueBookContext();

  React.useEffect(() => {
    getBooks({ limit: 5 }).then((books) => {
      setBooks(books.data.data);
    });
  }, []);

  return (
    <>
      <InputContainer>
        <Label>Book ISBN</Label>
        <SelectComponent
          idKey="isbn"
          labelKey="isbn"
          selectFor="books"
          data={books}
          setValue={setIsbn}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </InputContainer>
      <InputContainer>
        <Label>Book Title</Label>
        <SelectComponent
          idKey="isbn"
          labelKey="title"
          selectFor="books"
          data={books}
          setValue={setIsbn}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </InputContainer>
    </>
  );
}

export default BooksSelectComponent;
