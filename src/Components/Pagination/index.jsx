import React from "react";
const Pagination = ({ page, setPage, isLastPage }) => {
  const forwordPage = () => {
    setPage(page + 1); //ページを進める
  };

  const backwordPage = () => {
    setPage(page - 1); //ページを戻す
  };

  return (
    <div>
      {page !== 0 && <button onClick={backwordPage}>前のページ</button>}
      {!isLastPage && <button onClick={forwordPage}>次のページ</button>}
    </div>
  );
};

export default Pagination;
