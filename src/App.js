import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import LZString from 'lz-string'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import Editor from './libs/editor'
import { PlusOutlined } from './libs/editor/assets/svgs'
import Icon from './libs/editor/components/Icon'
const encode = (str) => LZString.compressToEncodedURIComponent(str)
const decode = (str) => LZString.decompressFromEncodedURIComponent(str)
window.app = {
  encode,
  decode,
}
const hash = window.location.hash
console.log({ hash })
let initialState = {}
if (hash && hash.length > 1) {
  try {
    const str = JSON.parse(decode(hash.substring(1)))
    if (str) {
      initialState = str
    }
  } catch (error) {
    console.error(error)
  }
}
console.log({ hash, initialState })
export const parseRawContent = (raw) => {
  try {
    return EditorState.createWithContent(convertFromRaw(raw))
  } catch (error) {
    console.error(error)
    return undefined
  }
}
function App() {
  const [content, setContent] = useState(initialState.content)
  const [saving, setSaving] = useState()
  const [title, setTitle] = useState(initialState.title)
  const handlePublish = useCallback(() => {
    const b64 = localStorage.getItem('draft')
    const url = `${window.location.origin}#${b64}`
    console.log({ url })
    prompt('url', url)
  }, [])
  useEffect(() => {
    setSaving(true)
    const timeout = setTimeout(() => {
      const b64 = encode(
        JSON.stringify({
          title: title,
          content: convertToRaw(content),
        })
      )
      window.localStorage.setItem('draft', b64)
      console.log(b64)
      console.log(decode(b64))
      setSaving(false)
    }, 400)
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [content, title])
  return (
    <div className="w-full min-h-screen  px-12 flex justify-center">
      <div className=" flex-1 sticky top-0 border-r  border-gray-300" />
      <div className="w-full max-w-2xl mx-auto rounded a  space-y-6">
        <div className="w-full px-3 space-y-3">
          <div className="py-1 px-2 space-x-3 flex bg-gray-100 rounded-b items-center">
            <div className="flex-1">6 min read. </div>
            <button
              disabled={saving}
              onClick={handlePublish}
              className="py-1 flex items-center px-3 bg-blue-600 text-white rounded hover:shadow bg-opacity-75 hover:bg-opacity-100">
              {saving && (
                <svg
                  className="animate-spin text-sm inline -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx={12}
                    cy={12}
                    r={10}
                    stroke="currentColor"
                    strokeWidth={4}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              Publish
            </button>
          </div>
          {useMemo(
            () => (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="font-serif focus:outline-none  capitalize appearance-none text-4xl w-full block p-3 text-center bg-gray-100"
              />
            ),
            [title]
          )}
        </div>
        {useMemo(
          () => (
            <Editor
              editorState={parseRawContent(initialState.content)}
              onChange={(state) => setContent(state.getCurrentContent())}
            />
          ),
          []
        )}
      </div>
      <div className="self-start sticky top-0 flex-1 background rounded py-2 px-3 space-x-3">
        <div className="grid grid-cols-1 gap-3 ">
          <div className="font-bold text-gray-500 text-sm">
            Use keyboard shortcuts
          </div>
          {[
            [
              ['ctrl', 'b', <span className="font-bold">BOLD</span>],
              ['ctrl', 'i', <span className="italic">italic</span>],
              ['1', '.', 'space', <div>Ordered List</div>],
              ['*', 'space', <div>Unordered List</div>],
            ],
            [
              ['shift', 'enter', <div>soft break</div>],
              ['ctrl', 'z', <div>undo</div>],
              ['shift', 'ctrl', 'z', <div>redo</div>],
            ],
          ].map((list, i) => (
            <div key={i} className="col-span-1 space-y-3">
              {list.map((item, i, array) => {
                return (
                  <div key={i} className="flex space-x-1 items-center ">
                    {item.map((e, i, array) => {
                      if (i === array.length - 1) {
                        return e
                      }
                      return (
                        <Fragment key={i}>
                          <div className="py-1 px-3 rounded text-xs border border-gray-300 text-gray-600">
                            {e}
                          </div>
                          {i < array.length - 2 && (
                            <Icon
                              className="text-xs text-gray-500"
                              component={PlusOutlined}></Icon>
                          )}
                        </Fragment>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
