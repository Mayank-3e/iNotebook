import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'

const Notes = () => {
  const context=useContext(noteContext)
  const {notes,getnotes,editnote,showAlert}=context
  const navigate=useNavigate()

  useEffect(()=>
  {
    if(localStorage.getItem('token')) getnotes()
    else navigate("/login")
  },[])

  const [note,setNote]=useState({id:"", title:"",description:"",tag:""})
  const ref=useRef(null)
  const refclose=useRef(null)

  // runs on clicking edit icon on note card
  const updateNoteClick=(note)=>
  {
    ref.current.click()
    setNote({id:note._id, title:note.title, description:note.description, tag:note.tag})
  }
  const handleClick = (e) =>
  {
    e.preventDefault()
    editnote(note.id, note.title, note.description, note.tag)
    refclose.current.click()
    showAlert("Updated successfully!", "success")
  }
  const onChange=(e)=>
  {
    setNote({...note,[e.target.name]: e.target.value})
  }

  return (
    <>
      <AddNote/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='description' value={note.description} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='tag' value={note.tag} onChange={onChange}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <h2>Your notes</h2>
        <div className='container'>
          {notes.length===0&&"You haven't made any notes."}
        </div>
        {notes.map((note)=>
          {
            return <Noteitem key={note._id} note={note} updateNoteClick={updateNoteClick}/>
          })
        }
      </div>
    </>
  )
}

export default Notes
