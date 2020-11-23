import classnames from 'classnames'
import {
  convertFromRaw,
  DefaultDraftBlockRenderMap,
  EditorState,
} from 'draft-js'
import 'draft-js-focus-plugin/lib/plugin.css'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import 'draft-js-mention-plugin/lib/plugin.css'
import Editor from 'draft-js-plugins-editor'
import 'draft-js/dist/Draft.css'
import React, { useState } from 'react'
import plugins from './plugins'
import './RichEditor.scss'
import sampleContent from './sampleContent'

const bockRenderMap = DefaultDraftBlockRenderMap.merge()
const Renderer = ({ readOnly, editorState }) => {
  const [e] = useState(
    editorState ||
      EditorState.createWithContent(convertFromRaw(JSON.parse(sampleContent)))
  )
  return (
    <div
      className={classnames(
        'prose lg:prose-xl RichEditor text-lg md:text-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-4 readOnly'
      )}>
      <Editor
        readOnly={readOnly}
        editorState={e}
        plugins={plugins}
        blockRenderMap={bockRenderMap}
      />
    </div>
  )
}

export default Renderer
