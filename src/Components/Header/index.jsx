import React, { useEffect } from "react";
import "./Header.scss";
import { useCookies } from "react-cookie";
import { url } from "../../const";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../authSlice";
import {
  initializationUserData,
  setUserIconUrl,
  setUserName,
} from "../../userSlice";

const Header = () => {
  const [cookies, removeCookie] = useCookies();
  const auth = useSelector((state) => state.auth.isSignIn);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const SignOut = () => {
    removeCookie("token");
    dispatch(initializationUserData());
    dispatch(signOut());
    navigate("/login");
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`https://${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      });

      dispatch(setUserName(response.data.name));
      dispatch(setUserIconUrl(response.data.iconUrl));
    } catch (error) {
      window.alert(`ユーザー情報の取得に失敗しました。${error}`);
    }
  };

  useEffect(() => {
    if (location.pathname === "/" && auth) getUser();
  }, [location]);

  useEffect(() => {
    if (auth) getUser();
  }, []);

  return (
    <header className="header">
      <h1 className="header__title">書籍レビューアプリ</h1>
      {auth ? (
        <>
          <Link to="/profile" className="header__user">
            <img
              className="header__user__icon"
              src={userData.iconUrl || "images/user.png"}
              alt="アイコン"
            />
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
