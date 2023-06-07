import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { url } from "../const";

const Home = () => {
  const [cookies] = useCookies();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    axios
      .get(`https://${url}/public/books`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {})
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, []);
  return <div>home</div>;
};

export default Home;
