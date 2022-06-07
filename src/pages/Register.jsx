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
import Stepperr from '../components/Stepperr';
import { Typography } from '@mui/material';
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
          isEmailValid:0,
          isCompanyVerified:false
        }
      );
      navigate("/");
    } catch (error) {
      if(error.response.status==409){
        setErrorField(true);
      }
    }
  }
  React.useEffect(() => {
    setIsUser("user");
  }, [])
  
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  return (
      <div style={{backgroundColor:"rgb(248, 248, 248)",minHeight:"100vh"}}>
      <CssBaseline />
    <header className='header' style={{margin:"0 auto 0 auto",width:"50%",borderRadius:"0 0 3rem 3rem"}}>
      <div className="logo">
        <Link to="/">  <Typography variant='h6' sx={{color:"rgb(25, 118, 210)"}}>HR Portal</Typography></Link>
      </div>
      <ul>
        <li>
       <p> Already Have an account? </p>
          
          <Link to="/login">
          <Button variant='contained'>Log In</Button>
          </Link>
        </li>

      </ul>
    </header>
    <div className="container" style={{marginTop:"3%",minHeight:"90vh"}}>
      <Stepperr/>
   </div>
 
   <div style={{color:"white",background: "rgb(21, 101, 192)",bottom:"0",height:"2rem",width:"100%", boxShadow:" 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"}}>
        <div className="mid"  style={{justifyContent:"center",textAlign:"center",alignItems:"center",marginTop:"10px"}}>2022 HrPortal. All rights reserved
  </div>
    </div>
      </div>
  )
}

export default Register