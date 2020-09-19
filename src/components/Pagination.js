import React from "react";

const Pagination = (props) => {
  console.log(props);
  const { totalProducts, productsPerPage, onPageChange, currentPage } = props;
  const pagesNumber = Math.ceil(totalProducts / productsPerPage);
  for (let i = 1; i < pagesNumber; i++) {
    pagesNumber.push(i);
  }
  console.log(pagesNumber);
  if (pagesNumber === 1) return null;

  return (
    <nav aria-label="Page navigation">
      <ul class="pagination">
        {pagesNumber.map((pageNum) => (
          <li
            key={pageNum}
            class={pageNum === currentPage ? "page-item active" : "page-item"}
          >
            <a class="page-link" onClick={() => onPageChange(pageNum)} href="#">
              {pageNum}
            </a>
          </li>
        ))}
        ==
      </ul>
    </nav>
  );
};

export default Pagination;
