import React, { useState } from "react";

type Props = {};

function Pagination({}: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  return <div>Pagination</div>;
}

export default Pagination;
