import { getBooks } from "@/adapters/books.adapter/books";
import PageSizeDropdown from "@/components/PageSizeDropdown";
import SearchBox from "@/components/SearchBox";
import { useBooksContext } from "@/contexts/manage-books_context/ViewBookContext";
import flat from "flat";
import { createRef, useEffect, useState } from "react";
import { CSVLink } from "react-csv";

const options = {
  All: "all",
  "Category Name": "category",
  ISBN: "isbn",
  "Book Name": "title",
  Author: "authors",
};

function ViewBookSearchBar() {
  const [flatenedData, setFlatenedData] = useState([]);

  // const DownloadCsvRef = createRef();

  const { queryParams, updateQueryParams, searchBookDebounced } =
    useBooksContext();

  // useEffect(() => {
  //   if (flatenedData.length > 0) {
  //     DownloadCsvRef.current.link.click();
  //   }
  // });

  // rest of the table implementation...
  const setPageSize = (value: number) => {
    updateQueryParams("limit", value);
  };

  const downloadCsv = async () => {
    console.log(queryParams);
    const data = await getBooks({ ...queryParams, limit: 100 });
    const flatened = data.data.data.map((d: any) => flat(d));
    setFlatenedData(flatened);
    console.log(flatenedData);
  };

  console.log(flatenedData);

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
        }}
      >
        <CSVLink
          data={flatenedData}
          filename={"books.csv"}
          // ref={DownloadCsvRef}
          style={{
            backgroundColor: "coral",
            padding: ".25em .5em",
            borderRadius: "5px",
          }}
          onClick={downloadCsv}
        >
          Download csv
        </CSVLink>
        <SearchBox
          options={options}
          searchDataDebounced={searchBookDebounced}
        />
      </div>
    </div>
  );
}

export default ViewBookSearchBar;
