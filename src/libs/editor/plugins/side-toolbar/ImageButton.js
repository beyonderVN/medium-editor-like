import classNames from 'classnames'
import React from 'react'
import { CameraOutlined } from '../../assets/svgs'
import EditorContext from '../../EditorContext'
import { imagePlugin } from '../../plugins'
import { createSideToolbarButton } from './utils'
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

function ImageButton({ onClick, addImage, className, ...props }) {
  const handleAddImage = (imageUrl, imageId) => {
    addImage(imageUrl, { imageId })
  }
  return (
    <label
      tabIndex="-1"
      htmlFor="add_image"
      className={classNames(
        className,
        'buttonWrapper relative  leading-none relative'
      )}
      {...props}>
      <button
        style={{ fontSize: '24px' }}
        className="button font-semibold px-2  flex items-center justify-center">
        <CameraOutlined />
        <input
          onChange={(e) => {
            ;[...e.target.files].forEach((file) =>
              toBase64(file).then((uri) => {
                handleAddImage(uri)
              })
            )
          }}
          type="file"
          id="add_image"
          name="add_image"
          className="absolute top-0 left-0 w-full h-full opacity-0"
          // hidden
        />
      </button>
    </label>
  )
}

const EnchancedButton = createSideToolbarButton(
  EditorContext,
  ImageButton,
  ({ setEditorState, editorState }) => ({
    addImage: (imageUrl) => {
      setEditorState(imagePlugin.handleInsert(editorState, { src: imageUrl }))
    },
  })
)
export default EnchancedButton
