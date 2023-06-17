import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./NewReview.scss";
import { url } from "../../const";
import axios from "axios";
import { useCookies } from "react-cookie";

const NewReview = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(
        `https://${url}/books`,
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
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        window.alert(`書籍の投稿に失敗しました。${err}`);
      });
  };

  return (
    <div className="book-review">
      <div className="book-review__subtitles">
        <h2 className="book-review__subtitles__Review">レビューを書く</h2>
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
          name="details"
          id="details"
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
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default NewReview;
