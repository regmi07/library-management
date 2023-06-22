import { getAllCategories } from "@/adapters/categories.adapter/categories";
import { useEffect, useState } from "react";
import { InputContainer, Label } from "../issue-books/IssueBookForm/styles";
import SelectComponent from "./SelectComponent";

function CategorySelectComponent({ selected, onSelectedChange }: any) {
  const [categories, setCategories] = useState(null);
  // const [selectedValue, setSelectedValue] = useState(selected);

  useEffect(() => {
    getAllCategories().then((categories) => {
      setCategories(categories.data.data);
    });
  }, []);

  // const setValue = (id: string) => {
  //   console.log(id);
  //   console.log("value seted");
  // };

  return (
    <>
      <InputContainer>
        <Label>Category</Label>
        <SelectComponent
          idKey="catgory_id"
          labelKey="category"
          data={categories}
          // setValue={setValue}
          selectedValue={selected}
          setSelectedValue={onSelectedChange}
        />
      </InputContainer>
    </>
  );
}

export default CategorySelectComponent;
