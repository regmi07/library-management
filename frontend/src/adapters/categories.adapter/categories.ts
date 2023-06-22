import { get } from "../xhr";

export const getAllCategories = () => {
  return get("categories");
};

export const getAllSubCategoryByCategories = (categoryId: string) => {
  return get(`categories/sub-category-by-category/${categoryId}`);
};
