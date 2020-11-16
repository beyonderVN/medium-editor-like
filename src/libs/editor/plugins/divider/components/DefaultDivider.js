import classnames from 'classnames'
import React from 'react'
export default function Divider({
  block,
  className,
  theme = {},
  ...otherProps
}) {
  const {
    blockProps,
    customStyleMap,
    customStyleFn,
    decorator,
    forceSelection,
    offsetKey,
    selection,
    tree,
    contentState,
    blockStyleFn,
    preventScroll,
    ...elementProps
  } = otherProps
  const combinedClassName = classnames(
    theme.divider,
    className
  )
  return (
    <hr
      {...elementProps}
      className={combinedClassName}
    />
  )
}
