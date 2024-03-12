import React, { useId } from 'react'

export default function Select({
    option,
    label,
    className="",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label className='' htmlFor={id}></label>}
    </div>
  )
}
