import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Loading = () => {
    const context=useContext(noteContext)
    const {loading}=context

  return (
      <div id="loading" className="alert alert-warning" style={{display: loading}}>Loading...</div>
  )
}

export default Loading
