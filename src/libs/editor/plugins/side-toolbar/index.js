import React, { useContext } from 'react'
import EditorContext from '../../EditorContext'
import Toolbar from './components/Toolbar'
import DividerButton from './DividerButton'
import EmbedButton from './EmbedButton'
import ImageButton from './ImageButton'
import './index.scss'

export default function SideToolbar({
  context = EditorContext,
  position,
  ...props
} = {}) {
  const { getEditorRef, editorState } = useContext(context)
  return (
    <Toolbar
      {...props}
      editorRef={getEditorRef()}
      editorState={editorState}
      position={position}>
      <ImageButton className="sidebuttonwrap bg-white button--scale u-transitionSeries w-10 h-10  border boder-gray-600 flex justify-center items-center background-100 hover:background-200 shadow-2xl z-10 rounded-full" />
      <EmbedButton className="sidebuttonwrap bg-white button--scale u-transitionSeries w-10 h-10  border boder-gray-600 flex justify-center items-center background-100 hover:background-200 shadow-2xl z-10 rounded-full" />
      <DividerButton className="sidebuttonwrap bg-white button--scale u-transitionSeries w-10 h-10  border boder-gray-600 flex justify-center items-center background-100 hover:background-200 shadow-2xl z-10 rounded-full" />
    </Toolbar>
  )
}
