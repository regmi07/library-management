import { getAllSubCategoryByCategories } from "@/adapters/categories.adapter/categories";
import React, { useEffect, useState } from "react";
import { InputContainer, Label } from "../issue-books/IssueBookForm/styles";
import SelectComponent from "./SelectComponent";

function SubCategorySelectComponent({
  selectedCategory,
  selectedSubCategory,
  onSelectedChange,
}: any) {
  const [subCategories, setSubCategories] = useState(null);
  // const [selectedValue, setSelectedValue] = useState(selected);

  useEffect(() => {
    getAllSubCategoryByCategories(selectedCategory?.catgory_id).then(
      (subCategories) => {
        setSubCategories(subCategories.data.data);
      }
    );
  }, [selectedCategory]);

  // const setValue = (id: string) => {
  //   console.log(id);
  //   console.log("value seted");
  // };

  return (
    <>
      <InputContainer>
        <Label>Sub Category</Label>
        <SelectComponent
          idKey="subCategoryId"
          labelKey="name"
          data={subCategories}
          // setValue={setValue}
          selectedValue={selectedSubCategory}
          setSelectedValue={onSelectedChange}
        />
      </InputContainer>
    </>
  );
}

export default SubCategorySelectComponent;
