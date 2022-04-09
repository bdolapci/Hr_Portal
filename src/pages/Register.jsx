import React from 'react'
import  { useState, useMemo } from 'react'
import Navbar from "../components/Navbar";
import "../styles/Navbar.scss"
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "../styles/Register.scss"
import Select from 'react-select'
import { InputLabel,MenuItem,TextField,Alert  } from '@mui/material';
import countryList from 'react-select-country-list'
import GoogleLogin from 'react-google-login';
import axios from "axios";


function Register() {

  // const [value, setValue] = useState('')
  const[firstName,setFirstName]=React.useState("");
  const[lastName,setLastName]=React.useState("");
  const[email,setEmail]=React.useState("");
  const[password,setPassword]=React.useState("");
  const [emptyField,setEmptyField] = React.useState(false);

  function firstNameHandler(e){
    setFirstName(e.target.value);
  }
  function lastNameHandler(e){
    setLastName(e.target.value);
  }
  function emailHandler(e){
    setEmail(e.target.value);
  }
  function passwordHandler(e){
    setPassword(e.target.value);
  }

  async function reg(){
    try {
      const response =await axios.post(
        "http://localhost:46836/api/Home",
        {
          firstName:`${firstName}`,
          lastName:`${lastName}`,
          email:`${email}`,
          password: `${password}`,
        }
      )
      
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 400) {
        console.log("Bad Password");
      }
      if (error.response.status === 404) {
        console.log("Email not found");
      }
    }
  }
  
  // const options = useMemo(() => countryList().getData(), [])
  // const changeHandler = value => {
  //   setValue(value)
  // }

  return (
      <>
    <header className='header'>
      <div className="logo">
        <Link to="/">HR Portal</Link>
      </div>
      <ul>
        <li>
       <p> Already Have an account? </p>
          
          <Link to="/login">
          <button>Log In</button>
          </Link>
        </li>

      </ul>
    </header>
    <section className='body-register'>
      <div className="register-form">
          <div className="register-form-body">
            <h1>Register as a Employee to work for <br></br> Worldwide Clients</h1>
            {emptyField ? <Alert severity="error">All fields are required!</Alert> :  ""}
            <form onSubmit={(e)=>{
              if(firstName && lastName && email && password != ""){
                reg()
                e.preventDefault()
              }
            }}>
              <div className="name">
                <TextField 
                type="text" 
                placeholder='First Name'
                label="First Name"
                variant='outlined'
                required
                onChange={firstNameHandler} 
                />
                <TextField 
                type="text" 
                placeholder='Last Name' 
                className='lastname'
                label="First Name"
                variant='outlined'
                required
                onChange={lastNameHandler} 
                />
              </div>
              <div className="other">
              <TextField type="email" 
              placeholder='Email' 
              className='email'
              variant='outlined'
              required
              onChange={emailHandler}
              />
              <TextField type="password" 
              placeholder='Password' 
              className='password'
              variant='outlined'
              required
              onChange={passwordHandler}
              />
              {/* <div className="count">
              <InputLabel>Country</InputLabel>
              <Select options={options} value={value} onChange={changeHandler} />
              </div> */}
              </div>
             
              <div className="terms"> 
              <input type="checkbox"></input>
              <h4>Accept Terms&Conditions</h4>
              </div>
              <Button type="submit">Create Account</Button>
              <hr className='line'></hr>
              <p className='usegoogle'>You can also use google</p>
              {/* <GoogleLogin className='googlelogin' buttonText="Log in with Google"/> */}
            
            

            <p>Are you a client? <span> Register as a Client</span></p>
            </form>
          </div>
      </div>
    </section>
    <footer>

    </footer>
      </>
  )
}

export default Register