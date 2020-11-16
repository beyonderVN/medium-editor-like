import {
  EditorState,
  Modifier
} from 'draft-js'

export function createStore(
  initialState = {}
) {
  let state = initialState
  const listeners = {}

  return {
    subscribeToItem(key, callback) {
      listeners[key] =
        listeners[key] || []
      listeners[key] &&
        listeners[key].push(callback)
    },
    unsubscribeFromItem(key, callback) {
      const listener = listeners[key]
      if (listener) {
        listeners[
          key
        ] = listener.filter(
          currentListener =>
            currentListener !== callback
        )
      }
    },
    updateItem(key, item) {
      state = {
        ...state,
        [key]: item
      }
      const listener = listeners[key]
      if (listener) {
        listener.forEach(
          currentListener =>
            currentListener(state[key])
        )
      }
    },
    getItem(key) {
      return state[key]
    }
  }
}

export const updateEntity = (
  editorState,
  entityKey,
  patch
) => {
  const mergedContent = editorState
    .getCurrentContent()
    .mergeEntityData(entityKey, patch)

  const changedContentState = Modifier.applyEntity(
    mergedContent,
    editorState.getSelection(),
    entityKey
  )

  return EditorState.push(
    editorState,
    changedContentState,
    'insert-characters'
  )
}
