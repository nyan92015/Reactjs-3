import React from "react";
import Resizer from "react-image-file-resizer";

const RisizeFile = ({ setBlob }) => {
  const resizeImage = (file) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file, // 入力されたファイル
        300, // リサイズ後の幅
        300, // リサイズ後の高さ
        "JPG", // 出力フォーマット
        80, // 圧縮率
        0, // 回転角度
        (resizedImage) => {
          resolve(resizedImage);
        },
        "base64" // 出力形式
      );
    });
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const resizedImage = await resizeImage(file);
    const newBlob = dataURLtoBlob(resizedImage);
    setBlob(newBlob);
  };

  return <input type="file" onChange={onFileChange} />;
};

export default RisizeFile;
