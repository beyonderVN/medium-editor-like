import createLinkPlugin from './anchor'
import './link.css'

const linkPlugin = createLinkPlugin({
  theme: {
    input: 'linkInput',
    inputInvalid: 'linkInputInvalid'
  },
  placeholder: 'http://…(press Enter)',
  linkTarget: '_blank'
  // Link: Anchor
})

export default linkPlugin
