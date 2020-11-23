import classNames from 'classnames'
import { LineOutlined } from '../../assets/svgs'
import Icon from '../../components/Icon'
import EditorContext from '../../EditorContext'
import { dividerPlugin } from '../../plugins'
import { createSideToolbarButton } from './utils'
const DividerButton = ({ children, onClick, className, ...props }) => {
  const handleClick = (event) => {
    event.preventDefault()
    onClick()
  }
  const preventBubblingUp = (event) => {
    event.preventDefault()
  }

  return (
    <button
      onMouseDown={preventBubblingUp}
      onClick={handleClick}
      style={{
        fontSize: '24px',
      }}
      className={classNames(
        className,
        'buttonWrapper relative  leading-none relative'
      )}>
      <Icon component={LineOutlined}></Icon>
    </button>
  )
}
const EnchancedDividerButton = createSideToolbarButton(
  EditorContext,
  DividerButton,
  ({ setEditorState, editorState }) => ({
    onClick: () => {
      setEditorState(dividerPlugin.handleInsert(editorState))
    },
  })
)
export default EnchancedDividerButton
