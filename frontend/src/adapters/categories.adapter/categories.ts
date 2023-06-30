import { get, post } from "../xhr";

export const getAllCategories = () => {
  return get("categories");
};

export const getAllSubCategoryByCategories = (categoryId: string) => {
  return get(`categories/sub-category-by-category/${categoryId}`);
};

export const addCategory = (category: {
  category: string;
  subCategories: string[];
}) => {
  return post("categories", category);
};
