import { AtomicBlockUtils, EditorState } from 'draft-js'

export const message = {
  error: (str) => alert(str),
  confirm: ({ title, onOk }) => {
    var result = prompt(title, '')
    if (result != null) {
      onOk(result)
    }
  },
}
export const preventParentEvent = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

export const createBlockTypeIsActive = (blockType) => (editorState) => {
  const type = editorState
    .getCurrentContent()
    .getBlockForKey(editorState.getSelection().getStartKey())
    .getType()
  return type === blockType
}
export const createInsertAtomicBlock = (entityType) => (editorState, data) => {
  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity(
    entityType,
    'IMMUTABLE',
    data
  )
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  )
  return EditorState.forceSelection(
    newEditorState,
    newEditorState.getCurrentContent().getSelectionAfter()
  )
}
export const createBlockRendererFn = (entityType, component) => (
  block,
  { getEditorState, getReadOnly, setEditorState }
) => {
  if (block.getType() === 'atomic') {
    const contentState = getEditorState().getCurrentContent()
    const entity = block.getEntityAt(0)
    if (!entity) return null
    const type = contentState.getEntity(entity).getType()
    if (type === entityType) {
      return {
        component,
        editable: false,
        props: {
          getEditorState,
          getReadOnly,
          setEditorState,
        },
      }
    }
  }

  return null
}
