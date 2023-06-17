import React, { useEffect, useState } from "react";
import "./Detail.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../../const";
const Detail = () => {
  const { id } = useParams();
  const [cookies] = useCookies();
  const [bookData, setBookData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getBookDetail = async () => {
    await axios
      .get(`https://${url}/books/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
        path: {
          id: id,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setBookData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        window.alert(`書籍情報の取得に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    getBookDetail();
  }, []);

  if (isLoading)
    return <h1 className="book-detail--loading">書籍情報取得中...</h1>;

  return (
    <div className="book-detail">
      <h1 className="book-detail__title">本のタイトル:{bookData.title}</h1>
      <h2 className="book-detail__reviewer">レビュワー:{bookData.reviewer}</h2>
      <Link to={bookData.url} className="book-detail__url">
        本のページへ
      </Link>
      <br />
      <div className="book-detail__detail">詳細:{bookData.detail}</div>
      <br />
      <div className="book-detail__review">レビュー:{bookData.review}</div>
    </div>
  );
};

export default Detail;
