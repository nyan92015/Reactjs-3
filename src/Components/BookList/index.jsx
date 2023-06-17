import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookList.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../const";
import { useCookies } from "react-cookie";
const BookList = ({ books }) => {
  const maxLength = 60;
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const auth = useSelector((state) => state.auth.isSignIn);
  const navigationEdit = (id) => (event) => {
    navigate(`/edit/${id}`);
    event.stopPropagation();
  };

  const navigationDetail = (id) => (event) => {
    axios
      .post(
        `https://${url}/logs`,
        { selectBookId: id },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then(async (res) => {
        console.log(`logを送信しました。`);
      })
      .catch((err) => {
        console.log(`logを送信できませんでした。${err}`);
      });
    if (auth) navigate(`/detail/${id}`);
  };

  const bookList = books.map((book) => (
    <div
      onClick={navigationDetail(book.id)}
      className="booklist__book"
      key={book.id}
    >
      <h3 className="booklist__book__title">{book.title}</h3>
      <div className="booklist__book__review">
        <p>レビュー: {book.review.slice(0, maxLength)}</p>
        <p className="booklist__book__review__reviewer">{book.reviewer}より</p>
      </div>
      {book.isMine && (
        <button
          className="booklist__book__navbtn"
          onClick={navigationEdit(book.id)}
        >
          編集する
        </button>
      )}
    </div>
  ));

  return <ul className="booklist">{bookList}</ul>;
};

export default BookList;
