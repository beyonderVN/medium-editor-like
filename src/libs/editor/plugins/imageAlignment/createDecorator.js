import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
const getDisplayName = (WrappedComponent) => {
  const component = WrappedComponent.WrappedComponent || WrappedComponent
  return component.displayName || component.name || 'Component'
}
const createDecorator = ({ store }) => (WrappedComponent) => {
  const Component = (props) => {
    const { blockProps, style, ...elementProps } = props
    const ref = useRef()
    useEffect(() => {
      const blockNode = ref.current
      if (!blockNode) return

      if (blockProps.isFocused && blockProps.isCollapsedSelection) {
        const selection =
          store.getItem('getEditorState') &&
          store.getItem('getEditorState')().getSelection()
        const blockNode = ReactDOM.findDOMNode(ref.current)
        console.log({ blockNode, selection })
        const boundingRect = blockNode.getBoundingClientRect()
        store.updateItem('setAlignment', blockProps.setAlignment)
        store.updateItem('alignment', blockProps.alignment)
        store.updateItem('boundingRect', boundingRect)
        store.updateItem('visibleBlock', props.block.getKey())
      } else if (store.getItem('visibleBlock') === props.block.getKey()) {
        store.updateItem('visibleBlock', null)
      }
      return () => {
        store.updateItem('visibleBlock', null)
      }
    }, [blockProps, props.block])

    const alignment = blockProps.alignment || 'center'
    let newStyle = style || {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
    }
    if (alignment === 'left') {
      newStyle = {
        ...style,
        width: '50%',
        marginRight: '1.4em',
        float: 'left',
      }
    } else if (alignment === 'center') {
      newStyle = {
        ...style,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
      }
    } else if (alignment === 'right') {
      newStyle = {
        ...style,
        width: '50%',
        marginLeft: '1.4em',
        float: 'right',
      }
    }
    return (
      <WrappedComponent
        ref={ref}
        {...elementProps}
        blockProps={blockProps}
        style={newStyle}
      />
    )
  }
  Component.displayName = `Alignment(${getDisplayName(WrappedComponent)})`
  return Component
}
export default createDecorator
