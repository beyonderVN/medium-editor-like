import React, { useRef } from 'react'
import { useClickAway } from 'react-use'
import { PlusOutlined } from '../../../../assets/svgs'
import { preventParentEvent } from '../../../../utils'

export default function BlockTypeSelect({ open, toggle, ...props }) {
  const { children } = props
  const ref = useRef(null)
  useClickAway(ref, () => {
    toggle(false)
  })

  return (
    <div
      onMouseDown={preventParentEvent}
      ref={ref}
      className={
        'flex space-x-3 -mx-3 buttonScalableGroup pointer-events-none' +
        (open ? ' is-scaled' : '')
      }>
      <button
        onClick={toggle}
        className="w-10 h-10  button--inlineTooltipControl pointer-events-auto border boder-gray-600 flex justify-center items-center background-100 hover:background-200 shadow-2xl z-10 rounded-full">
        <PlusOutlined />
      </button>
      <div className="spacer " />
      <div
        className={
          'space-x-2 flex ' +
          (open ? 'pointer-events-auto' : ' pointer-events-none')
        }>
        {children}
      </div>
    </div>
  )
}
