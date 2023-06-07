import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Home from "../Components/Home";
import SignUp from "../Components/SignUp";
import { useSelector } from "react-redux";

const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        {auth ? (
          <Route exact path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
