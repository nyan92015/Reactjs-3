import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { url } from "../../const";
import "./Home.scss";
import BookList from "../BookList";
import Pagination from "../Pagination";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const [cookies] = useCookies();
  const [errorMessage, setErrorMessage] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const auth = useSelector((state) => state.auth.isSignIn);

  const getPublicBookList = () => {
    axios
      .get(`https://${url}/public/books?offset=${page * 10}`)
      .then((res) => res.data)
      .then((data) => {
        setBooks(data);
        // dataの数が10未満の時は最後のページ
        data.length < 10 ? setIsLastPage(true) : setIsLastPage(false);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  };

  const getBookList = () => {
    axios
      .get(`https://${url}/books?offset=${page * 10}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setBooks(data);
        // dataの数が10未満の時は最後のページ
        data.length < 10 ? setIsLastPage(true) : setIsLastPage(false);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    if (auth) getBookList();
    else getPublicBookList();
  }, [page]);

  return (
    <div className="home">
      <p className="home__error-message">{errorMessage}</p>
      <div className="home__subtitles">
        <h2 className="home__subtitles__booklist">書籍一覧</h2>
        {auth && (
          <Link to="/new" className="home__subtitles__goReview">
            レビューを書く
          </Link>
        )}
      </div>
      <Pagination page={page} setPage={setPage} isLastPage={isLastPage} />
      <BookList books={books} />
    </div>
  );
};

export default Home;
