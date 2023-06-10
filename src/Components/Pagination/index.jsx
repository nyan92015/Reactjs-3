import React from "react";
import { useDispatch } from "react-redux";
import { forword, backword } from "../../pageSlice";
const Pagination = ({ isFirstPage, isLastPage }) => {
  const dispath = useDispatch();

  const forwordPage = () => {
    dispath(forword()); //ページを進める
  };

  const backwordPage = () => {
    dispath(backword()); //ページを戻す
  };

  return (
    <div>
      {!isFirstPage && <button onClick={backwordPage}>前のページ</button>}
      {!isLastPage && <button onClick={forwordPage}>次のページ</button>}
    </div>
  );
};

export default Pagination;
