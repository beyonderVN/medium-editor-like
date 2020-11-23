// @ts-ignore
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import BlockTypeSelect from '../BlockTypeSelect'

export default function Toolbar({ editorState, editorRef, ...props }) {
  const [open, setOpen] = useState()
  const toggle = useCallback(() => setOpen(!open), [open])
  const { position, children } = props
  const [offsetKey, setoffsetKey] = useState()
  const [show, setShow] = useState(false)
  const [top, setTop] = useState()
  const [editorRoot, seteditorRoot] = useState()
  const left = useMemo(() => {
    if (!editorRoot) return 0
    return position === 'right'
      ? editorRoot.offsetLeft + editorRoot.offsetWidth + 80
      : editorRoot.offsetLeft - 40
  }, [editorRoot, position])
  useEffect(() => {
    const onEditorStateChange = (editorState) => {
      if (!editorState) return
      const selection = editorState.getSelection()
      if (!selection.getHasFocus()) {
        setShow(false)
      }
      const currentContent = editorState.getCurrentContent()
      const currentBlock = currentContent.getBlockForKey(
        selection.getStartKey()
      )
      if (
        currentBlock &&
        currentBlock.getType() === 'unstyled' &&
        currentBlock.getText() === ''
      ) {
        setShow(true)
      } else {
        setShow(false)
      }
      setTimeout(() => {
        const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0)
        setoffsetKey(offsetKey)

        if (!editorRef) return null
        let editorRoot =
          editorRef && editorRef.editor
            ? editorRef.editor.editor
            : editorRef.editor
        while (editorRoot.className.indexOf('DraftEditor-root') === -1) {
          editorRoot = editorRoot.parentNode
        }
        seteditorRoot(editorRoot)
      }, 0)
    }

    onEditorStateChange(editorState)
  }, [editorRef, editorState])
  useEffect(() => {
    if (!editorRoot) return
    if (!show) return
    let timeout = setTimeout(() => {
      const node = document.querySelectorAll(
        `[data-offset-key="${offsetKey}"]`
      )[0]
      if (!node) return
      const newtop = node.offsetTop + editorRoot.offsetTop
      if (newtop !== top) {
        setTop(newtop)
      }
      timeout = setTimeout(() => {
        const node = document.querySelectorAll(
          `[data-offset-key="${offsetKey}"]`
        )[0]
        if (!node) return
        const newtop = node.offsetTop + editorRoot.offsetTop
        setTop(newtop)
      }, 300)
    }, 0)
    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [editorRoot, offsetKey, show, top])

  return useMemo(
    () => (
      <div
        className="wrapper animated"
        style={{
          display: show && editorRoot ? 'flex' : 'none',
          transform: show && editorRoot ? 'scale(1)' : 'scale(0)',
          left: left,
          top: top,
        }}>
        <BlockTypeSelect {...{ children, open, toggle }} />
      </div>
    ),
    [children, editorRoot, left, open, show, toggle, top]
  )
}
