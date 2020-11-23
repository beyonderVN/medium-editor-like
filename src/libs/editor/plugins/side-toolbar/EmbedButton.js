import classNames from 'classnames'
import React from 'react'
import { EmbedOutline } from '../../assets/svgs'
import Icon from '../../components/Icon'
import EditorContext from '../../EditorContext'
import { embedPlugin } from '../../plugins'
import { message } from '../../utils'
import { createSideToolbarButton } from './utils'
export function EmbedButton({ className, addEmbed, ...props }) {
  return (
    <div
      className={classNames(
        className,
        'buttonWrapper relative  leading-none relative'
      )}>
      <button
        style={{ fontSize: '24px' }}
        onClick={(e) => {
          message.confirm({
            title:
              'Paste a link to embed content from another site (e.g. Twitter) and click Ok',
            onOk: addEmbed,
          })
        }}
        className="button font-semibold px-2">
        <Icon component={EmbedOutline}></Icon>
      </button>
    </div>
  )
}

const EnchancedButton = createSideToolbarButton(
  EditorContext,
  EmbedButton,
  ({ setEditorState, editorState }) => ({
    addEmbed: function (url) {
      setEditorState(embedPlugin.handleInsert(editorState), url)
    },
  })
)
export default EnchancedButton
