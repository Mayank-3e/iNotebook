import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'

const Login = () => {
    const [credentials,setCredentials]=useState({email:"", password:""})
    const navigate=useNavigate()
    const {showAlert,setLoading}=useContext(noteContext)
    const url=process.env.REACT_APP_API||"http://localhost:5000"

    const handleSubmit=async(e)=>
    {
        e.preventDefault()
        setLoading()
        let response=await fetch(url+"/api/auth/login/",
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        })
        response=await response.json()
        setLoading("none")
        if(response.authToken)
        {
            localStorage.setItem('token',response.authToken)
            showAlert("Logged in successfully!","success")
            navigate("/")
        }
        else if(response.error) showAlert(response.error,'danger')
        else showAlert(response.errors[0].msg,'danger')
    }

    const onChange=(e)=>
    {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='mt-5'>
            <h2>Login to see your notes</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} required minLength={8}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
