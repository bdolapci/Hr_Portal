import React from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Alert } from "@mui/material";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import  { useState, useMemo } from 'react'
import Navbar from "../components/Navbar";
import "../styles/Navbar.scss"
import { InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import "../styles/Register.scss"
import Select from 'react-select';
import countryList from 'react-select-country-list'
import GoogleLogin from 'react-google-login';
import Footer from '../components/Footer';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams } from "react-router-dom";

const steps = ['Enter your information  ','Education Background' ,'Job Experience',"Overview"];

function Stepperr() {

  const {id} = useParams();
  
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email,setEmail]  = React.useState("");
  const [schoolName, setSchoolName] = React.useState("");
  const [schoolName2, setSchoolName2] = React.useState("");
  const [schoolName3, setSchoolName3] = React.useState("");
  const [degree, setDegree] = React.useState("");
  const [degree2, setDegree2] = React.useState("");
  const [degree3, setDegree3] = React.useState("");
  const [gpa, setGpa] = React.useState("");
  const [gpa2, setGpa2] = React.useState("");
  const [gpa3, setGpa3] = React.useState("");
  const [educationdate, setEducationdate] = React.useState("");
  const [educationdate2, setEducationdate2] = React.useState("");
  const [educationdate3, setEducationdate3] = React.useState("");
  const [companyName,setCompanyName]=React.useState("");
  const [companyName2,setCompanyName2]=React.useState("");
  const [companyName3,setCompanyName3]=React.useState("");
  const [jobTitle,setJobTitle]=React.useState("");
  const [jobTitle2,setJobTitle2]=React.useState("");
  const [jobTitle3,setJobTitle3]=React.useState("");
  const [jobDescription,setJobDescription]=React.useState("");
  const [jobDescription2,setJobDescription2]=React.useState("");
  const [jobDescription3,setJobDescription3]=React.useState("");
  const [yearsOfExperience,setYearsOfExperience]=React.useState("");
  const [yearsOfExperience2,setYearsOfExperience2]=React.useState("");
  const [yearsOfExperience3,setYearsOfExperience3]=React.useState("");
  
  const [linkedin,setLinkedin]=React.useState("");
  const [github,setGithub]=React.useState("");
  const [website,setWebsite]=React.useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };
 
  const schoolNameHandler = (e) => {
    setSchoolName(e.target.value);
  };
  const schoolNameHandler2 = (e) => {
    setSchoolName2(e.target.value);
  };
  const schoolNameHandler3 = (e) => {
    setSchoolName3(e.target.value);
  };
  const degreeHandler = (e) => {
    setDegree(e.target.value);
  };
  const degreeHandler2 = (e) => {
    setDegree2(e.target.value);
  };
  const degreeHandler3 = (e) => {
    setDegree3(e.target.value);
  };
  const gpaHandler = (e) => {
    setGpa(e.target.value);
  };
  const gpaHandler2 = (e) => {
    setGpa2(e.target.value);
  };
  const gpaHandler3 = (e) => {
    setGpa3(e.target.value);
  };
  const educationdateHandler = (e) => {
    setEducationdate(e.target.value);
  };
  const educationdateHandler2 = (e) => {
    setEducationdate2(e.target.value);
  };
  const educationdateHandler3 = (e) => {
    setEducationdate3(e.target.value);
  };
  const companyNameHandler = (e) => {
    setCompanyName(e.target.value);
  };
  const companyNameHandler2 = (e) => {
    setCompanyName2(e.target.value);
  };
  const companyNameHandler3 = (e) => {
    setCompanyName3(e.target.value);
  };
  const jobTitleHandler = (e) => {
    setJobTitle(e.target.value);
  };
  const jobTitleHandler2 = (e) => {
    setJobTitle2(e.target.value);
  };
  const jobTitleHandler3 = (e) => {
    setJobTitle3(e.target.value);
  };
  const jobDescriptionHandler = (e) => {
    setJobDescription(e.target.value);
  };
  const jobDescriptionHandler2 = (e) => {
    setJobDescription2(e.target.value);
  };
  const jobDescriptionHandler3 = (e) => {
    setJobDescription3(e.target.value);
  };
  const yearsOfExperienceHandler = (e) => {
    setYearsOfExperience(e.target.value);
  };
  const yearsOfExperienceHandler2 = (e) => {
    setYearsOfExperience2(e.target.value);
  };
  const yearsOfExperienceHandler3 = (e) => {
    setYearsOfExperience3(e.target.value);
  };
  
  const linkedinHandler = (e) => {
    setLinkedin(e.target.value);
  };
  const githubHandler = (e) => {
    setGithub(e.target.value);
  };
  const websiteHandler = (e) => {
    setWebsite(e.target.value);
  };


  let user=JSON.parse(localStorage.getItem("User"));
  if(JSON.parse(localStorage.getItem("User")) !== null){
    try {
      var token=localStorage.getItem("User");
      var decoded = jwt_decode(token);
      
    } catch (error) {
      console.log(error)
    }
    }

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const [emptyalert, setEmptyalert] = React.useState(false);

  const handleNext = () => {

    let newSkipped = skipped; 
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    setEmptyAlertError(false);
    setPasswordAlert(false);
    setPasswordAlert2(false);
    setEmailAlert(false);
    setErrorField(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  let emaila=[]
  const [getalluser, setGetalluser] = React.useState([]);
  React.useEffect(()=>{
    axios.get(`https://localhost:44361/api/Home`)
    .then(res=>{
      for(var i=0;i<res.data.length;i++){
        emaila.push(res.data[i].email)
      }
      setGetalluser(emaila);
    }
    )
  },[])

  const anotherJob=()=>{
    return(
      <>
     
          {jobs.length==1 ?   
          <>
          <Typography sx={{marginLeft:"5%",border:"1px solid black",width:"25px",borderRadius:"100%"}} > 3</Typography>
             <Box sx={{justifyContent:"space-between",marginBottom:"5%"}}>
           <TextField
          defaultValue={companyName3}
          id="outlined-required"
          label="Company Name"
          sx={{marginRight:"2%"}}
          onChange={companyNameHandler3 }
          variant="outlined"
        />
        <TextField
          defaultValue={jobTitle3}
          id="outlined-required"
          label="Job Title"
          onChange={jobTitleHandler3 }
          sx={{marginRight:"2%"}}
          variant="outlined"
        />
         <TextField
          defaultValue={yearsOfExperience3}
          onChange={yearsOfExperienceHandler3 }
          id="outlined-number"
          type={'number'}
          label="Years of Experience"
          variant="outlined"
        />
        </Box>
        <TextField
          defaultValue={jobDescription3}
              multiline
              onChange={jobDescriptionHandler3 }
              rows={5}
              sx={{width:"400px"}}
          
          id="outlined-required"
          label="Work Description"
         
        />
          </> :
          <>
          <Typography sx={{marginLeft:"5%",border:"1px solid black",width:"25px",borderRadius:"100%"}} > 2</Typography>
          <Box sx={{justifyContent:"space-between",marginBottom:"5%"}}>

        <TextField
        defaultValue={companyName2}
        id="outlined-required"
        label="Company Name"
        sx={{marginRight:"2%"}}
        onChange={companyNameHandler2 }
        variant="outlined"
        />
         <TextField
          defaultValue={jobTitle2}
          onChange={jobTitleHandler2 }
          id="outlined-required"
          label="Job Title"
          sx={{marginRight:"2%"}}
          variant="outlined"
        />
         <TextField
          defaultValue={yearsOfExperience2}
          onChange={yearsOfExperienceHandler2 }
          id="outlined-required"
          label="Years of Experience"
          variant="outlined"

        />
        </Box>
        <TextField
          defaultValue={jobDescription2}
              multiline
              onChange={jobDescriptionHandler2}
              rows={5}
              sx={{width:"400px"}}
          
          id="outlined-required"
          label="Work Description"
         
        />
        </>
        }
      </>
    )
  }
  const anotherEducation=()=>{
    
    return(
      <>
     
        {education.length==1 ?
        <>
        <Typography sx={{marginLeft:"5%",border:"1px solid black",width:"25px",borderRadius:"100%"}} > 3</Typography>
         <Box sx={{justifyContent:"space-between",marginBottom:"5%"}}>
          <TextField
    defaultValue={schoolName3}
    id="outlined-required"
    label="School Name"
    sx={{marginRight:"2%"}}
    variant="outlined"
    onChange={schoolNameHandler3 }
  />
           <TextField
    defaultValue={degree3}
    id="outlined-required"
    label="Degree"
    sx={{marginRight:"2%"}}
    variant="outlined"
    onChange={degreeHandler3 }
  />
   <TextField
    defaultValue={gpa3}
    type={'number'}
    id="outlined-number"
    label="GPA"
  onChange={gpaHandler3 }
    variant="outlined"
  />
       </Box>
       <Typography>Graduation Date</Typography>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                label="Date"
                value={educationdate3 ||null}
               format="DD-MM-YYYY"
               onChange={(newValue3) => {
                  setEducationdate3(newValue3);
               
               }}
              
               renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
         
          </>: 
          <>
          <Typography sx={{marginLeft:"5%",border:"1px solid black",width:"25px",borderRadius:"100%"}} > 2</Typography>
             <Box sx={{justifyContent:"space-between",marginBottom:"5%"}}>
            <TextField
    defaultValue={schoolName2}
    onChange={schoolNameHandler2 }
    id="outlined-required"
    label="School Name"
    sx={{marginRight:"2%"}}
    variant="outlined"
  />
           <TextField
    defaultValue={degree2}
    onChange={degreeHandler2 }
    id="outlined-required"
    label="Degree"
    sx={{marginRight:"2%"}}
    variant="outlined"
  />
   <TextField
    defaultValue={gpa2}
    type={'number'}
    onChange={gpaHandler2 }
    id="outlined-number"
    label="GPA" 
  
    variant="outlined"
  />
    </Box>
    <Typography>Graduation Date</Typography>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                 label="Date"
                 value={educationdate2 ||null}
                format="DD-MM-YYYY"
                onChange={(newValue2) => {
                   setEducationdate2(newValue2);
                    console.log(newValue2)
                }}
                
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

          </>
        }
      
       
     
      </>
    )
  }
  const nav = useNavigate();


  const [count, setCount] = React.useState(0);


  const[password,setPassword]=React.useState("");
  const[isUser,setIsUser]=React.useState("");
  const[confirmPassword,setConfirmPassword]=React.useState("");
  const[country,setCountry]=React.useState("");
  const [gender,setGender] =React.useState("");
  const [phoneNumber,setPhoneNumber]=React.useState("");

  const [errorField,setErrorField] = React.useState(false);
  const [errorField2,setErrorField2] = React.useState(false);
  const [cheked ,setCheked] = React.useState(false);
  
  function passwordHandler(e){
    setPassword(e.target.value);
  }
  function countryHandler(e){
    setCountry(e.target.value);
  }
  function genderHandler(e){
    setGender(e);
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

const newDate =new Date();

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
          country: `${value.label}`,
          gender: `${gender.value}`,
          phoneNumber:`${phoneNumber}`,
          regDate:newDate,
          education:`${schoolName},${schoolName2},${schoolName3},${degree},${degree2},${degree3},${gpa},${gpa2},${gpa3},${educationdate},${educationdate2},${educationdate3},`,
          experience:`${companyName},${companyName2},${companyName3},${jobTitle},${jobTitle2},${jobTitle3},${jobDescription},${jobDescription2},${jobDescription3},${yearsOfExperience},${yearsOfExperience2},${yearsOfExperience3},`,
          linkedin:`${linkedin}`,
          facebook:`${github}`,
          website:`${website}`,
          isCompanyVerified:false,
          
        }
      )
      console.log("geldi")
        navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    setIsUser("user");
  }, [])

  const [jobs,setJobs]=React.useState([]);

  const [education,setEducation]=React.useState([]);
  const addeducationlist=(event)=>{
    setEducation([...education,anotherEducation()])
  }
  const addjoblist=(event)=>{
    setJobs([...jobs,anotherJob()])
  }

  const [emptyalerterror,setEmptyAlertError]=React.useState(false);
  const [alert1,setAlert1]=React.useState(false);
  const [passwordalert,setPasswordAlert]=React.useState(false);
  const [passwordalert2,setPasswordAlert2]=React.useState(false);
  const [emailalert,setEmailAlert]=React.useState(false);
  return (
    <Box sx={{ width: '100%' }}>
         {isUser=="user"?  <Typography variant="h4" sx={{marginBottom:"2%"}}>Register as an <span style={{color:"rgb(25, 118, 210)"}}>Employee</span> to work for <br></br> Worldwide <span style={{color:"rgb(25, 118, 210)"}}>Clients</span></Typography>: 
             <Typography variant="h4" sx={{marginBottom:"2%"}}>Register as a <span style={{color:"rgb(25, 118, 210)"}}>Client</span> to hire  <br></br> Top <span style={{color:"rgb(25, 118, 210)"}}>Employees</span></Typography> }
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
      <form onSubmit={(e)=>{
              if((firstName && lastName && email && password && confirmPassword) != ""){
                if(password ==confirmPassword){
                  setErrorField2(false);
                }
                else if (password != confirmPassword){
                  setErrorField2(true);
                }
                if(errorField2==true ){
                  setTimeout(() => window.location.reload(), 3000);

                }
              
                reg()
                e.preventDefault()
              }
            }}>
              {emptyalerterror ? 
                <Alert sx={{marginBottom:"3%",marginTop:"3%"}} severity="error">Please fill all the required fields</Alert>
             :null}
              {emailalert ? 
                <Alert sx={{marginBottom:"3%",marginTop:"3%"}} severity="error">This is not a valid email</Alert>
             :null}
             {passwordalert ? 
                <Alert sx={{marginBottom:"3%",marginTop:"3%"}} severity="error">Passwords do not match</Alert>
             :null}
               {passwordalert2 ? 
                <Alert sx={{marginBottom:"3%",marginTop:"3%"}} severity="error">Password length must be at least 8 digit</Alert>
             :null}
                {errorField ? <Alert sx={{marginBottom:"3%",marginTop:"3%"}} severity="error">This email already exists</Alert> :  ""}
            {errorField2 ? <Alert sx={{marginBottom:"3%"}} severity="error">Passwords do not match(Refreshing the page in 3s)</Alert> :  ""}
      {activeStep === steps.length ? (
        ""
      ) : (
        <React.Fragment>
           {activeStep === 0 ?( 
             <>
            <h3>Initial Informations</h3>
        
                        
            <Box>
            <div className="name">
                <TextField 
                type="text" 
                placeholder='First Name'
                label="First Name"
                variant='outlined'
                required
                defaultValue={firstName}
                sx={{marginRight:"2%"}}
                onChange={firstNameHandler} 
                />
                <TextField 
                type="text" 
                placeholder='Last Name' 
                className='lastname'
                label="Last Name"
                defaultValue={lastName}
                variant='outlined'
                required
                onChange={lastNameHandler} 
                />
              </div>
            </Box>
              <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} className="other">
              <TextField type="email" 
              placeholder='Email' 
              label="Email"
              className='email'
              variant='outlined'
              sx={{marginTop:"3%",width:"50%"}}
              required
              defaultValue={email}
              onChange={emailHandler}
              />
              <TextField type="password" 
              placeholder='Password' 
              label="Password"
              className='password'
              variant='outlined'
              required
              defaultValue={password}
              sx={{marginTop:"3%",width:"50%"}}
              onChange={passwordHandler}
              inputProps= { {minLength: 8, maxLength: 16} } 
              />
               <TextField type="password" 
              placeholder='confirm password'
              label = "Confirm Password"
              className='password'
              variant='outlined'
              required
              defaultValue={confirmPassword}
              sx={{marginTop:"3%",width:"50%"}}
              inputProps= { {minLength: 8, maxLength: 16} } 
              onChange={confirmPasswordHandler}
              />
            
              <h4 style={{marginBottom:"0px"}}>Optional</h4>
              
              <TextField
              sx={{scrollMarginBottom:"10px",width:"50%"}}
              defaultValue={phoneNumber}
              placeholder='Phone Number' 
              className='hruser'
              type="number"
              variant='outlined'
              label="Phone Number"
              onChange={phoneNumberHandler}
              /> 
                    
              
              
              <LinkedInIcon sx={{marginLeft:"44%"}}/>
              <TextField
          defaultValue={linkedin}
          id="outlined-required"
          label="Linkedin "
            sx={{marginBottom:"2%",width:"50%"}}
          variant="outlined"
          onChange={linkedinHandler}
        />
        <GitHubIcon sx={{marginLeft:"44%"}}/>
                 <TextField
          
          id="outlined-required"
          defaultValue={github}
          label="Github"
          onChange={githubHandler}
          variant="outlined"
          sx={{marginBottom:"2%",width:"50%"}}
        />
        <Typography>If you have a website you can also write it</Typography>
        <TextField
          
          id="outlined-required"
          sx={{width:"50%"}}
          label="Website"
          defaultValue={website}
          onChange={websiteHandler}
          variant="outlined"
        />
               <InputLabel sx={{marginTop:"10px"}}>Country</InputLabel>
             <div style={{width:"50%"}} className="t">
             <Select  
              sx={{width:"50%"}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="country"
              onChange={changeHandler}
              options={options} >
                 
                </Select>  
              
              <InputLabel sx={{marginTop:"10px"}}>Gender</InputLabel>
              <Select  
               sx={{width:"50%"}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="gender"
              
              onChange={genderHandler} 
              options={options2}>
            
                </Select>     </div>   
       
               <FormControlLabel  control={<Checkbox onChange={isUserHandler} />} label="Register as a Company Representetive" />
             
              </div>
             </>
          ):""}
          {activeStep === 1 ?( 
            <>
          
            <h3 style={{marginTop:"10%"}}>Education</h3>
            <Typography sx={{marginLeft:"5%",border:"1px solid black",width:"25px",borderRadius:"100%"}} > 1</Typography>
            <Box sx={{justifyContent:"space-between",marginBottom:"5%"}}>
              <TextField
          defaultValue={schoolName}
          onChange={schoolNameHandler}
          id="outlined-required"
          label="School Name"
          sx={{marginRight:"2%"}}
          variant="outlined"
        />
                 <TextField
          defaultValue={degree}
          onChange={degreeHandler}
          id="outlined-required"
          label="Degree"
          sx={{marginRight:"2%"}}
          variant="outlined"
        />
        <TextField
          defaultValue={gpa}
          id="outlined-number"
          label="GPA"
          type={'number'}
          onChange={gpaHandler}
          variant="outlined"
        />
      
              </Box>
              <Typography>Graduation Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date"
                         value={educationdate || null}
                        format="DD-MM-YYYY"
                        onChange={(newValue) => {
                           setEducationdate(newValue);
                        
                        }}
                         
                        renderInput={(params) => <TextField {...params} />}
                      />
                  </LocalizationProvider>
                  <br/>
                  <div>
                    {education}
                  </div>
                  {education.length<2?<Button onClick={addeducationlist}>Add Education</Button>:null}

            </>
          ):""}
          {activeStep === 3 ?(
            <>
            
           
          
            </> 
          ):""}
          {activeStep === 2 ?(
            <>
                <h3  style={{marginTop:"10%"}}>Work Experience</h3>
            <Typography sx={{marginLeft:"5%",border:"1px solid black",width:"25px",borderRadius:"100%"}} > 1</Typography>
            <Box sx={{justifyContent:"space-between",marginBottom:"5%"}}>
              <TextField
          defaultValue={companyName}
          id="outlined-required"
          label="Company Name"
          onChange={companyNameHandler}
          sx={{marginRight:"2%"}}
          variant="outlined"
        />
                 <TextField
          defaultValue={jobTitle}
          id="outlined-required"
          label="Job Title"
          onChange={jobTitleHandler}
          sx={{marginRight:"2%"}}
          variant="outlined"
        />
         <TextField
          defaultValue={yearsOfExperience}
          id="outlined-required"
          label="Years of Experience"
          variant="outlined"
          onChange={yearsOfExperienceHandler}
        />
              </Box>
              <TextField
                defaultValue={jobDescription}
                   onChange={jobDescriptionHandler}
              multiline
              rows={5}
              sx={{width:"400px"}}
          
          id="outlined-required"
          label="Work Description"
         
        />
   <br/>
   <div>{jobs} </div>
    {jobs.length<2?<Button onClick={addjoblist}>Add Job</Button>:null}
            
            </>) : ""}
            {activeStep === 3 ?(
              <>
              <Typography variant="h4" style={{marginTop:"2%",marginBottom:"2%",color:"rgb(25, 118, 210)"}}>Overview</Typography>
            {alert1 ? <Alert severity="success">Upload Successfull</Alert> :  ""}
             <div id="pdf">
               <Typography variant="h6" sx={{color:"rgb(25, 118, 210)"}}>Initial Informations</Typography>
             <Typography>
             {firstName.length>0 ?"First Name :"+firstName : ""}
          </Typography>
          <Typography>
             {lastName.length>0 ?"Last Name :"+lastName : ""}
          </Typography>
          <Typography>
             {linkedin.length>0 ?"Linkedin  :"+linkedin : ""}
          </Typography>
          <Typography>
             {github.length>0 ?"Github  :"+github : ""}
          </Typography>
          <Typography>
             {website.length>0 ?"Website  :"+website : ""}
          </Typography>
          <Typography sx={{marginTop:"2%",marginBottom:"1%",color:"rgb(25, 118, 210)"}} variant="h6">Educational Background</Typography>
          <Typography>
             {schoolName.length>0 ?"School Name :"+schoolName : ""}
          </Typography>
          <Typography>
             {degree.length>0 ?"Degree:"+degree : ""}
          </Typography>
          <Typography>
             {gpa.length>0 ?"GPA:"+gpa : ""}
          </Typography>
          <Typography>
             {educationdate ?"Education Date:"+educationdate : ""}
          </Typography>
          <Typography>
             {schoolName2.length>0 ?"School Name :"+schoolName2 : ""}
          </Typography>
          <Typography>
             {degree2.length>0 ?"Degree:"+degree2 : ""}
          </Typography>
          <Typography>
             {gpa2.length>0 ?"GPA:"+gpa2 : ""}
          </Typography>
          <Typography>
             {educationdate2 ?"Education Date:"+educationdate2 : ""}
          </Typography>
          <Typography>
             {schoolName3.length>0 ?"School Name :"+schoolName3 : ""}
          </Typography>
          <Typography>
             {degree3.length>0 ?"Degree:"+degree3 : ""}
          </Typography>
          <Typography>
             {gpa3.length>0 ?"GPA:"+gpa3: ""}
          </Typography>
          <Typography>
             {educationdate3 ?"Education Date:"+educationdate3: ""}
          </Typography>
          <Typography sx={{marginTop:"2%",marginBottom:"1%",color:"rgb(25, 118, 210)"}} variant="h6">Experience</Typography>
          <Typography>
             {companyName.length>0 ?"Company Name:"+companyName : ""}
          </Typography>
          <Typography>
             {jobTitle.length>0 ?"Job Title:"+jobTitle : ""}
          </Typography>
          <Typography>
             {yearsOfExperience.length>0 ?"Years of Experience:"+yearsOfExperience : ""}
          </Typography>
          <Typography sx={{whiteSpace:"pre-wrap"}}>
             {jobDescription.length>0 ?"Job Description:"+jobDescription : ""}
          </Typography>
          <Typography>
             {companyName2.length>0 ?"Company Name:"+companyName2 : ""}
          </Typography>
          <Typography>
             {jobTitle2.length>0 ?"Job Title:"+jobTitle2 : ""}
          </Typography>
          <Typography>
             {yearsOfExperience2.length>0 ?"Years of Experience:"+yearsOfExperience2 : ""}
          </Typography>
          <Typography sx={{whiteSpace:"pre-wrap"}}>
             {jobDescription2.length>0 ?"Job Description:"+jobDescription2 : ""}
          </Typography>
          <Typography>
             {companyName3.length>0 ?"Company Name:"+companyName3 : ""}
          </Typography>
          <Typography>
             {jobTitle3.length>0 ?"Job Title:"+jobTitle3 : ""}
          </Typography>
          <Typography>
             {yearsOfExperience3.length>0 ?"Years of Experience:"+yearsOfExperience3 : ""}
          </Typography>
          <Typography sx={{whiteSpace:"pre-wrap"}}>
             {jobDescription3.length>0 ?"Job Description:"+jobDescription3 : ""}
          </Typography>
          </div>

       
              </>
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
          
            {activeStep===steps.length-1 ? <>
            {count>=1 ? <Button href="/">Finish</Button> :<>
          
            </>
            }
            </>
            :
            <>
            {firstName==="" || lastName ==="" || email ==="" || password==="" || confirmPassword===""  ?<Button onClick={()=>{
              setTimeout(()=>{
                setEmptyAlertError(false)
                
              },2000)
              setEmptyAlertError(true)
            }}>Next</Button>:
            !email.includes("@") && !email.includes(".com") ? <Button onClick={()=>{
              setEmailAlert(true)
            }}>Next</Button>:
             password !== confirmPassword ?<Button  onClick={()=>{
              setPasswordAlert(true)
            }}>Next</Button>  :
              password.length<8 && confirmPassword.length<8 ?<Button  onClick={()=>{
                setPasswordAlert2(true)
              }}>Next</Button>  :
              getalluser.includes(email) ?<Button  onClick={()=>{
                setErrorField(true)
              }}>Next</Button> :
            <Button onClick={handleNext}>Next</Button>
            } 
            
            
            </>}
          
          </Box>
        </React.Fragment>
      )}
      {activeStep === steps.length-1 ?<Button type="submit">Register</Button>:""}
   
      </form>
    </Box>
  );
}

export default Stepperr