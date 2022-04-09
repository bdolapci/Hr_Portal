import React from 'react'
import  { useState, useMemo } from 'react'
import "../styles/Navbar.scss"
import { Link } from 'react-router-dom';
import "../styles/Register.scss"
import { InputLabel,MenuItem,TextField  } from '@mui/material';
import countryList from 'react-select-country-list'
import GoogleLogin from 'react-google-login';
function Login() {

  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
  }

  return (
      <>
    <header className='header'>
      <div className="logo">
        <Link to="/">HR Portal</Link>
      </div>
      <ul>
        <li>
       <p> Dont Have an account? </p>
          
          <Link to="/register">
          <button>Register</button>
          </Link>
        </li>

      </ul>
    </header>
    <section className='body-register'>
      <div className="register-form">
          <div className="register-form-body">
            <h1>Log In</h1>
            <form>
              
              <div className="other">
              <TextField type="email" placeholder='Email' className='email'/>
              <TextField type="password" placeholder='Password' className='password'/>
             
              </div>
              <Link to="/"> 
              <button className='loggin'>Log In</button></Link>
              <hr className='line'></hr>
              <p className='usegoogle'>You can also use google</p>
              <GoogleLogin className='googlelogin' buttonText="Log in with Google"/>
            </form>
          </div>
      </div>
    </section>
    <footer>

    </footer>
      </>
  )
}

export default Login