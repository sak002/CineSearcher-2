import React from "react";

import { Button } from "antd";

const Pagination = ({ countsPerPage, setCurrentPage, totalCount }) => {
  const pages = [];

  for (let i = 1; i < Math.ceil(totalCount / countsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page, index) => (
        <Button key={index} onClick={() => setCurrentPage(page)}>
          {page}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
