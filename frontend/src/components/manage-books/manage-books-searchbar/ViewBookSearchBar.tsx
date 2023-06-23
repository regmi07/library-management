import { getBooks } from "@/adapters/books.adapter/books";
import PageSizeDropdown from "@/components/PageSizeDropdown";
import SearchBox from "@/components/SearchBox";
import { PrimaryButton } from "@/components/issue-books/IssueBookForm/styles";
import { useBooksContext } from "@/contexts/manage-books_context/ViewBookContext";
import flat from "flat";
import { createRef, useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";

const options = {
  All: "all",
  "Category Name": "category",
  ISBN: "isbn",
  "Book Name": "title",
  Author: "authors",
};

const headers = [
  { label: "ISBN", key: "isbn" },
  { label: "Title", key: "title" },
  { label: "Summary", key: "summary" },
  { label: "Authors", key: "authors" },
  { label: "Publisher", key: "publisher" },
  { label: "Published Date", key: "publishedDate" },
  { label: "Total Copies", key: "totalCopies" },
  { label: "Available Copies", key: "availableCopies" },
  { label: "Category", key: "category.category" },
  { label: "Sub Category", key: "subCategory.name" },
];

function ViewBookSearchBar() {
  const [flatenedData, setFlatenedData] = useState([]);

  const csvDownloadRef = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null);
  const { queryParams, updateQueryParams, searchBookDebounced } =
    useBooksContext();

  // rest of the table implementation...
  const setPageSize = (value: number) => {
    updateQueryParams("limit", value);
  };

  const downloadCsv = async () => {
    const data = await getBooks({ ...queryParams, limit: 100 });
    const flatened = data.data.data.map((d: any) => flat(d));
    setFlatenedData(flatened);
    setTimeout(() => {
      csvDownloadRef?.current?.link.click();
    }, 500);

    // console.log(flatenedData);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Render the table */}
      {/* ... */}

      {/* Render the page size dropdown */}
      <PageSizeDropdown
        pageSize={queryParams.limit}
        // disabled={count <= queryParams.limit}
        onChange={setPageSize}
      />
      <div
        style={{
          display: "flex",
          gap: ".5em",
          padding: "1em",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CSVLink
          data={flatenedData}
          filename={"books.csv"}
          headers={headers}
          ref={csvDownloadRef}
        />
        <PrimaryButton maxWidth="90px" onClick={downloadCsv}>
          Export
        </PrimaryButton>
        <SearchBox
          options={options}
          searchDataDebounced={searchBookDebounced}
        />
      </div>
    </div>
  );
}

export default ViewBookSearchBar;
