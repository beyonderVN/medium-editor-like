import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import 'draft-js-focus-plugin/lib/plugin.css'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createListPlugin from 'draft-js-list-plugin'
import createMentionPlugin, { defaultTheme } from 'draft-js-mention-plugin'
import 'draft-js-mention-plugin/lib/plugin.css'
import { composeDecorators } from 'draft-js-plugins-editor'
import 'draft-js/dist/Draft.css'
import { merge } from 'lodash'
import createDividerPlugin from './plugins/divider'
import createEmbedPlugin from './plugins/embed'
import createImagePlugin from './plugins/image'
import createAlignmentPlugin from './plugins/imageAlignment'
import inlineToolbarPlugin from './plugins/inlineToolbar'
import linkPlugin from './plugins/link'

const blockBreakoutPlugin = createBlockBreakoutPlugin()
export const linkifyPlugin = createLinkifyPlugin({
  target: '_blank',
})
export const focusPlugin = createFocusPlugin()
export const blockDndPlugin = createBlockDndPlugin()
export const alignmentPlugin = createAlignmentPlugin()
export const dividerPlugin = createDividerPlugin({
  decorator: composeDecorators(focusPlugin.decorator),
})
const decorator = composeDecorators(
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
)
export const imagePlugin = createImagePlugin({
  decorator,
})
export const embedPlugin = createEmbedPlugin({
  decorator,
})
export const mentionPlugin = createMentionPlugin({
  theme: merge({}, defaultTheme, {
    mention: 'font-semibold color-primary truncate',
    mentionSuggestions:
      'z-20 border border-gray-300 absolute  max-w-full background shadow-lg cursor-pointer py-2 flex flex-col transform  scale-0',
  }),
  supportWhitespace: true,
})
export const tagPlugin = createMentionPlugin({
  theme: merge({}, defaultTheme, {
    mention: 'font-semibold color-primary truncate',
    mentionSuggestions:
      'z-20 border border-gray-300 absolute  max-w-full background shadow-lg cursor-pointer py-2 flex flex-col transform  scale-0',
  }),
  mentionTrigger: '#',
})

export const listPlugin = createListPlugin()
const plugins = [
  linkifyPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  imagePlugin,
  embedPlugin,
  linkPlugin,
  dividerPlugin,
  listPlugin,
  inlineToolbarPlugin,
  blockBreakoutPlugin,
]
export default plugins
