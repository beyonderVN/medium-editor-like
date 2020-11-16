import React, { useRef } from "react";
import { EmbedOutline } from "../../assets/svgs";
import Icon from "../../components/Icon";
import { message } from "../../utils";
import addEmbed from "../embed/modifiers/addEmbed";
export default function EmbedButton(props) {
  const handleSubmit = (imageUrl) => {
    props.setEditorState(addEmbed(props.getEditorState(), imageUrl));
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
