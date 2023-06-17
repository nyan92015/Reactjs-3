import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Home from "../Components/Home";
import SignUp from "../Components/SignUp";
import Profile from "../Components/Profile";
import NewReview from "../Components/NewReview";
import { useSelector } from "react-redux";
import Detail from "../Components/Detail";
import EditReview from "../Components/EditReview";

const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/" element={<Home />} />
      {auth && (
        <>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/new" element={<NewReview />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/edit/:id" element={<EditReview />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
