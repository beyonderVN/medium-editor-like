import { convertFromRaw, EditorState, Modifier, RichUtils } from 'draft-js'
import 'draft-js-focus-plugin/lib/plugin.css'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import 'draft-js-mention-plugin/lib/plugin.css'
import Editor from 'draft-js-plugins-editor'
import 'draft-js/dist/Draft.css'
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import EditorContext from './EditorContext'
import plugins, { alignmentPlugin } from './plugins'
import { InlineToolBar } from './plugins/inlineToolbar'
import SideToolbar from './plugins/side-toolbar'
import './RichEditor.scss'
import sampleContent from './sampleContent'

const handleReturn = (event, editorState, { setEditorState }) => {
  if (isSoftNewlineEvent(event)) {
    const selection = editorState.getSelection()
    if (selection.isCollapsed()) {
      setEditorState(RichUtils.insertSoftNewline(editorState))
    } else {
      const content = editorState.getCurrentContent()
      let newContent = Modifier.removeRange(content, selection, 'forward')
      const newSelection = newContent.getSelectionAfter()
      const block = newContent.getBlockForKey(newSelection.getStartKey())
      newContent = Modifier.insertText(
        newContent,
        newSelection,
        '\n',
        block.getInlineStyleAt(newSelection.getStartOffset()),
        null
      )
      setEditorState(
        EditorState.push(editorState, newContent, 'insert-fragment')
      )
    }
    return 'handled'
  }
}
const handleKey = (command, editorState, _, { setEditorState }) => {
  const newState = RichUtils.handleKeyCommand(editorState, command)
  if (newState) {
    setEditorState(newState)
    return 'handled'
  }
  return 'not-handled'
}

const RichEditor = ({ editorState, onChange }) => {
  const onChangeRef = useRef(onChange)
  const [e, setE] = useState(
    editorState ||
      EditorState.createWithContent(convertFromRaw(JSON.parse(sampleContent)))
  )
  const editorRef = useRef()
  const editorStateRef = useRef()
  const onWrapClick = useCallback(() => editorRef.current.focus(), [])
  useEffect(() => {
    editorStateRef.current = e
    onChangeRef.current && onChangeRef.current(e)
  }, [e])

  return (
    <EditorContext.Provider
      value={useMemo(
        () => ({
          editorState: e,
          getEditorState: () => e,
          setEditorState: setE,
          getEditorRef: () => editorRef.current,
          plugins,
          handleKey,
          handleReturn,
        }),
        [e]
      )}>
      <div
        tabIndex="-1"
        onClick={onWrapClick}
        onFocus={onWrapClick}
        className="prose h-full lg:prose-xl RichEditor text-lg md:text-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-4">
        <Editor
          placeholder={'tell a story'}
          ref={editorRef}
          editorState={e}
          onChange={setE}
          plugins={plugins}
          handleKeyCommand={handleKey}
          handleReturn={handleReturn}
        />
        <alignmentPlugin.AlignmentTool />
        <InlineToolBar />
        <SideToolbar />
      </div>
    </EditorContext.Provider>
  )
}

export default RichEditor
