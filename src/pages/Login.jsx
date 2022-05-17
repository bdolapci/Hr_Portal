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
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

function Login() {
  //let Navigate =useNavigate();
  const[email,setEmail]=React.useState("");
  const[password,setPassword]=React.useState("");
  const [errorField,setErrorField] = React.useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

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

  const [getEmail,setGetEmail]=useState("");
  const steps = ['Enter Email', 'Confirmation', 'New Password'];

  let randomnum="0";
  const [emptyField2,setEmptyField2] = React.useState(false);
  const [emptyField3,setEmptyField3] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [controlNum, setControlNum] = useState("");
    const [wrongEmail,setWrongEmail] = React.useState(false);
    const [num,setNum] = useState("");


    async function emailgets(){
      try {
        
      if(email){
         axios.get(
          `https://localhost:44361/api/Home/Useremail/${email}`,{
            headers: {
              "Content-Type": "application/json",
            }
          }
        ).then((res)=>{
          setGetEmail(res.data);
        })
      }

      } catch (error) {
        console.log(error);
      }
    }
        


  async function changePass() {
    try {
      const response2 = await axios.post(
        `https://localhost:44361/api/Home/changePassword`,
        {
            id: getEmail.Id,
            email:getEmail.email,
            Passwords: password,
            firstName:getEmail.firstName,
            lastName:getEmail.lastName,
            userRole:getEmail.userRole,
        }
      );
     
      //  window.location.reload();
     
    } catch (error) {
      console.log(error);
   
    }
  }
 
    async function controlemail() {
      try {
        const response2 = await axios.post(
          `https://localhost:44361/api/Home/sendotp`,
          {
           ToEmail:`${email}`,
           Subject:"OtpCode",
          }
        ).then(({data})=>{
          setNum(data)
        })
        randomNumber();
      } catch (error) {
        console.log(error);
     
      }
    }
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const skip= ()=>{
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleNext = () => {
      if (activeStep===0) {
          controlemail();
        if(email){
          emailgets();
          randomNumber();
         skip();
          setWrongEmail(false);
        }else{
          setWrongEmail(true); 
          //setEmptyField(true);
        }
      }else if(activeStep===1){
        if(controlNum==num){
         skip();
        }else{
          randomNumber();
          setControlNum();
          setEmptyField2(true);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
         
        }
        //controlnum
      }else if(activeStep===2){
        if(password.length<8){
          setEmptyField3(true);
        }
        else{
          setEmptyField3(false);
        changePass();
        skip();
        }

      }else if(activeStep===3){
        //route main menu
      }
      
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const randomNumber= () =>{
      randomnum=Math.floor(Math.random()*100000);
      randomnum=""+randomnum;
    }
  
    const emailInput = (e) => {
      setEmail(e.target.value);
    };
  
    const controlInput = (e) => {
      setControlNum(e.target.value);
    };
  
    const passwordInput = (e) => {
      setPassword(e.target.value);
    };
 
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
      <div className="register-form" >
          <div className="register-form-body" >
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
              <TextField label="Email" onChange={emailHandler} type="email" placeholder='Email' className='email'/>
              <TextField label="Password" onChange={passwordHandler}  inputProps= { {minLength: 8, maxLength: 16} }  type="password" placeholder='Password' className='password'/>
             
              </div>
              
              <Button variant='outlined' type="submit">Login</Button>
             
              <hr className='line'></hr>
            </form>
            <p className='usegoogle'>You can also use google</p>
              <GoogleLogin className='googlelogin' buttonText="Log in with Google"/>
            <Button   onClick={handleOpen} sx={{marginTop:"10%"}} >Forgot Password?</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
             <Box sx={{ ...style, width: 800, background:"" }}>
           <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished...
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
        {emptyField2 ? <Alert severity="error">verification number is incorrect</Alert> :  ""}
          {activeStep === 0 ?( 
          <TextField style={{marginTop:"20px",marginLeft:"20px"}} onChange={emailInput} id="outlined-basic" label="Email" variant="outlined" />
          ):""}
          {wrongEmail ? <Alert severity="error">Email is not correct</Alert> :  ""}
          {activeStep === 1 ?( 
            <React.Fragment>
              {/* <Typography style={{marginTop:"20px",marginLeft:"20px",backgroundColor:"white",width:"200px",height:"50px",textAlign:"center"}} sx={{ mt: 2, mb: 1 }}>{randomnum}</Typography> */}
              <TextField style={{marginTop:"20px",marginLeft:"20px"}} onChange={controlInput}  id="outlined-basic" label="upper number" variant="outlined" />
            </React.Fragment>
          ):""}
          {emptyField3 ? <Alert severity="error">Password is cannot be shorter than 8 digit</Alert> :  ""}
          {activeStep === 2 ?( 
          <TextField type= {"password"} style={{marginTop:"20px",marginLeft:"20px"}}   inputProps={{ minLength:8,maxLength: 16 }}  onChange={passwordInput} id="outlined-basic" label="new password" variant="outlined" />
          ):""}
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
           </Box>
            </Modal> 
          </div>
      </div>
    </section>
    <Footer/>
      </>
  )
}

export default Login