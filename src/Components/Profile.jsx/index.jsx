import React, { useEffect, useState } from "react";
import "./Profile.scss";
import axios from "axios";
import { url } from "../../const";
import { useCookies } from "react-cookie";
const Profile = () => {
  const [cookies] = useCookies();
  const [userData, setUserData] = useState();

  const getUser = () => {
    axios
      .get(`https://${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        window.alert(`ユーザー情報の取得に失敗しました。${err}`);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile">
      <h1 className="profile__title">プロフィール</h1>
      <h2 className="profile__username">{userData.name}</h2>
    </div>
  );
};

export default Profile;
