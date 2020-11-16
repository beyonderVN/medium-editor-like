import React from "react";
import EmbedComponent from "./Embed";
import addEmbed from "./modifiers/addEmbed";
export default function createImagePlugin(config = {}) {
  let Embed = config.imageComponent || EmbedComponent;
  if (config.decorator) {
    Embed = config.decorator(Embed);
  }
  const EnchancedEmbed = (props) => <Embed {...props} />;
  return {
    blockRendererFn: (
      block,
      { getEditorState, setEditorState, getReadOnly }
    ) => {
      if (block.getType() === "atomic") {
        const contentState = getEditorState().getCurrentContent();
        const entity = block.getEntityAt(0);
        if (!entity) return null;
        const type = contentState.getEntity(entity).getType();
        if (type === "EMBED" || type === "embed") {
          return {
            component: EnchancedEmbed,
            editable: false,
            props: {
              getEditorState,
              getReadOnly,
              setEditorState,
            },
          };
        }
        return null;
      }

      return null;
    },
    addEmbed,
  };
}
