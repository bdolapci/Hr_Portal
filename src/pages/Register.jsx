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
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
function Register() {

  // const [value, setValue] = useState('')
  const[firstName,setFirstName]=React.useState("");
  const[lastName,setLastName]=React.useState("");
  const[email,setEmail]=React.useState("");
  const[password,setPassword]=React.useState("");
  const[isUser,setIsUser]=React.useState("");
  const[confirmPassword,setConfirmPassword]=React.useState("");
  const [isApplicant, setIsApplicant] = useState(false);
  const [emptyField,setEmptyField] = React.useState(false);
  const [errorField,setErrorField] = React.useState(false);
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
  function isUserHandler(e){
    setIsUser(e.target.value);
  }
  function confirmPasswordHandler(e){
    setConfirmPassword(e.target.value);
  }
  const navigate = useNavigate();

  async function reg(){
    try {
      const response =await axios.post(
        "https://localhost:44361/api/Home/register",
        {
          firstName:`${firstName}`,
          lastName:`${lastName}`,
          email:`${email}`,
          Passwords: `${password}`,
          confirmPassword : `${confirmPassword}`,
          userRole: `${isUser}`,
          isApplicant: `${isApplicant}`
        }
      )
      console.log(response)
      console.log(response.data)
      navigate("/");
    } catch (error) {
      setErrorField(true);
      console.log(error);
    }
  }


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
            {errorField ? <Alert severity="error">This email already exists</Alert> :  ""}
            <form onSubmit={(e)=>{
              if(firstName && lastName && email && password && confirmPassword != ""){
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
               <TextField type="password" 
              placeholder='confirm password'
              className='password'
              variant='outlined'
              required
              onChange={confirmPasswordHandler}
              />
              <TextField type="text" 
              placeholder='HR' 
              className='hruser'
              variant='outlined'
              required
              onChange={isUserHandler}
              />
              {/* <div className="count">
              <InputLabel>Country</InputLabel>
              <Select options={options} value={value} onChange={changeHandler} />
              </div> */}
              </div>
             
              {/* <div className="terms"> 
              <input type="checkbox"></input>
              <h4>Accept Terms&Conditions</h4>
              </div>
              <div className="representetive">
              <input type="checkbox"></input>
              <h4>Join as Company Representetive</h4>
              </div> */}
              <Button type="submit">Create Account</Button>
              <hr className='line'></hr>
              <p className='usegoogle'>You can also use google</p>
               <GoogleLogin className='googlelogin' buttonText="Log in with Google"/> 
            </form>
          </div>
      </div>
    </section>
    <Footer/>
      </>
  )
}

export default Register