import { AtomicBlockUtils, EditorState } from "draft-js";

export default function addEmbed(editorState, url, extraData) {
  const urlType = "EMBED";
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    urlType,
    "IMMUTABLE",
    { ...extraData, src: url }
  );
  console.log({
    contentStateWithEntity,
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  let newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    " "
  );

  return EditorState.forceSelection(
    newEditorState,
    newEditorState.getSelection()
  );
}
