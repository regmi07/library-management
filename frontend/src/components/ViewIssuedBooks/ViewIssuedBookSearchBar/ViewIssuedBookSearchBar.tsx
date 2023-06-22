import PageSizeDropdown from "@/components/PageSizeDropdown";
import SearchBox from "@/components/SearchBox";
import { useViewIssuedBookContext } from "@/contexts/view-issue_context/ViewIssueBookContext";

const options = {
  All: "all",
  "Category Name": "categoryName",
  "Student ID": "studentId",
  "Student Name": "studentName",
  ISBN: "bookIsbn",
  "Book Name": "bookName",
};

function ViewIssuedBookSearchBar() {
  const {
    queryParams,
    updateQueryParams,
    searchDataDebounced,
    issuedBook: { count },
  } = useViewIssuedBookContext();

  // rest of the table implementation...
  const setPageSize = (value: number) => {
    updateQueryParams("limit", value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Render the table */}
      {/* ... */}

      {/* Render the page size dropdown */}
      <PageSizeDropdown
        pageSize={queryParams.limit}
        disabled={count <= queryParams.limit}
        onChange={setPageSize}
      />
      <SearchBox options={options} searchDataDebounced={searchDataDebounced} />
    </div>
  );
}

export default ViewIssuedBookSearchBar;
