import { KeyboardEvent, ChangeEvent, useState } from "react";
import { Input, PrimaryButton } from "../issue-books/IssueBookForm/styles";
import CategorySelectComponent from "../SelectComponents/CategorySelectComponent";
import UploadAndDisplayImage from "../UploadAndDisplayImage/UploadAndDisplayImage";
import { addBook, getBooks } from "@/adapters/books.adapter/books";
import { toast } from "react-toastify";
import { Label, MainContainer, TextFieldWrapper } from "./style";

interface IBook {
  isbn: string;
  title: string;
  authors: string;
  publisher?: string;
  publishedDate?: string;
  category: string;
  totalCopies: number;
  summary: string;
  image: File | null;
}

const initialState = {
  isbn: "",
  title: "",
  authors: "",
  publisher: "",
  publishedDate: "",
  category: "",
  totalCopies: 0,
  summary: "",
  image: null,
};
function AddBookForm() {
  const [bookDetails, setBookDetails] = useState<IBook>(initialState);

  const handleBookDetailsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBookDetails({ ...bookDetails, [event.target.name]: event.target.value });
  };

  // const changeImage = (imageFile: File) => {
  //   setBookDetails({ ...bookDetails, image: imageFile });
  // };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      if (bookDetails.isbn.length >= 10) {
        getBooks({ network: bookDetails.isbn }).then((book) => {
          if (!book.data.hasOwnProperty("found")) setBookDetails(book.data);
          else toast.error(`Book with the isbn ${bookDetails.isbn} not found!`);
        });
      } else toast.error("Invalid ISBN! ISBN must be at least 10 characters");
    }
  };

  const addNewBook = () => {
    addBook(bookDetails)
      .then((response) => {
        if (response.status === 201) {
          setBookDetails(initialState);
          toast.success(`Book added successfully!`);
        }
      })
      .catch((error) => {
        if (Array.isArray(error?.response?.data?.message)) {
          toast.error(error?.response?.data?.message[0]);
        } else {
          toast.error(error?.response?.data?.message);
        }
      });
  };

  return (
    <MainContainer>
      <TextFieldWrapper>
        <Label htmlFor="isbn">ISBN</Label>
        <Input
          type="text"
          name="isbn"
          id="isbn"
          value={bookDetails.isbn ?? ""}
          onChange={handleBookDetailsChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter ISBN and press TAB to search book online"
          required
        />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <Label htmlFor="title">Book Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          value={bookDetails.title ?? ""}
          onChange={handleBookDetailsChange}
          placeholder="Enter a book title"
          required
        />
      </TextFieldWrapper>
      <CategorySelectComponent />
      <TextFieldWrapper>
        <Label htmlFor="authors">Authors</Label>
        <Input
          type="text"
          name="authors"
          id="authors"
          value={bookDetails.authors ?? ""}
          onChange={handleBookDetailsChange}
          placeholder="Enter authors (if more than one seperate the author by comma)"
          required
        />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <Label htmlFor="publisher">Publisher</Label>
        <Input
          type="text"
          name="publisher"
          id="publisher"
          value={bookDetails.publisher ?? ""}
          onChange={handleBookDetailsChange}
          placeholder="Enter a publisher"
        />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <Label htmlFor="publishedDate">Published Date</Label>
        <Input
          type="date"
          name="publishedDate"
          id="publishedDate"
          value={bookDetails.publishedDate ?? ""}
          onChange={handleBookDetailsChange}
        />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <Label htmlFor="totalCopies">Total Copies</Label>
        <Input
          type="number"
          name="totalCopies"
          id="totalCopies"
          value={bookDetails.totalCopies ?? 0}
          onChange={handleBookDetailsChange}
          required
        />
      </TextFieldWrapper>
      {/* <UploadAndDisplayImage image={bookDetails.image} setImage={changeImage} /> */}
      <PrimaryButton onClick={addNewBook}>Add Book</PrimaryButton>
    </MainContainer>
  );
}

export default AddBookForm;
