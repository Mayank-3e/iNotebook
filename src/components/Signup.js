import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'

const Signup = () => {
    const [credentials,setCredentials]=useState({name:"", email:"", password:""})
    const [cpassword,setCpassword]=useState()
    const navigate=useNavigate()
    const context=useContext(noteContext)
    const {showAlert,setLoading}=context
    let url=process.env.REACT_APP_API||"http://localhost:5000"

    const handleSubmit=async(e)=>
    {
        e.preventDefault()
        setLoading()
        let response=await fetch(url+"/api/auth/createuser",
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        })
        setLoading("none")
        response=await response.json()
        if(response.authToken)
        {
            localStorage.setItem('token',response.authToken)
            navigate("/")
            showAlert("Account created successfully!","success")
        }
        else if(response.error) showAlert(response.error,'danger')
        else showAlert(response.errors[0].msg,'danger')
    }

    const onChange=(e)=>
    {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const onChangeCpassword=(e)=>{setCpassword(e.target.value)}

    return (
        <div className='container mt-5'>
            <h2 className='my-3'>Create a new account and start using iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={8}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChangeCpassword} required minLength={8}/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={cpassword===credentials.password?0:1}>Submit</button>
            </form>
        </div>
    )
}

export default Signup
