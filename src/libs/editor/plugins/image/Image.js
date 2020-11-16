import classnames from "classnames";
import React, { useRef } from "react";
import { message } from "../../utils";
import { updateEntity } from "../utils";
export default function Image(props) {
  const { block, className, theme = {}, onLoad, ...otherProps } = props;
  // leveraging destructuring to omit certain properties from props
  const {
    blockProps,
    customStyleMap,
    customStyleFn,
    decorator,
    forceSelection,
    offsetKey,
    selection,
    tree,
    blockStyleFn,
    preventScroll,
    contentState,
    ...elementProps
  } = otherProps;
  const combinedClassName = classnames("w-full ", theme.image, className);
  const { src, caption } = contentState
    .getEntity(block.getEntityAt(0))
    .getData();
  const { getEditorState, setEditorState, getReadOnly } = blockProps;
  const handleSubmit = (text) => {
    setEditorState(
      updateEntity(getEditorState(), block.getEntityAt(0), {
        caption: text,
      })
    );
  };
  const isReadOnly = getReadOnly();
  return (
    <div className="z-10 relative" {...elementProps}>
      <img
        style={{ margin: 0 }}
        className={combinedClassName}
        src={src}
        role="presentation"
        alt=""
        onLoad={onLoad}
      />
      {((caption && caption.length) || !isReadOnly) && (
        <figcaption
          style={{
            margin: 0,
            marginTop: "-0.3em",
          }}
          className="flex justify-center w-full text-center"
        >
          <span
            onClick={
              !isReadOnly
                ? () => {
                    message.confirm({
                      title: "write caption for image",
                      onOk: handleSubmit,
                    });
                  }
                : null
            }
          >
            {caption && caption.length ? (
              <small>
                <span className=" leading-none">{caption}</span>
                {!isReadOnly && (
                  <span className="underline text-primary ml-2 italic">
                    {"edit"}
                  </span>
                )}
              </small>
            ) : (
              <small className="underline text-primary italic">
                {"add caption"}
              </small>
            )}
          </span>
        </figcaption>
      )}
    </div>
  );
}
