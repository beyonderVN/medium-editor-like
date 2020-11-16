import classNames from 'classnames'
import DefaultLink from 'draft-js-anchor-plugin/lib/components/Link'
import linkStrategy from 'draft-js-anchor-plugin/lib/linkStrategy'
import URLUtils from 'draft-js-anchor-plugin/lib/utils/URLUtils'
import EditorUtils from 'draft-js-plugins-utils'
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

const AddLinkForm = props => {
  const {
    getEditorState,
    setEditorState
  } = props
  const [value, setValue] = useState(
    props.value
  )
  const [
    isInvalid,
    setIsvalid
  ] = useState(false)

  const input = useRef(null)

  useEffect(() => {
    input.current &&
      input.current.focus()
  }, [])

  const isUrl = urlValue => {
    if (props.validateUrl) {
      return props.validateUrl(urlValue)
    }

    return URLUtils.isUrl(urlValue)
  }

  const onChange = event => {
    const newValue = event.target.value

    if (
      isInvalid &&
      isUrl(
        URLUtils.normalizeUrl(newValue)
      )
    ) {
      setIsvalid(false)
    } else {
      setIsvalid(true)
    }

    setValue(newValue)
  }

  const onClose = () =>
    props.onOverrideContent(undefined)

  const submit = () => {
    let url = value

    if (
      !URLUtils.isMail(
        URLUtils.normaliseMail(url)
      )
    ) {
      url = URLUtils.normalizeUrl(url)
      if (!isUrl(url)) {
        setIsvalid(true)
        return
      }
    } else {
      url = URLUtils.normaliseMail(url)
    }
    let newEstate = EditorUtils.removeLinkAtSelection(
      getEditorState()
    )
    newEstate = EditorUtils.createLinkAtSelection(
      getEditorState(),
      url
    )
    setEditorState(newEstate)
    input.current &&
      input.current.blur()
    onClose()
  }

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submit()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    }
  }

  const { theme, placeholder } = props
  const className = isInvalid
    ? classNames(
        theme.input,
        theme.inputInvalid
      )
    : theme.input

  return (
    <input
      className={className}
      onBlur={onClose}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      ref={input}
      type="text"
      value={value}
    />
  )
}

const LinkButton = props => {
  const onMouseDown = event => {
    event.preventDefault()
  }
  const {
    ownTheme,
    placeholder,
    onOverrideContent,
    validateUrl,
    getEditorState,
    setEditorState
  } = props

  const { theme = {} } = props

  const hasLinkSelected = EditorUtils.hasEntity(
    props.store.getEditorState &&
      props.store.getEditorState(),
    'LINK'
  )
  const entity = EditorUtils.getCurrentEntity(
    props.store.getEditorState()
  )
  const entityData = entity
    ? entity.getData()
    : undefined
  const href =
    (entityData && entityData.url) ||
    undefined
  const className = hasLinkSelected
    ? classNames(
        theme.button,
        theme.active
      )
    : theme.button
  const onAddLinkClick = useCallback(
    event => {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      const content = contentProps => (
        <AddLinkForm
          value={href}
          {...contentProps}
          placeholder={placeholder}
          theme={ownTheme}
          validateUrl={validateUrl}
        />
      )

      onOverrideContent(content)
    },
    [
      href,
      onOverrideContent,
      ownTheme,
      placeholder,
      validateUrl
    ]
  )
  return (
    <div onMouseDown={onMouseDown}>
      <button
        className={className}
        onClick={
          hasLinkSelected
            ? () => {
                let newEstate = EditorUtils.removeLinkAtSelection(
                  getEditorState()
                )

                setEditorState(
                  newEstate
                )
              }
            : onAddLinkClick
        }
        type="button">
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
        </svg>
      </button>
    </div>
  )
}

export default function createLinkPlugin(
  config = {}
) {
  const {
    theme = {},
    placeholder,
    Link,
    linkTarget,
    validateUrl
  } = config

  const store = {
    getEditorState: undefined,
    setEditorState: undefined
  }

  const DecoratedDefaultLink = props => (
    <DefaultLink
      {...props}
      className={theme.link}
      target={linkTarget}
    />
  )

  const DecoratedLinkButton = props => (
    <LinkButton
      {...props}
      ownTheme={theme}
      store={store}
      placeholder={placeholder}
      validateUrl={validateUrl}
    />
  )

  return {
    initialize: ({
      getEditorState,
      setEditorState
    }) => {
      store.getEditorState = getEditorState
      store.setEditorState = setEditorState
    },

    decorators: [
      {
        strategy: linkStrategy,
        component:
          Link || DecoratedDefaultLink
      }
    ],

    LinkButton: DecoratedLinkButton
  }
}
