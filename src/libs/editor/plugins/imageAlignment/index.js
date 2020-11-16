import { EditorState } from 'draft-js'
import 'draft-js-alignment-plugin/lib/plugin.css'
import React from 'react'
import { createStore } from '../utils'
import AlignmentTool from './AlignmentTool'
import createDecorator from './createDecorator'

const createSetAlignment = (
  contentBlock,
  { getEditorState, setEditorState }
) => data => {
  const entityKey = contentBlock.getEntityAt(
    0
  )
  if (entityKey) {
    const editorState = getEditorState()
    const contentState = editorState.getCurrentContent()
    contentState.mergeEntityData(
      entityKey,
      { ...data }
    )
    setEditorState(
      EditorState.forceSelection(
        editorState,
        editorState.getSelection()
      )
    )
  }
}

const createAlignmentPlugin = (
  config = {}
) => {
  const store = createStore({
    isVisible: false
  })

  const DecoratedAlignmentTool = props => (
    <AlignmentTool
      {...props}
      store={store}
    />
  )

  return {
    initialize: ({
      getReadOnly,
      getEditorState,
      setEditorState
    }) => {
      store.updateItem(
        'getReadOnly',
        getReadOnly
      )
      store.updateItem(
        'getEditorState',
        getEditorState
      )
      store.updateItem(
        'setEditorState',
        setEditorState
      )
    },
    decorator: createDecorator({
      config,
      store
    }),
    blockRendererFn: (
      contentBlock,
      { getEditorState, setEditorState }
    ) => {
      const entityKey = contentBlock.getEntityAt(
        0
      )
      const contentState = getEditorState().getCurrentContent()
      const alignmentData = entityKey
        ? contentState.getEntity(
            entityKey
          ).data
        : {}
      return {
        props: {
          alignment:
            alignmentData.alignment ||
            'default',
          setAlignment: createSetAlignment(
            contentBlock,
            {
              getEditorState,
              setEditorState
            }
          )
        }
      }
    },
    AlignmentTool: DecoratedAlignmentTool
  }
}
export default createAlignmentPlugin
