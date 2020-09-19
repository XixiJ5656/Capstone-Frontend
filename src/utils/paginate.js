import lodash from "lodash";



const indexOfLastItem=currentPage*itemsPerPage;
const indexOfFirstItem=indexOfLastItem-itemsPerPage;
const currentItems=posts.slice(indexOfFirstitme,indexOfLastItem);

const paginate = (items, currentPage, itemsPerPage) => {
  const startIndex = (currentPage-1)* pageSize;
  return _(items).slice(items, startIndex).take(itemsPerPage).value();
};

export default paginate;
