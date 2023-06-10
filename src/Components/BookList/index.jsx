import React from "react";
import { Link } from "react-router-dom";
import "./BookList.scss";
const BookList = ({ books }) => {
  const maxLength = 60;
  const bookList = books.map((book) => (
    <li className="book" key={book.id}>
      <h3 className="book__title">{book.title}</h3>
      <div className="book__review">
        <p>レビュー: {book.review.slice(0, maxLength)}</p>
        <p className="book__review__reviewer">{book.reviewer}より</p>
      </div>
      <Link to={book.url}>{book.title}の購入ページ</Link>
    </li>
  ));

  return <ul className="booklist">{bookList}</ul>;
};

export default BookList;
