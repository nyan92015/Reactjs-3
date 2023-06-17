import React from "react";
import Resizer from "react-image-file-resizer";
import { useDispatch, useSelector } from "react-redux";
import { setUserIconUrl } from "../../userSlice";
import "./ResizeFile.scss";

const ResizeFile = ({ setBlob }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file, // 入力されたファイル
        300, // リサイズ後の幅
        300, // リサイズ後の高さ
        "JPG", // 出力フォーマット
        50, // 圧縮率
        0, // 回転角度
        (resizedImage) => {
          resolve(resizedImage);
        },
        "base64" // 出力形式
      );
    });
  };

  const dataURLtoBlob = (dataURL) => {
    // Data URL をカンマで分割して配列にする
    const arr = dataURL.split(",");

    // MIME タイプを取得する
    const mime = arr[0].match(/:(.*?);/)[1];

    // Base64 エンコードされたデータ部分をデコードする
    const bstr = atob(arr[1]);

    // デコードされたデータの長さを取得する
    let n = bstr.length;

    // デコードされたデータを格納するための Uint8Array を作成する
    const u8arr = new Uint8Array(n);

    // デコードされたデータを Uint8Array に格納する
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    // Uint8Array を元に Blob オブジェクトを作成して返す
    return new Blob([u8arr], { type: mime });
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    dispatch(setUserIconUrl(imageURL));

    const resizedImage = await resizeImage(file);
    const newBlob = dataURLtoBlob(resizedImage);
    setBlob(newBlob);
  };

  return (
    <>
      <label htmlFor="image-upload">
        <img
          className="user__icon"
          src={userData.iconUrl || "images/user.png"}
          alt="アイコン"
        />
      </label>
      <input
        className="user__icon-file"
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
    </>
  );
};

export default ResizeFile;
