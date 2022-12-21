import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
  const { note,updateNoteClick } = props
  const context=useContext(noteContext)
  const {deletenote,showAlert}=context

    return (
      <div className='col-md-3'>
        <div className='card my-3'>
          <div className="card-body">

            <div className='d-flex align-items-center'>
              <h5 className="card-title">{note.title}</h5>
              <i className="fa-solid fa-trash mx-2" onClick={()=>
                {
                  deletenote(note._id)
                  showAlert("Deleted successfully!", "success")
                }}/>
              <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNoteClick(note)}}/>
            </div>

            <p className="card-text">{note.description}</p>
            <p className="card-text">
              <small className="form-text text-muted">{note.tag}</small>
            </p>
          </div>
        </div>
      </div>
  )
}

export default Noteitem
