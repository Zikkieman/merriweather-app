import React from 'react'

export default function SecButton({children, Propfunc}: any) {
  return (
    <button
    className="self-end bg-sky-700 py-1 px-2 rounded-lg text-white shadow-lg mr-1"
    onClick={Propfunc}
  >
  {children}
  </button>
  )
}
