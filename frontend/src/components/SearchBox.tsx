import React from "react";
import { SearchIcon } from "./Icons";

interface PropTypes {
  options: {
    All: string;
    "Category Name"?: string;
    "Student ID"?: string;
    "Student Name"?: string;
    ISBN?: string;
    "Book Name"?: string;
  };
  searchDataDebounced: any;
}

function SearchBox({ options, searchDataDebounced }: PropTypes) {
  const [selected, setSelected] = React.useState("all");
  const [searchData, setSearchData] = React.useState("");

  const optionOnChange = (event: any) => {
    setSelected(event.target.value);
    if (searchData) {
      console.log("searching data");
      searchDataDebounced({ [event.target.value]: searchData });
    }
  };

  const searchFieldOnChange = (event: any) => {
    setSearchData(event.target.value);
    searchDataDebounced({ [selected]: event.target.value });
  };

  return (
    <div>
      <select value={selected} onChange={optionOnChange}>
        {options &&
          Object.entries(options).map(([key, value]) => (
            <option key={key} label={key} value={value} />
          ))}
      </select>
      <input type="text" value={searchData} onChange={searchFieldOnChange} />
      <SearchIcon />
    </div>
  );
}

export default SearchBox;
