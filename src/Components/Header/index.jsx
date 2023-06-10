import React, { useEffect, useState } from "react";
import "./Header.scss";
import { useCookies } from "react-cookie";
import { url } from "../../const";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../authSlice";

const Header = () => {
  const [cookies, removeCookie] = useCookies();
  const [userData, setUserData] = useState({ name: null, iconUrl: null });
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignOut = () => {
    removeCookie("token");
    dispatch(signOut());
    navigate("/login");
  };

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
        if (auth === true)
          window.alert(`ユーザー情報の取得に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    getUser();
  }, [cookies, userData]);

  return (
    <header className="header">
      <h1 className="header__title">書籍ビューアプリ</h1>
      {auth ? (
        <>
          <Link to="/profile" className="header__user">
            {userData.iconUrl ? (
              <img
                className="header__user__icon"
                src={userData.iconUrl}
                alt="アイコン"
              />
            ) : (
              <img
                className="header__user__icon"
                src="images/user.png"
                alt="アイコン"
              />
            )}
            <p className="header__user__name">{userData.name}</p>
          </Link>
          <button onClick={SignOut}>ログアウト</button>
        </>
      ) : (
        <Link to="/login" className="header__loginButton">
          ログイン
        </Link>
      )}
    </header>
  );
};

export default Header;
