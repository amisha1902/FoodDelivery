import { useState } from "react"
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
  const [credentials, setcredentials] = useState({  email: '', password: '' })
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/loginuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({  email: credentials.email, password: credentials.password })
            });
            console.log('Login API Response:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();
            console.log('JSON response:', json);

            if (!json.success) {
              console.log('Login unsuccessful. Response:', json);
              alert("Invalid credentials");
            }
            else{
                localStorage.setItem("userEmail", credentials.email)
                localStorage.setItem("authToken", json.authToken)
                console.log(localStorage.getItem("authToken"))
              navigate('/');
            }
            
        } 
        
           catch (error) {
            console.error('Network error:', error);
        }
       
    };
 
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
  return (
    <div><>
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
            </div>
            <button type="submit" className="m-3 btn btn-primary">Submit</button>
            <Link to="/createuser" className='m-3 btn btn-danger'>I am a new user!</Link>
        </form>
    </div>


</></div>
  )
}
