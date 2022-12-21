import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'

const About = () => {
  const {showAlert}=useContext(noteContext)
  const navigate=useNavigate()

  useEffect(()=>
  {
    if(!localStorage.getItem('token')) navigate("/login")
  },[])

  const removeacc=async()=>
  {
    const url=process.env.REACT_APP_API||"http://localhost:5000"
    let response=await fetch(url+"/api/auth/deleteuser",
    {
      method: 'DELETE',
      headers:
      {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    if(response.status===200)
    {
      showAlert("You are removed from our database successfully!","success")
      localStorage.removeItem('token')
      navigate("/login")
    }
    else showAlert(response.error,"danger")
  }

  return (
    <div className='mt-3'>
      <h1 className='my-5'>Your Account options</h1>
      <div>
        <h2>Delete my account permanently</h2>
        <p>This one click will remove your account and this operation cannot be reversed!</p>
        <button onClick={removeacc}>Delete my account</button>
      </div>
    </div>
  )
}

export default About
