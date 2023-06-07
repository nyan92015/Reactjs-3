import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";

const Login = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = (data) => {
    axios
      .post(`https://${url}/users`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        const token = res.data.token;
        setCookie("token", token);
        dispatch(signIn());
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`ログインに失敗しました。${err}`);
      });
  };

  if (auth) return <Navigate to="/" />;

  return (
    <div className="login">
      <p className="error-message">{errorMessage}</p>
      <form data-testid="form" onSubmit={handleSubmit(onLogin)}>
        <input
          type="email"
          {...register("email", {
            required: "Eメールを入力してください",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "無効なEメールアドレスです。",
            },
          })}
          placeholder="Email"
          data-testid="input-email"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <input
          type="password"
          {...register("password", {
            required: "パスワードを入力してください。",
            minLength: {
              value: 8,
              message: "無効なパスワードです。",
            },
          })}
          placeholder="Password"
          data-testid="input-password"
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}

        <button type="submit">Submit</button>
      </form>
      <Link to="/signup">新規作成</Link>
    </div>
  );
};

export default Login;
