import React from "react";
import { createStore } from "../utils";
import Toolbar from "./components/Toolbar";
export default function createSideToolbarplugin(config = {}) {
  const defaultPostion = "left";
  const store = createStore({
    isVisible: false,
  });

  const { position = defaultPostion } = config;

  const SideToolbar = (props) => (
    <Toolbar {...props} store={store} position={position} />
  );

  return {
    initialize: ({ setEditorState, getEditorState, getEditorRef }) => {
      store.updateItem("getEditorState", getEditorState);
      store.updateItem("setEditorState", setEditorState);
      store.updateItem("getEditorRef", getEditorRef);
    },
    // Re-Render the toolbar on every change
    onChange: (editorState) => {
      store.updateItem("editorState", editorState);
      return editorState;
    },
    SideToolbar,
  };
}
