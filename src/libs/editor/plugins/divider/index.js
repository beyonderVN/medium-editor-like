import React from 'react'
import DefaultDivider from './components/DefaultDivider'
import DefaultButton from './components/DividerButton'
import addDivider from './modifiers/addDivider'

const createDividerPlugin = ({
  entityType = 'divider',
  dividerComponent = DefaultDivider,
  buttonComponent = DefaultButton,
  decorator
} = {}) => {
  let Divider = dividerComponent

  if (typeof decorator === 'function') {
    Divider = decorator(Divider)
  }

  const ThemedDivider = props => (
    <Divider {...props} />
  )
  const Button = buttonComponent
  const DividerButton = props => (
    <Button
      {...props}
      addDivider={addDivider(
        entityType
      )}
    />
  )

  return {
    blockRendererFn: (
      block,
      { getEditorState }
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
        if (type === entityType) {
          return {
            component: ThemedDivider,
            editable: false
          }
        }
      }

      return null
    },
    DividerButton,
    addDivider: addDivider(entityType)
  }
}

export default createDividerPlugin
