import PropTypes from 'prop-types'

const DividerButton = ({
  children,
  ...props
}) => {
  const onClick = event => {
    event.preventDefault()
    const editorState = props.getEditorState()
    const newEditorState = props.addDivider(
      editorState
    )

    props.setEditorState(newEditorState)
  }

  const preventBubblingUp = event => {
    event.preventDefault()
  }

  const blockTypeIsActive = () => {
    const editorState = props.getEditorState()
    const type = editorState
      .getCurrentContent()
      .getBlockForKey(
        editorState
          .getSelection()
          .getStartKey()
      )
      .getType()
    return type === props.blockType
  }
  return children({
    active: blockTypeIsActive(),
    onMouseDown: preventBubblingUp,
    onClick
  })
}

DividerButton.propTypes = {
  theme: PropTypes.object,
  getEditorState:
    PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  setEditorState:
    PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  addDivider: PropTypes.func.isRequired
}

export default DividerButton
