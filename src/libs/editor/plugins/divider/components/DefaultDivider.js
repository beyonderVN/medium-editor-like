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
    'w-full h-4 flex items-center',
    className
  )
  return (
    <div {...elementProps} className={combinedClassName}>
      <hr className="w-full" />
    </div>
  )
}
