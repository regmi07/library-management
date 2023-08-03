import React, { useState } from "react";
import { Label } from "../add-book/style";
import { Input, PrimaryButton } from "../issue-books/IssueBookForm/styles";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { addCategory } from "@/adapters/categories.adapter/categories";
import { toast } from "react-toastify";
import { InputDiv } from "../settings/styles";

function AddCategory() {
  const [category, setCategory] = useState({
    category: "",
    subCategories: [],
  });

  const handleCategoryChange = (event: any) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
  };

  const handleTagsChange = (tags: any) => {
    setCategory({ ...category, subCategories: tags });
  };

  const handleAdd = () => {
    addCategory(category)
      .then((response) => {
        if (response.status === 201)
          toast.success(
            `Category created successfully ${response.data.category}`
          );
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <InputDiv>
        <Label htmlFor="category">Category</Label>
        <Input
          name="category"
          value={category.category}
          maxWidth="600px"
          onChange={handleCategoryChange}
        />
      </InputDiv>
      <InputDiv style={{ marginTop: "1em" }}>
        <Label>Sub Category</Label>
        <TagsInput value={category.subCategories} onChange={handleTagsChange} />
      </InputDiv>
      <PrimaryButton maxWidth="200px" onClick={handleAdd}>
        Add
      </PrimaryButton>
    </div>
  );
}

export default AddCategory;
