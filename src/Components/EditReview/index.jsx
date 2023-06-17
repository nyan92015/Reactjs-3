import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { url } from "../../const";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./EditReview.scss";

const EditReview = () => {
  const [cookies] = useCookies();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
        setValue("title", data.title);
        setValue("url", data.url);
        setValue("detail", data.detail);
        setValue("review", data.review);
      })
      .catch((err) => {
        window.alert(`書籍情報の取得に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    getBookDetail();
  }, []);

  const onSubmit = (data) => {
    axios
      .put(
        `https://${url}/books/${id}`,
        {
          title: data.title,
          url: data.url,
          detail: data.detail,
          review: data.review,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          path: {
            id: id,
          },
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        window.alert(`レビューの更新に失敗しました。${err}`);
      });
  };

  const deleteBook = () => {
    axios
      .delete(`https://${url}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        path: {
          id: id,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        window.alert(`レビューの削除に失敗しました。${err}`);
      });
  };
  return (
    <>
      <div className="book-review">
        <div className="book-review__subtitles">
          <h2 className="book-review__subtitles__EditReview">
            レビューを更新する
          </h2>
          <Link to="/" className="book-review__subtitles__goBooklist">
            書籍一覧
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="book-review__form">
          <input
            type="text"
            className="book-review__form__title"
            placeholder="タイトル"
            {...register("title", { required: true })}
          />
          {errors.title && <span>タイトルを入力してください。</span>}
          <input
            type="text"
            className="book-review__form__url"
            placeholder="URL"
            {...register("url", { required: true })}
          />
          {errors.url && <span>URLを入力してください。</span>}
          <textarea
            name="detail"
            id="detail"
            cols="40"
            rows="10"
            placeholder="詳細"
            {...register("detail", { required: true })}
          ></textarea>
          {errors.detail && <span>詳細を入力してください。</span>}
          <textarea
            name="review"
            id="review"
            cols="40"
            rows="10"
            placeholder="レビュー"
            {...register("review", { required: true })}
          ></textarea>
          {errors.review && <span>レビューを入力してください。</span>}
          <button type="submit">更新する</button>
        </form>
      </div>
      <button className="delete-review" onClick={deleteBook}>
        <h1>削除する</h1>
      </button>
    </>
  );
};

export default EditReview;
