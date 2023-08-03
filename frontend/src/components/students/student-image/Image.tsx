import React from "react";
import { ImageContainer } from "./style";

interface ImagePropsType {
  imageUrl?: string;
  alt?: string;
  defaultImageUrl?: string;
}

const defaultImage: string =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fonline-learning-flat-1%2F64%2F13_male_student_avatar_people_graduate_education_study-1024.png&f=1&nofb=1&ipt=41f0f9b94cb8542323618589c29774aef6081fd11f6e86c3fcd37c9f7b6faa5f&ipo=images";
function Image({
  imageUrl,
  alt,
  defaultImageUrl = defaultImage,
}: ImagePropsType) {
  return (
    <ImageContainer src={imageUrl ?? defaultImageUrl} alt={alt ?? "Image"} />
  );
}

export default Image;
