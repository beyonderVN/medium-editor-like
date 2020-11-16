import React, { useRef } from "react";
import { EmbedOutline } from "../../assets/svgs";
import Icon from "../../components/Icon";
import { message } from "../../utils";
const resToJson = (res) => res.json();
export default function EmbedButton({ onClick }) {
  const handleSubmit = (url) => {
    fetch(
      `https://8080-37f05222-627a-4ff4-af39-91c7ca5a20d0.asia-southeast1.cloudshell.dev/getUrlMetadata?url=` +
        url
    )
      .then(resToJson)
      .then(console.log);
  };
  return (
    <div className="buttonWrapper relative">
      <button
        style={{ fontSize: "24px" }}
        onClick={(e) => {
          message.confirm({
            title:
              "Paste a link to embed content from another site (e.g. Twitter) and click Ok",
            onOk: handleSubmit,
          });
        }}
        className="button font-semibold px-2"
      >
        <Icon component={EmbedOutline}></Icon>
      </button>
    </div>
  );
}
