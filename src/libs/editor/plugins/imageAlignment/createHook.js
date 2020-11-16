import {
  useEffect,
  useRef
} from 'react'

export default ({ store }) => ({
  block,
  blockProps
}) => {
  const blockNodeRef = useRef()
  useEffect(() => {
    if (
      blockProps.isFocused &&
      blockProps.isCollapsedSelection
    ) {
      // TODO figure out if and how to achieve this without fetching the DOM node
      // eslint-disable-next-line react/no-find-dom-node
      const blockNode =
        blockNodeRef.current
      const boundingRect = blockNode.getBoundingClientRect()
      store.updateItem(
        'setAlignment',
        blockProps.setAlignment
      )
      store.updateItem(
        'alignment',
        blockProps.alignment
      )
      store.updateItem(
        'boundingRect',
        boundingRect
      )
      store.updateItem(
        'visibleBlock',
        block.getKey()
      )
      // Only set visibleBlock to null in case it's the current one. This is important
      // in case the focus directly switches from one block to the other. Then the
      // Alignment tool should not be hidden, but just moved.
    } else if (
      store.getItem('visibleBlock') ===
      block.getKey()
    ) {
      store.updateItem(
        'visibleBlock',
        null
      )
    }
  })
}
