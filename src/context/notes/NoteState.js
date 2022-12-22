import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState=(props)=>
{
  const host=process.env.REACT_APP_API||"http://localhost:5000"
  
  const [notes,setNotes] = useState([])

  const getnotes=async()=>
  {
    // api call
    let response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    response=await response.json()
    setNotes(response)
  }

  const addnote=async(note)=>
  {
    // api call
    let response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(note)
    });
    response=await response.json()

    // client logic
    setNotes(notes.concat(response))
  }

  const deletenote=async(id)=>
  {
    // api call
    let response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });

    // client logic
    const newnotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newnotes)
  }

  const editnote=async(id,title,description,tag)=>
  {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });

    // client logic
    let newnotes=await JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < newnotes.length; i++)
    {
      const e=newnotes[i]
      if(e._id===id)
      {
        newnotes[i].title=title
        newnotes[i].description=description
        newnotes[i].tag=tag
        break;
      }
    }
    setNotes(newnotes)
  }

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
      setAlert({
          msg: message,
          type: type
      });
      setTimeout(() => {
          setAlert(null);
      }, 1000);
  }

  // setLoading to "none" or null
  const [loading,setLoading]=useState("none")
  const showLoading=(val)=>{setLoading(val)}

  return(
      <NoteContext.Provider value={{notes,getnotes,addnote,deletenote,editnote,showAlert,alert,loading,setLoading}}>
          {props.children}
      </NoteContext.Provider>
  )
}

export default NoteState