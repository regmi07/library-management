import { getAllCategories } from "@/adapters/categories.adapter/categories";
import { useEffect, useState } from "react";
import { InputContainer, Label } from "../issue-books/IssueBookForm/styles";
import SelectComponent from "./SelectComponent";

function CategorySelectComponent({ selected, onSelectedChange }: any) {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getAllCategories().then((categories) => {
      setCategories(categories.data.data);
      onSelectedChange(categories.data.data[0]);
    });
  }, []);

  return (
    <>
      <InputContainer>
        <Label>Category</Label>
        <SelectComponent
          idKey="catgory_id"
          labelKey="category"
          data={categories}
          selectedValue={selected}
          setSelectedValue={onSelectedChange}
        />
      </InputContainer>
    </>
  );
}

export default CategorySelectComponent;
