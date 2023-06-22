import React from "react";
import { ImageContainer } from "./style";

interface ImagePropsType {
  imageUrl?: string;
  alt?: string;
  defaultImageUrl?: string;
}

const defaultImage: string =
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1480&t=st=1682235009~exp=1682235609~hmac=3fe4be2bc841c26481d012d872dc6aec15270f90790c67bd63e37281f29b644a";

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
