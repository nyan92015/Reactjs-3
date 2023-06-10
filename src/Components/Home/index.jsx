import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { url } from "../../const";
import "./Home.scss";
import BookList from "../BookList";
import Pagination from "../Pagination";
import { useSelector } from "react-redux";

const Home = () => {
  const [cookies] = useCookies();
  const [errorMessage, setErrorMessage] = useState("");
  const [books, setBooks] = useState([]);
  const page = useSelector((state) => state.page.page);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const getBookList = async () => {
    await axios
      .get(`https://${url}/public/books?offset=${page * 10}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setBooks(data);
        // dataの数が10未満の時は最後のページ
        data.length < 10 ? setIsLastPage(true) : setIsLastPage(false);
        // pageが0の時は最初のページ
        page === 0 ? setIsFirstPage(true) : setIsFirstPage(false);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    getBookList();
  }, [page]);

  return (
    <div className="home">
      <p className="home__error-message">{errorMessage}</p>
      <h2 className="home__title">書籍一覧</h2>
      <Pagination isFirstPage={isFirstPage} isLastPage={isLastPage} />
      <BookList books={books} />
    </div>
  );
};

export default Home;
