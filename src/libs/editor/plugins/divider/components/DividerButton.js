import PropTypes from 'prop-types'
import { LineOutlined } from '../../../assets/svgs'
import Icon from '../../../components/Icon'

const DividerButton = ({ children, addDivider, ...props }) => {
  const onClick = (event) => {
    event.preventDefault()
    addDivider()
  }
  const preventBubblingUp = (event) => {
    event.preventDefault()
  }

  return (
    <button
      onMouseDown={preventBubblingUp}
      onClick={onClick}
      style={{
        fontSize: '24px',
      }}
      className="button font-semibold px-2">
      <Icon component={LineOutlined}></Icon>
    </button>
  )
}

DividerButton.propTypes = {
  theme: PropTypes.object,
  getEditorState: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  setEditorState: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  addDivider: PropTypes.func.isRequired,
}

export default DividerButton
