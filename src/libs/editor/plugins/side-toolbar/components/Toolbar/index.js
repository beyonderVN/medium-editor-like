import {
  BlockquoteButton,
  CodeBlockButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  OrderedListButton,
  UnorderedListButton,
} from "draft-js-buttons";
// @ts-ignore
import DraftOffsetKey from "draft-js/lib/DraftOffsetKey";
import PropTypes from "prop-types";
import React from "react";
import BlockTypeSelect from "../BlockTypeSelect";

export default class Toolbar extends React.Component {
  static defaultProps = {
    children: (externalProps) =>
      // may be use React.Fragment instead of div to improve perfomance after React 16
      [
        <HeadlineOneButton {...externalProps} />,
        <HeadlineTwoButton {...externalProps} />,
        <BlockquoteButton {...externalProps} />,
        <CodeBlockButton {...externalProps} />,
        <UnorderedListButton {...externalProps} />,
        <OrderedListButton {...externalProps} />,
      ],
  };

  static propTypes = {
    children: PropTypes.func,
  };

  state = {
    style: {
      display: "none",
    },
  };

  componentDidMount() {
    this.props.store.subscribeToItem("editorState", this.onEditorStateChange);
  }

  componentWillUnmount() {
    this.props.store.unsubscribeFromItem(
      "editorState",
      this.onEditorStateChange
    );
  }

  onEditorStateChange = (editorState) => {
    if (!editorState) return;
    const selection = editorState.getSelection();
    if (!selection.getHasFocus()) {
      this.setState({
        style: {
          ...this.state.style,
          display: "none",
        },
      });
      return;
    }

    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    if (
      currentBlock &&
      currentBlock.getType() !== "atomic" &&
      currentBlock.getText() === ""
    ) {
      // TODO verify that always a key-0-0 exists

      // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
      setTimeout(() => {
        const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
        const node = document.querySelectorAll(
          `[data-offset-key="${offsetKey}"]`
        )[0];
        if (!node) return;
        // The editor root should be two levels above the node from
        // `getEditorRef`. In case this changes in the future, we
        // attempt to find the node dynamically by traversing upwards.
        const editorRef = this.props.store.getItem("getEditorRef")();
        if (!editorRef) return;

        // this keeps backwards-compatibility with react 15
        let editorRoot =
          editorRef.refs && editorRef.refs.editor
            ? editorRef.refs.editor
            : editorRef.editor;
        while (editorRoot.className.indexOf("DraftEditor-root") === -1) {
          editorRoot = editorRoot.parentNode;
        }

        const style = {
          display: "flex",
          top: node.offsetTop + editorRoot.offsetTop,
          transform: "scale(1)",
        };
        // TODO: remove the hard code(width for the hover element)
        if (this.props.position === "right") {
          // eslint-disable-next-line no-mixed-operators
          style.left = editorRoot.offsetLeft + editorRoot.offsetWidth + 80;
        } else {
          style.left = editorRoot.offsetLeft - 40;
        }
        this.setState({
          style,
        });
      }, 0);
    } else {
      this.setState({
        style: {
          ...this.state.position,
          display: "none",
        },
      });
      return;
    }
  };

  render() {
    const { store } = this.props;
    return (
      <div className="wrapper animated " style={this.state.style}>
        <BlockTypeSelect
          getEditorState={store.getItem("getEditorState")}
          setEditorState={store.getItem("setEditorState")}
          childNodes={this.props.children}
        />
      </div>
    );
  }
}
