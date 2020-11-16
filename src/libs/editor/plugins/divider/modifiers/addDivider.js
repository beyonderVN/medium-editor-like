import {
  AtomicBlockUtils,
  EditorState
} from 'draft-js'

export default function addDivider(
  entityType
) {
  return (editorState, data) => {
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
      newEditorState
        .getCurrentContent()
        .getSelectionAfter()
    )
  }
}
