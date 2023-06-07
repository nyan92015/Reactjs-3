import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { url } from "../const";
import { Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";

const SignUp = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignUp = (data) => {
    console.log(`https://${url}/users`);
    axios
      .post(`https://${url}/users`, {
        name: data.name,
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
        setErrorMessage(`サインアップに失敗しました。${err}`);
      });

    if (auth) return <Navigate to="/" />;
  };

  return (
    <div className="signup">
      <h1>新規作成</h1>
      <p className="error-message">{errorMessage}</p>
      <form data-testid="form" onSubmit={handleSubmit(onSignUp)}>
        <input
          type="name"
          {...register("name", {
            required: "ユーザーネームを入力してください。",
          })}
          placeholder="UserName"
          data-testid="input-username"
        />
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
    </div>
  );
};

export default SignUp;
