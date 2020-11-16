import React from 'react'
import ImageComponent from './Image'
import addImage from './modifiers/addImage'
export default function createImagePlugin(
  config = {}
) {
  let Image =
    config.imageComponent ||
    ImageComponent
  if (config.decorator) {
    Image = config.decorator(Image)
  }
  const EnchancedImage = props => (
    <Image {...props} />
  )
  return {
    blockRendererFn: (
      block,
      {
        getEditorState,
        setEditorState,
        getReadOnly
      }
    ) => {
      if (
        block.getType() === 'atomic'
      ) {
        const contentState = getEditorState().getCurrentContent()
        const entity = block.getEntityAt(
          0
        )
        if (!entity) return null
        const type = contentState
          .getEntity(entity)
          .getType()
        if (
          type === 'IMAGE' ||
          type === 'image'
        ) {
          return {
            component: EnchancedImage,
            editable: false,
            props: {
              getEditorState,
              getReadOnly,
              setEditorState
            }
          }
        }
        return null
      }

      return null
    },
    addImage
  }
}
