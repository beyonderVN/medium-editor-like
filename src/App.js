import { Fragment } from 'react'
import './App.css'
import Editor from './libs/editor'
import { PlusOutlined } from './libs/editor/assets/svgs'
import Icon from './libs/editor/components/Icon'
const usePage = (id) => {
  return
}
function App() {
  return (
    <div className="w-full min-h-screen  px-12 flex justify-center">
      <div className=" flex-1 sticky top-0 border-r  border-gray-300" />
      <div className="w-full max-w-2xl mx-auto rounded a py-12 space-y-6">
        <div className="w-full p-3">
          <input
            placeholder="Title"
            className="font-serif focus:outline-none  capitalize appearance-none text-4xl w-full block p-3 text-center bg-gray-100"
          />
        </div>
        <Editor />
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
