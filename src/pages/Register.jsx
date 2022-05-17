import React from 'react'
import  { useState, useMemo } from 'react'
import Navbar from "../components/Navbar";
import "../styles/Navbar.scss"
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "../styles/Register.scss"
import Select from 'react-select';
import { InputLabel,MenuItem,TextField,Alert  } from '@mui/material';
import countryList from 'react-select-country-list'
import GoogleLogin from 'react-google-login';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CssBaseline from '@mui/material/CssBaseline';
function Register() {

  // const [value, setValue] = useState('')
  const[firstName,setFirstName]=React.useState("");
  const[lastName,setLastName]=React.useState("");
  const[email,setEmail]=React.useState("");
  const[password,setPassword]=React.useState("");
  const[isUser,setIsUser]=React.useState("");
  const[confirmPassword,setConfirmPassword]=React.useState("");
  const[country,setCountry]=React.useState("");
  const [gender,setGender] =React.useState("");
  const [phoneNumber,setPhoneNumber]=React.useState("");

  const [errorField,setErrorField] = React.useState(false);
  const [errorField2,setErrorField2] = React.useState(false);
  const [cheked ,setCheked] = React.useState(false);
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
  function countryHandler(e){
    setCountry(e.target.value);
  }
  const genderHandler = gender => {
    setGender(gender)
  }
  function phoneNumberHandler(e){
    setPhoneNumber(e.target.value);
  }
  function isUserHandler(e){
    if(cheked==false){
      setIsUser("hr");
    }else{
      setIsUser("user");
    }
    setCheked(e.target.checked)
  }
  function confirmPasswordHandler(e){
    setConfirmPassword(e.target.value);
  }
  const navigate = useNavigate();
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
  }
const options2=[
 { value: "Female",label:"Female"},
 {value :"Male",label:"Male"},
 {value:"No Answer",label:"No Answer"}
]
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
          country: `${value}`,
          gender: `${gender}`,
          phoneNumber:`${phoneNumber}`,
          isEmailValid:0
        }
      );
      navigate("/");
    } catch (error) {
      if(error.response.status==409){
        setErrorField(true);
      }
    }
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  return (
      <>
      <CssBaseline />
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
            {isUser=="hr"?  <h1>Register as a Employee to work for <br></br> Worldwide Clients</h1>: 
             <h1>Register as a Client to hire  <br></br> Top Employees</h1> }
          
            {errorField ? <Alert sx={{marginBottom:"3%"}} severity="error">This email already exists</Alert> :  ""}
            {errorField2 ? <Alert sx={{marginBottom:"3%"}} severity="error">Passwords do not match</Alert> :  ""}
            <form onSubmit={(e)=>{
              if((firstName && lastName && email && password && confirmPassword) != ""){
                if(password ==confirmPassword){
                  setErrorField2(false);
                }
                setErrorField2(true);
              
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
                label="Last Name"
                variant='outlined'
                required
                onChange={lastNameHandler} 
                />
              </div>
              <div className="other">
              <TextField type="email" 
              placeholder='Email' 
              label="Email"
              className='email'
              variant='outlined'
              required
              onChange={emailHandler}
              />
              <TextField type="password" 
              placeholder='Password' 
              label="Password"
              className='password'
              variant='outlined'
              required
              onChange={passwordHandler}
              inputProps= { {minLength: 8, maxLength: 16} } 
              />
               <TextField type="password" 
              placeholder='confirm password'
              label = "Confirm Password"
              className='password'
              variant='outlined'
              required
              inputProps= { {minLength: 8, maxLength: 16} } 
              onChange={confirmPasswordHandler}
              />
            
              <h4 style={{marginBottom:"0px"}}>Optional</h4>
              <div className="count">
              <TextField
              sx={{scrollMarginBottom:"10px",width:"100%"}}
               type="text" 
              placeholder='Phone Number' 
              className='hruser'
              variant='outlined'
              label="Phone Number"
              onChange={phoneNumberHandler}
              /> 
               <InputLabel sx={{marginTop:"10px"}}>Country</InputLabel>
              <Select  
              sx={{width:"100%"}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="country"
              onChange={changeHandler}
              options={options} >
                 
                </Select>  
              
              <InputLabel sx={{marginTop:"10px"}}>Gender</InputLabel>
              <Select  
              sx={{width:"100%"}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="gender"
              onChange={genderHandler} 
              options={options2}>
            
                </Select>              
            
          </div> 
               <FormControlLabel  control={<Checkbox onChange={isUserHandler} />} label="Register as a Company Representetive" />
             
              </div>
             
        
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