import { useContext } from 'react'
import EditorContext from '../../EditorContext'

export const createSideToolbarButton = (
  defaultContext,
  Button,
  createProps
) => {
  return function EnchancedButton({
    context = defaultContext || EditorContext,
    ...props
  }) {
    const { setEditorState, editorState } = useContext(context)
    const extendprops = createProps({ setEditorState, editorState })
    return <Button {...extendprops} {...props} />
  }
}
