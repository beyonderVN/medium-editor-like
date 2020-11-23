import { get } from 'lodash'
import React, { useState } from 'react'
import { mentionPlugin } from '../plugins'

// keep support for other draft default block types and add our myCustomBlock type
const Mentions = () => {
  const [value, setValue] = useState()
  const onSearchChange = ({ value }) => {
    setValue(value)
  }
  const suggestions = new Array(5).fill(value).map((item) => ({
    name: value,
    link: `/${value}`,
    avatar: get(item, 'avatar'),
  }))
  const onAddMention = (value) => {
    console.log('onAddMention', value)
    // get the mention object selected
  }
  return (
    <mentionPlugin.MentionSuggestions
      onSearchChange={onSearchChange}
      suggestions={suggestions}
      onAddMention={onAddMention}
    />
  )
}
export default Mentions
