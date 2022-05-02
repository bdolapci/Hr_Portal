import React from 'react'
import  { useState, useMemo } from 'react'
import "../styles/Navbar.scss"
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Register.scss"
import { InputLabel,MenuItem,TextField  } from '@mui/material';
import countryList from 'react-select-country-list'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
function Login() {
  //let Navigate =useNavigate();
  const[email,setEmail]=React.useState("");
  const[password,setPassword]=React.useState("");
  const [errorField,setErrorField] = React.useState(false);
  const Navigate = useNavigate();
  function emailHandler(e){
    setEmail(e.target.value);
  }
  function passwordHandler(e){
    setPassword(e.target.value);
  }

  async function log(){
    try {
      const response =await axios.post(
        "https://localhost:44361/api/Home/login",
        {
          email:`${email}`,
          Password:`${password}`,
        }
      );
      console.log(errorField);
      console.log(response)

   
        localStorage.setItem("User", JSON.stringify(response.data));
        var token=localStorage.getItem("User");
        var decoded = jwt_decode(token);

        if(decoded.userRole==="admin"){
          setTimeout(function () { 
           if(errorField === true || localStorage.getItem("User") !=null ){
             Navigate("/adminPanel");
             }
          },);
        }else if(decoded.userRole === "hr"){
          setTimeout(function(){
            if(errorField === true || localStorage.getItem("User") !=null ){
              Navigate("/hrPanel/home");
              }
          },);
        }else{
          setTimeout(function(){
            if(errorField === true || localStorage.getItem("User") !=null ){
              Navigate("/");
              }
          },);
        }
        Navigate("/");
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
            <form
            onSubmit={(e)=>{
              if(email && password != ""){
                log()
                e.preventDefault()
              
              }
            }}
            >
              
               {errorField ? <Alert severity="error">E-mail and password doesn't match!</Alert> :  ""}
              <div className="other">
              <TextField onChange={emailHandler} type="email" placeholder='Email' className='email'/>
              <TextField onChange={passwordHandler} type="password" placeholder='Password' className='password'/>
             
              </div>
              
              <Button variant='outlined' type="submit">Login</Button>
              <hr className='line'></hr>
              <p className='usegoogle'>You can also use google</p>
              {/* <GoogleLogin className='googlelogin' buttonText="Log in with Google"/> */}
            </form>
          </div>
      </div>
    </section>
    <Footer/>
      </>
  )
}

export default Login