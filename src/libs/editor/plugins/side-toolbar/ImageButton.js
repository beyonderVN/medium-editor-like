import React from "react";
import { CameraOutlined } from "../../assets/svgs";
import addImage from "../image/modifiers/addImage";
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function AddImage({ onClick, ...props }) {
  const handleAddImage = (imageUrl, imageId) => {
    props.setEditorState(
      addImage(props.getEditorState(), imageUrl, { imageId })
    );
  };
  return (
    <label
      tabIndex="-1"
      htmlFor="add_image"
      className="buttonWrapper relative  leading-none relative"
    >
      <button
        style={{ fontSize: "24px" }}
        className="button font-semibold px-2  flex items-center justify-center"
      >
        <CameraOutlined />
        <input
          onChange={(e) => {
            console.log(e.target);
            [...e.target.files].forEach((file) =>
              toBase64(file).then((uri) => {
                handleAddImage(uri);
              })
            );
          }}
          type="file"
          id="add_image"
          name="add_image"
          className="absolute top-0 left-0 wfull0 h-full opacity-0"
          // hidden
        />
      </button>
    </label>
  );
}
