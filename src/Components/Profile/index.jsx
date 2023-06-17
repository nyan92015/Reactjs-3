import React, { useState } from "react";
import "./Profile.scss";
import axios from "axios";
import { url } from "../../const";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../../userSlice";
import ResizeFile from "../ResizeFile";
import { Link } from "react-router-dom";

const Profile = () => {
  const [blob, setBlob] = useState(null);
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const handleNameChange = (event) => {
    dispatch(setUserName(event.target.value));
  };

  const onFileUpload = async (token) => {
    const formData = new FormData();
    formData.append("icon", blob);
    await axios
      .post(`https://${url}/uploads`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(`success to Upload Icon. ${res}`);
      })
      .catch((err) => {
        if (blob !== null)
          window.alert(`画像のアップロードに失敗しました。${err}`);
      });
  };

  const updateUserData = () => {
    onFileUpload(cookies.token);
    const data = { name: userData.name };
    axios
      .put(`https://${url}/users`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        window.alert(`アップデートに失敗しました。${err}`);
      });
  };

  return (
    <>
      <div className="profile">
        <h1 className="profile__title">プロフィール編集</h1>
        <div className="profile__user">
          <ResizeFile setBlob={setBlob} />
          <input
            className="profile__user__name"
            type="text"
            value={userData.name}
            onChange={handleNameChange}
          />
        </div>
        <button className="profile__submit" onClick={updateUserData}>
          プロフィールを更新する
        </button>
      </div>
      <Link to="/" className="back">
        書籍一覧へ戻る
      </Link>
    </>
  );
};

export default Profile;
