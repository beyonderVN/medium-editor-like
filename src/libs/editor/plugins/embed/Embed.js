import classnames from "classnames";
import React, { useRef } from "react";
import { message } from "../../utils";
import { updateEntity } from "../utils";
import Embedly from "react-embed";

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
  const { src, caption } = contentState
    .getEntity(block.getEntityAt(0))
    .getData();
  const combinedClassName = classnames("w-full ", theme.embed, className);
  return (
    <div className={combinedClassName} {...elementProps}>
      <div className="pointer-events-none flex items-center justify-center w-full">
        <Embedly width="100%" url={src} />
      </div>
    </div>
  );
}
