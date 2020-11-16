import {
  AtomicBlockUtils,
  EditorState
} from 'draft-js'

export default (
  editorState,
  url,
  extraData
) => {
  const urlType = 'IMAGE'
  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity(
    urlType,
    'IMMUTABLE',
    { ...extraData, src: url }
  )
  console.log({
    contentStateWithEntity
  })
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  let newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  )

  return EditorState.forceSelection(
    newEditorState,
    newEditorState.getSelection()
  )
}
