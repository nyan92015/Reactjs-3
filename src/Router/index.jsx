import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Home from "../Components/Home";
import SignUp from "../Components/SignUp";
import { useSelector } from "react-redux";
import Profile from "../Components/Profile.jsx";

const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      {auth ? (
        <>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
        </>
      ) : (
        <Route path="/" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default Router;
