import classnames from "classnames";
import Immutable from "immutable";
import {
  convertFromRaw,
  DefaultDraftBlockRenderMap,
  EditorState,
  RichUtils,
} from "draft-js";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import "draft-js-focus-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createListPlugin from "draft-js-list-plugin";
import createMentionPlugin, { defaultTheme } from "draft-js-mention-plugin";
import "draft-js-mention-plugin/lib/plugin.css";
import Editor, { composeDecorators } from "draft-js-plugins-editor";
import createVideoPlugin from "draft-js-video-plugin";
import "draft-js/dist/Draft.css";
import { get, merge } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { LineOutlined } from "./assets/svgs";
import Icon from "./components/Icon";
import createDividerPlugin from "./plugins/divider";
import createImagePlugin from "./plugins/image";
import createAlignmentPlugin from "./plugins/imageAlignment";
import inlineToolbarPlugin, { InlineToolBar } from "./plugins/inlineToolbar";
import linkPlugin from "./plugins/link";
import EmbedButton from "./plugins/side-toolbar/EmbedButton";
import ImageButton from "./plugins/side-toolbar/ImageButton";
import sideToolbarPlugin from "./plugins/side-toolbar/sideToolbarPlugin";
import "./RichEditor.scss";
import sampleContent from "./sampleContent";
const linkifyPlugin = createLinkifyPlugin({ target: "_blank" });
const focusPlugin = createFocusPlugin();

const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const dividerPlugin = createDividerPlugin({
  decorator: composeDecorators(focusPlugin.decorator),
});
const { DividerButton } = dividerPlugin;
const decorator = composeDecorators(
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({
  decorator,
});
const mentionPlugin = createMentionPlugin({
  theme: merge({}, defaultTheme, {
    mention: "font-semibold color-primary truncate",
    mentionSuggestions:
      "z-20 border border-gray-300 absolute  max-w-full background shadow-lg cursor-pointer py-2 flex flex-col transform  scale-0",
  }),
  supportWhitespace: true,
});
const tagPlugin = createMentionPlugin({
  theme: merge({}, defaultTheme, {
    mention: "font-semibold color-primary truncate",
    mentionSuggestions:
      "z-20 border border-gray-300 absolute  max-w-full background shadow-lg cursor-pointer py-2 flex flex-col transform  scale-0",
  }),
  mentionTrigger: "#",
});

const { MentionSuggestions } = mentionPlugin;
const { SideToolbar } = sideToolbarPlugin;
const listPlugin = createListPlugin();
const plugins = [
  linkifyPlugin,
  mentionPlugin,
  tagPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  imagePlugin,
  linkPlugin,
  dividerPlugin,
  sideToolbarPlugin,
  listPlugin,
  inlineToolbarPlugin,
];

// keep support for other draft default block types and add our myCustomBlock type
const Mentions = () => {
  const [value, setValue] = useState();
  const onSearchChange = ({ value }) => {
    setValue(value);
  };
  const suggestions = new Array(5).fill(value).map((item) => ({
    name: value,
    link: `/${value}`,
    avatar: get(item, "avatar"),
  }));
  const onAddMention = (value) => {
    console.log("onAddMention", value);
    // get the mention object selected
  };
  return (
    <MentionSuggestions
      onSearchChange={onSearchChange}
      suggestions={suggestions}
      onAddMention={onAddMention}
    />
  );
};

const bockRenderMap = DefaultDraftBlockRenderMap.merge();
const RichEditor = React.memo(({ readOnly, editorState, onChange }) => {
  const [e, setE] = useState(
    editorState ||
      EditorState.createWithContent(convertFromRaw(JSON.parse(sampleContent)))
  );
  const editorRef = useRef();

  const onWrapClick = useCallback(() => editorRef.current.focus(), []);
  useEffect(() => {
    onChange && onChange(e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [e]);
  const handleKey = useCallback(
    (command) => {
      if (command === "bold") {
        setE(RichUtils.toggleInlineStyle(editorState, "BOLD"));
        return "handled";
      }
      if (command === "underline") {
        setE(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
        return "handled";
      }
      if (command === "italic") {
        setE(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
        return "handled";
      }
      return "not-handled";
    },
    [editorState]
  );
  return (
    <div
      onClick={onWrapClick}
      className={classnames(
        "prose lg:prose-xl RichEditor text-lg md:text-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-4",
        {
          readOnly,
        }
      )}
    >
      <Editor
        placeholder="tell a story"
        readOnly={readOnly}
        ref={editorRef}
        editorState={e}
        onChange={setE}
        plugins={plugins}
        handleKeyCommand={handleKey}
        blockRenderMap={bockRenderMap}
      />
      {!readOnly && (
        <>
          <AlignmentTool />
          <InlineToolBar></InlineToolBar>
          <Mentions />
          <SideToolbar>
            {(externalProps) => [
              <ImageButton {...externalProps} />,
              <EmbedButton {...externalProps} />,
              <DividerButton {...externalProps}>
                {({ active, onMouseDown, onClick }) => {
                  return (
                    <button
                      onMouseDown={onMouseDown}
                      onClick={onClick}
                      style={{
                        fontSize: "24px",
                      }}
                      className="button font-semibold px-2"
                    >
                      <Icon component={LineOutlined}></Icon>
                    </button>
                  );
                }}
              </DividerButton>,
            ]}
          </SideToolbar>
        </>
      )}
    </div>
  );
});

export default RichEditor;
