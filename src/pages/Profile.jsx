import { Box, Button } from '@mui/material'
import React from 'react'
import Navbar2 from '../components/Navbar2'
import banner from "../pictures/banner.jpg"
import "../styles/Profile.scss"
import Footer from '../components/Footer'
import MUIDataTable from 'mui-datatables'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { Link, useParams } from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub';import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SettingsIcon from '@mui/icons-material/Settings';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { InputLabel } from '@mui/material';
import Select from 'react-select';
import countryList from 'react-select-country-list'
import Stack from '@mui/material/Stack';
import  {  useMemo } from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useLocation } from 'react-router-dom'
import Unauthorized from '../components/Unauthorized'
import NotFound from '../components/NotFound'
import Spinner from '../components/Spinner'
function Profile() {
  
  const [open, setOpen] = useState(false);
  const [openex, setOpenex] = useState(false);
  const [opened, setOpened] = useState(false);
  const [opench, setOpench] = useState(false);
  const [openit, setOpenit] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenex = () => setOpenex(true);
  const handleCloseex = () => setOpenex(false);
  const handleOpened = () => setOpened(true);
  const handleCloseed = () => setOpened(false);
  const handleOpench = () => setOpench(true);
  const handleClosech = () => setOpench(false);
  const handleOpenit = () => setOpenit(true);
  const handleCloseit = () => setOpenit(false);
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
  const stylediv={
    display: "inline-block",
                          background:" linear-gradient(top, #f9f9f9, #e3e3e3)",
                          border: "1px solid #999",
                          borderRadius: "3px",
                          padding:" 5px 8px",
                          outline: "none",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                          textShadow: "1px 1px #fff",
                          fontWeight: "700",
                          fontSize: "10pt",
                          marginBottom:"3%"
  }
  const {id} = useParams();
  const[job,setJob]=React.useState([]);
  const[profile,setProfile]=React.useState("");
  const[user,setUser]=React.useState([]);
  if(JSON.parse(localStorage.getItem("User")) !== null){
    var token=localStorage.getItem("User");
    var decoded = jwt_decode(token);
   }
   const [authprofile,setAuthprofile]=React.useState("");

   const getallprofiles=async()=>{
     setIsLoading(true);
    const res= await axios.get("https://localhost:44361/api/Home/Profile")
      for(var i=0;i<res.data.length;i++){
        if(res.data[i].Id==id){
          setAuthprofile(res.data[i].Id)
        }

      }
      setIsLoading(false);
     
   }

  React.useEffect(()=>{
    getallprofiles();
    
},[]);
  
const getallInfo = async () => {
  setIsLoading(true);
  await axios.get(`https://localhost:44361/api/Home/Profile/${id}`,{
  }).then((res)=>{
      setProfile(res.data);
     content(res.data);
   
  })
  setIsLoading(false);
}
const location = useLocation();
const content = (a)=>{
 if(a.education){
  setSchoolName(a.education.split(",")[0]);
  setSchoolName2(a.education.split(",")[1]);
  setSchoolName3(a.education.split(",")[2]);
  setDegree(a.education.split(",")[3]);
  setDegree2(a.education.split(",")[4]);
  setDegree3(a.education.split(",")[5]);
  setGpa(a.education.split(",")[6]);
  setGpa2(a.education.split(",")[7]);
  setGpa3(a.education.split(",")[8]);
  setEducationdate(a.education.split(",")[9]);
  setEducationdate2(a.education.split(",")[10]);
  setEducationdate3(a.education.split(",")[11]);
  setCompanyName(a.experience.split(",")[0]);
  setCompanyName2(a.experience.split(",")[1]);
  setCompanyName3(a.experience.split(",")[2]);
  setJobTitle(a.experience.split(",")[3]);
  setJobTitle2(a.experience.split(",")[4]);
  setJobTitle3(a.experience.split(",")[5]);
  setJobDescription(a.experience.split(",")[6]);
  setJobDescription2(a.experience.split(",")[7]);
  setJobDescription3(a.experience.split(",")[8]);
  setYearsOfExperience(a.experience.split(",")[9]);
  setYearsOfExperience2(a.experience.split(",")[10]);
  setYearsOfExperience3(a.experience.split(",")[11]);
 }
}
let a=""
console.log()
React.useEffect(()=>{
  setIsLoading(true);
  axios.get("https://localhost:44361/api/Home/JobsApplicantJoin",{
    }).then((res)=>{
      let a=[]
      for(let i=0;i<res.data.length;i++){
        if(res.data[i].UserId==decoded.id){
          a.push(res.data[i])
        }
      }
        setJob(a);
    })
   
 getallInfo();
    
 
setIsLoading(false);
},[])

React.useEffect(()=>{
  axios.get(`https://localhost:44361/api/Home/ProfileUserJoin`,{
}).then((res)=>{
   
   for(var i=0;i<res.data.length;i++){
     if(res.data[i].Id==id){
       a=(res.data[i])
     }
   }
   setUser(a);

})
},[])
React.useEffect(()=>{
  getallInfo();
},[])



const [isHide, setIsHide] = React.useState(true);
  const [facebook, setFacebook] = React.useState('');
  const [twitter, setTwitter] = React.useState('');
  const [linkedin, setLinkedin] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [aboutsection, setAboutsection] = React.useState('');
  const [education, setEducation] = React.useState('');
  const [experience, setExperience] = React.useState('');

  const [title, setTitle] = React.useState('');
  const [emptyField3,setEmptyField3] = React.useState(false);
  const [country, setCountry] = React.useState('');
  const [gender,setGender] =React.useState('');
  const [phonenumber,setPhonenumber]=React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
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
  setTimeout(()=>setIsHide(false),500)
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
  const changeHandler = value => {
    setValue(value)
  }
  const [file,setFile]=React.useState();
  const [fileName,setFileName]=React.useState();
  const saveFile=(event)=>{
    setFile(event.target.files[0])
    setFileName(event.target.files[0].name)
  }
  const [file2,setFile2]=React.useState();
  const [fileName2,setFileName2]=React.useState();
  const saveFile2=(event)=>{
    setFile2(event.target.files[0])
    setFileName2(event.target.files[0].name)
  }
  const [file3,setFile3]=React.useState();
  const [fileName3,setFileName3]=React.useState();
  const saveFile3=(event)=>{
    setFile3(event.target.files[0])
    setFileName3(event.target.files[0].name)
  }
  const [file4,setFile4]=React.useState();
  const [fileName4,setFileName4]=React.useState();
  const saveFile4=(event)=>{
    setFile4(event.target.files[0])
    setFileName4(event.target.files[0].name)
  }
  const [uploadfilealert,setUploadfilealert] = React.useState(false);
  const [alert1,setAlert1]=React.useState(false);
  
  const uploadFile =async (Id)=>{
    setUploadfilealert(true);
    const nameoffile=decoded.id+"_"+Id+"_"+fileName
    const formData=new FormData();
    if(file !== undefined){

      formData.append("formFile",file,nameoffile)
      try {
        const res=await axios.post("https://localhost:44361/api/Home/UploadFile",formData)
        console.log(res);
        setAlert1(true)
        setTimeout(() => {
          setAlert1(false);
        }, 4000); 
        
      } catch (error) {
        setAlert1(false);
        console.log(error)
      }
    }
try {
  const res=await axios.post("https://localhost:44361/api/Home/CreateFile",{
    Userid:decoded.id,
    Name:fileName,
    Jobid:id,
  })
  console.log(res);
} catch (error) {
  
  console.log(error)
}
  const nameoffile2=decoded.id+"_"+Id+"_"+fileName2
  const formData2=new FormData();
  if(file2!==undefined){
    formData2.append("formFile",file2,nameoffile2)
 
  
  try {
  const res=await axios.post("https://localhost:44361/api/Home/UploadFile",formData2)
  console.log(res);
  setAlert1(true)
  setTimeout(() => {
  setAlert1(false);
  }, 4000); 

  } catch (error) {
  setAlert1(false);
  console.log(error)
  }
  try {
    const res=await axios.post("https://localhost:44361/api/Home/CreateFile",{
      Userid:decoded.id,
      Name:fileName2,
      Jobid:id,
    })
    console.log(res);
  } catch (error) {
    
    console.log(error)
}
}
    const nameoffile3=decoded.id+"_"+Id+"_"+fileName3
    const formData3=new FormData();
    if(file3!==undefined){
      formData3.append("formFile",file3,nameoffile3)


    try {
    const res=await axios.post("https://localhost:44361/api/Home/UploadFile",formData3)
    console.log(res);
    setAlert1(true)
    setTimeout(() => {
    setAlert1(false);
    }, 4000); 

    } catch (error) {
    setAlert1(false);
    console.log(error)
    }
    try {
      const res=await axios.post("https://localhost:44361/api/Home/CreateFile",{
        Userid:decoded.id,
        Name:fileName3,
        Jobid:id,
      })
      console.log(res);
    } catch (error) {
      
      console.log(error)
  }
    }
      
 
  
    const nameoffile4=decoded.id+"_"+Id+"_"+fileName4
    const formData4=new FormData();
    if(file4!==undefined){
      formData4.append("formFile",file4,nameoffile4)


    try {
    const res=await axios.post("https://localhost:44361/api/Home/UploadFile",formData4)
    console.log(res);
    setAlert1(true)
    setTimeout(() => {
    setAlert1(false);
    }, 4000); 

    } catch (error) {
    setAlert1(false);
    console.log(error)
    }
    try {
      const res=await axios.post("https://localhost:44361/api/Home/CreateFile",{
        Userid:decoded.id,
        Name:fileName4,
        Jobid:id,
      })
      console.log(res);
    } catch (error) {
      
      console.log(error)
  }
    }
    window.location.reload(true)
  }
  const editgender =async()=>{
    try {
      const res =await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfileGender`,	
        {
           Id:decoded.id,
           firstName:"abc",
            lastName:"abc",
            email:"abc",
            Passwords:"abc",
            userRole:"abc",
           gender:gender.value,
        }
      )
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  const editcountry =async()=>{
    try {
      const res =await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfileCountry`,	
        {
            Id:decoded.id,
            firstName:"abc",
            lastName:"abc",
            email:"abc",
            Passwords:"abc",
            userRole:"abc",
           country:value.label,
        }
      )
      window.location.reload();
    } catch (error) {
      console.log(error)
    }

      }
      const editPhonenumber =async()=>{
        try {
          const res =await axios.post(
            `https://localhost:44361/api/Home/Profile/EditUserPhone`,	
            {
                Id:decoded.id,
                firstName:"abc",
                lastName:"abc",
                email:"abc",
                Passwords:"abc",
                userRole:"abc",
               phoneNumber:phonenumber,
            }
          )
          window.location.reload();
        } catch (error) {
          console.log(error)
        }
    
          }

  const editprofile=async()=>{
    try {
      const res = await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfileAbout`,	
        {
            Id:id,
            UserId:decoded.id,
            about:aboutsection,
        }
      )
      window.location.reload();
      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }
  
  const editprofileex=async()=>{
    try {
      const res = await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfileexperience`,	
        {
            Id:id,
            UserId:decoded.id,
            experience:`${companyName},${companyName2},${companyName3},${jobTitle},${jobTitle2},${jobTitle3},${jobDescription},${jobDescription2},${jobDescription3},${yearsOfExperience},${yearsOfExperience2},${yearsOfExperience3},`,
        }
      )
      window.location.reload();
      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }
  const editprofiletitle=async()=>{
    try {
      const res = await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfileTitle`,	
        {
            Id:id,
            UserId:decoded.id,
            currentTitle:title,
        }
      )
      window.location.reload();
      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }
  const addtwitter=async()=>{
    try {
      const res = await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfileTwitter`,	
        {
            Id:id,
            UserId:decoded.id,
            twitter:twitter,
        }
      )
      console.log(res)
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  const addgithub=async()=>{
    try {
      const res = await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfilegithub`,	
        {
            Id:id,
            UserId:decoded.id,
            facebook:facebook,
        }
      )
      console.log(res)
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  const addlinkedin=async()=>{
    try {
      const res = await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfileLinkedin`,	
        {
            Id:id,
            UserId:decoded.id,
            linkedin:linkedin,
        }
      )
      console.log(res)
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  const editeducation=async()=>{
    try {
      const res = await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfileeducation`,	
        {
            Id:id,
            UserId:decoded.id,
            education:`${schoolName},${schoolName2},${schoolName3},${degree},${degree2},${degree3},${gpa},${gpa2},${gpa3},${educationdate},${educationdate2},${educationdate3}`,
        }
      )
      window.location.reload(true);
      console.log(res.data)

    } catch (error) {
      console.log(error)
    }
  }
  const editprofilephoto =async()=>{
    try {
      const res =await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfilePhoto`,
        {
            Id:id,
            UserId:decoded.id,
            photo:photo,
        }
      )
      window.location.reload(true);
    } catch (error) {
      console.log(error)
    }
  }
  function titleHandler(e){
    setTitle(e.target.value);
  }
  
  function facebookHandler(e){
    setFacebook(e.target.value);
  }
  function twitterHandler(e){
    setTwitter(e.target.value);
  }
  function linkedinHandler(e){
    setLinkedin(e.target.value);
  }
  function photoHandler(e){
    setPhoto(e.target.value);
  }
  function aboutsectionHandler(e){
    setAboutsection(e.target.value);
  }
  function educationHandler(e){
    setEducation(e.target.value);
  }
  function experienceHandler(e){
    setExperience(e.target.value);
  }

  function countryHandler(e){
    setValue(e);
  }
  function genderHandler(e){
    setGender(e);
  }
  function phonenumberHandler(e){
    setPhonenumber(e.target.value);
  }

  const [open3, setOpen3] = React.useState(false);

  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const options2=[
    { value: "Female",label:"Female"},
    {value :"Male",label:"Male"},
    {value:"No Answer",label:"No Answer"}
   ]
  const steps = ['Enter Email', 'Confirmation', 'New Password'];

  let randomnum="0";

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [email, setEmail] = useState("");
    const [controlNum, setControlNum] = useState("");
    const [password, setPassword] = useState("");
    const [num,setNum] = useState("");
    async function changePass() {
      try {
        const response2 = await axios.post(
          `https://localhost:44361/api/Home/changePassword`,
          {
              id: decoded.id,
              email:user.email,
              Passwords: password,
              firstName:user.firstName,
              lastName:user.lastName,
              userRole:decoded.userRole,
          }
        );
         window.location.reload();
       
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
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
 
    const handleNext = () => {
      if (activeStep===0) {
          controlemail();
        if(email==user.email){
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
     
    const [emptyField2,setEmptyField2] = React.useState(false);
    const [wrongEmail,setWrongEmail] = React.useState(false);
 
  const columns = [
    {
      name:"isExtraDocumentRequested",
      label:"Extra Document Requested",
      options: {
        display: false,
      }
    },
    {
      name:"Jobsid",
      label:"Job Id",
      options: {
        display: false,
      }
    },
    {
      name:"Name",
      label:"Job Name",
    },
    {
      name:"category",
      label:"Job Category",
    },
   
    {
      name:"isAccepted",
      label:"Accepted/Rejected",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
            {value==0 ? <Typography sx={{color:"blue"}}>Waiting</Typography>:value ==1 ? <Typography sx={{color:"green"}}>Accepted</Typography>:<Typography sx={{color:"red"}}>Rejected</Typography>}
            </>
          );
        }
      }
    },
    {
      name:"Jobsid",
      label:"Extra Document Upload",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
        
          return (
            <>
         
           {tableMeta.rowData[0]==0 ? <Button variant="contained" disabled>Upload Documents(Closed)</Button>: <>
           <Button onClick={handleOpen3} variant="contained">Upload Documents</Button> {fileName ==undefined ?  <Button disabled sx={{marginLeft:"2%"}} variant='contained'>Finish Upload</Button>
           : <Button sx={{marginLeft:"2%"}} onClick={()=>{uploadFile(value)}} variant='contained'>Finish Upload</Button>}
          
           </>}
            </>
          );
        }
      }
    },
    
  ]
  var formData =new FormData();

  const onfileChange =(e)=>{
  
    if(e.target.files[0]){
      formData.append("file",e.target.files[0])
    }
   
  }

  async function submitFileData(){
   await axios.post("https://localhost:44361/api/Home/UploadFile", formData)
    .then(res=>{
      console.log(res)
      setPhoto(res.data.split("uploadfile/")[1])
      
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const options = {
    filterType: 'checkbox',
    selectableRows: "none",
    print:false,
    viewColumns:false,
    download	:false,
    filter :false,
  };
  const [value, setValue] = useState('')
  const options3 = useMemo(() => countryList().getData(), [])


  return (
    <div style={{backgroundColor:"rgb(248, 248, 248) !important",minHeight:"100vh " }}>
   
    {JSON.parse(localStorage.getItem("User")) && authprofile!="" ? <>
    <Navbar2/>
    {isLoading ? <Spinner/> :<>
    
  
    <br/>
    <div className="page">
        <div className="topside">
        <img src={banner} alt="banner" />
        <div className="info">
        <h1>{user.firstName} {user.lastName}</h1>
       
        <h2>{profile.currentTitle}</h2>
        

      <div
      style={{    position: "relative",
        right: "4rem"}}
      className="set">
        {JSON.parse(localStorage.getItem("User")) ? profile.Userid == decoded.id ? <Button 
        onClick={handleOpenit}
        sx={{    
          top: "-50px",
          position: "relative"}}>
        <SettingsIcon />
        
       </Button> : "" :<Unauthorized/>}
       <Modal
            open={openit}
            onClose={handleCloseit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
           <Box sx={{ ...style, width: 800, background:"" }}>
             <form onSubmit={(e)=>{
               editprofiletitle();
                    e.preventDefault();}}
                    >

           <Box sx={{display:"flex",flexDirection:"column",width:"50%",margin:"auto"}}>                            
                        <Typography>Job Title</Typography>
                             <TextField 
                            label="Title"  
                            sx={{marginBottom:"5%"}}    
                            onChange={titleHandler}     
                            />

                            </Box>
                            <Button type="submit" >Save</Button>
                            </form>
           </Box>
            </Modal> 
      </div>
        </div>

              
        <div className="pp">
          {profile.photo ?
          profile.photo =="banner.jpg" ?  <img src={banner} alt="banner"></img>: 
           <img src={"https://hrportal.blob.core.windows.net/uploadfile/"+profile.photo} alt="banner"></img>: <img src={banner} alt="banner"></img>}
        {JSON.parse(localStorage.getItem("User"))? profile.Userid == decoded.id ?
        <Button 
        onClick={handleOpen}
        sx={{    
          top: "-50px",
          position: "relative"}}>
        <SettingsIcon />
        
       </Button> : "":<Unauthorized/> }
       <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
           <Box sx={{ ...style, width: 800, background:"" }}>
               <form onSubmit={(e)=>{
                    e.preventDefault();
                    if(aboutsection !== ""){
                    editprofile();
                  }
                    if(twitter !== ""){
                    addtwitter();
                    }
                    if(facebook !== ""){
                    addgithub();
                    }
                    if(linkedin !== ""){
                    addlinkedin();
                    }
                    if(value !== ""){
                    editcountry();
                    }                    
                    if(photo !== ""){
                      editprofilephoto();
                    }
                    if(gender !== "" ){
                      editgender();
                    }
                    if(phonenumber !=="" ){
                      editPhonenumber();
                    }
                    }
                    }>
               <Box sx={{justifyContent:'center',
                display:'flex',
                flexDirection:"column",
                alignItems:"center",
                textAlign:"center"}} >
                        <Box sx={{width:"100%"}}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                 
                    <input style={{  display: "inline-block",
                          background:" linear-gradient(top, #f9f9f9, #e3e3e3)",
                          border: "1px solid #999",
                          borderRadius: "3px",
                          padding:" 5px 8px",
                          outline: "none",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                          textShadow: "1px 1px #fff",
                          fontWeight: "700",
                          fontSize: "10pt",
                          marginBottom:"3%"}} name="file" onChange={onfileChange}  accept="file/*" id="contained-button-file" multiple type="file" />
                    <button style={{  display: "inline-block",
                          background:" linear-gradient(top, #f9f9f9, #e3e3e3)",
                          border: "1px solid #999",
                          borderRadius: "3px",
                          padding:" 5px 8px",
                          outline: "none",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                          textShadow: "1px 1px #fff",
                          fontWeight: "700",
                          fontSize: "10pt",
                          marginBottom:"3%"}} onClick={submitFileData}  variant="contained" component="span">
                      Upload
                    </button>
                  
                </Stack>                 
                        </Box>
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                        <TextField 
                            label="About"
                            multiline
                            rows={5}                
                            onChange={aboutsectionHandler} 
                            inputProps={{maxLength:100}}      
                            defaultValue={profile.about}
                            />
                            <Box>                            
                            <TextField 
                            label="Github"
                            sx={{marginRight:"3%"}}
                            onChange={facebookHandler}
                            defaultValue={profile.Facebook}
                            />
                             <TextField 
                            label="Website"
                            sx={{marginRight:"3%"}}
                            onChange={twitterHandler}
                            defaultValue={profile.website}
                            />
                             <TextField 
                            label="Linkedin"      
                            onChange={linkedinHandler}    
                            defaultValue={profile.Linkedin}     
                            />
                            </Box>
                            <Box sx={{display:"flex",flexDirection:"row"}}>                            
                            <div style={{display:"flex",flexDirection:"column",width:"33%",marginRight:"2%"}} className="adjust">
                            <InputLabel sx={{marginTop:"10px"}}>Country</InputLabel>
            
                          <Select  
                            
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label="country"
                            onChange={changeHandler}
                            options={options3} >
                              
                              </Select>  
                            </div>
                           
                            <div style={{display:"flex",flexDirection:"column",width:"33%",marginRight:"2%"}} className="adjust">
                            <Box>
                            
                            <InputLabel >Gender</InputLabel>
                          <Select  
                          sx={{width:"50%"}}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gender}
                          label="gender"
                          onChange={genderHandler} 
                          options={options2}>
                        
                            </Select>  
                          
                            </Box>
                </div>
            
                             <TextField 
                            label="Phone"
                            sx={{marginTop:"2%"}}
                            onChange={phonenumberHandler}
                            defaultValue={user.phoneNumber}
                            />
                            </Box>
                        </Box>
                <Button  type="submit">Save</Button>
                </Box>
               </form>
           </Box>
            </Modal> 
    
        <div className="about">
            <h3 >About</h3>
            <h4>{profile.about}</h4>
                <hr />
                <div className="follow">
                    <div className="followers">
                    <h4>Country</h4>
                    <h4>{user.country=="undefined" ? "" : user.country}</h4>
                    </div>
            <div className="following">
            <h4>Gender</h4>  
            <h4>{user.gender =="undefined" ? "":user.gender}</h4>
            </div>
            <Box sx={{justifyContent:"space-around",alignItems:"center",textAlign:"center"}}>
              <Button target="_blank" href={profile.Facebook}>

           <GitHubIcon sx={{marginRight:"5%"}}/>
              </Button>
              <Button target="_blank" href={profile.Twitter}> 
              <LanguageIcon sx={{marginRight:"5%"}}/>
              </Button>    
              <Button target="_blank" href={profile.Linkedin}>
            <LinkedInIcon/>
              </Button>
            </Box>
                </div>
            
        </div>
          <div style={{justifyContent:"center",alignItems:"center",textAlign:"center",marginBottom:""}} className="changepassword">
          {JSON.parse(localStorage.getItem("User")) ?profile.Userid == decoded.id ?
            <Button onClick={handleOpench} variant="contained">Change Password</Button> : "" : <Unauthorized/> }
            <Modal
            open={opench}
            onClose={handleClosech}
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
        
        {wrongEmail ? <Alert sx={{marginTop:"3%"}} severity="error">Email is not correct</Alert> :  ""}
          {activeStep === 0 ?( 
          <TextField style={{marginTop:"20px",marginLeft:"20px"}} onChange={emailInput} id="outlined-basic" label="Email" variant="outlined" />
          ):""}
         {emptyField2 ? <Alert severity="error">verification number is incorrect</Alert> :  "" }
          {activeStep === 1 ?( 
            <React.Fragment>
              {/* <Typography style={{marginTop:"20px",marginLeft:"20px",backgroundColor:"white",width:"200px",height:"50px",textAlign:"center"}} sx={{ mt: 2, mb: 1 }}>{randomnum}</Typography> */}
              <TextField style={{marginTop:"20px",marginLeft:"20px"}} onChange={controlInput}  id="outlined-basic" label="upper number" variant="outlined" />
            </React.Fragment>
          ):""}
           {emptyField3 ? <Alert severity="error">Password cannot be shorter than 8 digit</Alert> :  "" }
          {activeStep === 2 ?( 
          <TextField type= {"password"} style={{marginTop:"20px",marginLeft:"20px"}} inputProps= { {minLength: 8, maxLength: 16} }  onChange={passwordInput} id="outlined-basic" label="new password" variant="outlined" />
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
     

        <div className="container">
        <div className="experience" >
        <h3 style={{margin:"10px"}}>Education</h3>
        <hr/>
        {JSON.parse(localStorage.getItem("User")) ?profile.Userid == decoded.id ?
        <Button   
        onClick={handleOpenex}
        sx={{    
          top: "-50px",
          left: "-37rem",
          position: "relative"}}>
        <SettingsIcon />
        
       </Button> : "" :<Unauthorized/>}
          <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-around",marginTop:"0px"}}>
          <div  style={{display:"flex",flexDirection:"column"}}>
             <h4 style={{marginTop:"0px"}}>First Education</h4>
           <Typography><b>School Name:</b>  {profile.education ? schoolName=="undefined" ? schoolName=="": schoolName : ""}</Typography>
           <Typography><b>Degree:</b>  {profile.education ? degree=="undefined" ? degree=="": degree  : ""}</Typography>
           <Typography><b>GPA: </b> {profile.education ? gpa=="undefined" ? gpa=="": gpa  : ""}</Typography>
          <Typography><b>Graduation Date: </b>  {profile.education ? educationdate.toString()=="undefined" ? educationdate.toString()=="":educationdate.toString().slice(3,15): ""}</Typography> 

            </div>
            <div  style={{display:"flex",flexDirection:"column"}}>
             <h4 style={{marginTop:"0px"}}>Second Education</h4>
           <Typography><b>School Name:</b>  {profile.education ? schoolName2=="undefined" ? schoolName2=="": schoolName2  : ""}</Typography>
           <Typography><b>Degree:</b>  {profile.education ? degree2=="undefined" ? degree2=="": degree2  : ""}</Typography>
           <Typography><b>GPA: </b> {profile.education ? gpa2=="undefined" ? gpa2=="": gpa2  : ""}</Typography>
           <Typography><b>Graduation Date: </b>  {profile.education ? educationdate2.toString()=="undefined" ? educationdate2.toString()=="":educationdate2.toString().slice(3,15): ""}</Typography> 

            </div>
            <div  style={{display:"flex",flexDirection:"column"}}>
             <h4 style={{marginTop:"0px"}}>Third Education</h4> 
             {console.log(profile.education,"")}
           <Typography><b>School Name:</b>  {profile.education ? schoolName3=="undefined" ? schoolName3=="": schoolName3  : ""}</Typography>
           <Typography><b>Degree:</b>  {profile.education ? degree3=="undefined" ? degree3=="": degree3  : ""}</Typography>
           <Typography><b>GPA: </b> {profile.education ? gpa3=="undefined" ? gpa3=="": gpa3  : ""}</Typography>
           <Typography><b>Graduation Date: </b>  {profile.education ? educationdate3.toString()=="undefined" ? educationdate3.toString()=="":educationdate3.toString().slice(3,15): ""}</Typography> 

            </div>
          </Box>
          
       <Modal
            open={openex}
            onClose={handleCloseex}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
           <Box sx={{ ...style, width: 800, background:"" }}>
               <form onSubmit={(e)=>{
                    e.preventDefault();
                    editeducation();
                    }
                    }>
               <Box sx={{justifyContent:'center',
                display:'flex',
                flexDirection:"column",
                alignItems:"center",
                textAlign:"center"}} >
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                        <label>1</label>
                             <Box>
                             <TextField 
                            label="School Name"           
                            onChange={schoolNameHandler}       
                            sx={{marginRight:"10px"}}
                            defaultValue={profile.education ? profile.education.split(",")[0] :null}
                           
                            />
                          
                             <TextField 
                            label="Degree"      
                            defaultValue={profile.education ? profile.education.split(",")[3] :null}   
                            sx={{marginRight:"10px"}}   
                            onChange={degreeHandler}    
                      
                            />
                             <TextField 
                            label="Gpa"
                            defaultValue={profile.education ? profile.education.split(",")[6] :null}   
                            sx={{marginRight:"10px"}}
                            onChange={gpaHandler}       
                            type="number"
                            />
                             </Box>
              <Box> <Typography>Graduation Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                          label="Date"
                          defaultValue={profile.education ? profile.education.split(",")[9] :null}   
                          value={educationdate ||null}
                        format="DD-MM-YYYY"
                        onChange={(newValue) => {
                            setEducationdate(newValue);
                        
                        }}
                        
                        renderInput={(params) => <TextField {...params} />}
                          />
                      </LocalizationProvider></Box>
                        </Box>
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                          <label >2</label>
                            <Box>
                            <TextField 
                            label="School Name"           
                            onChange={schoolNameHandler2}      
                            defaultValue={profile.education ? profile.education.split(",")[1] :null}   
                            sx={{marginRight:"10px"}} 
                             
                            />
                             <TextField 
                            label="Degree"         
                            onChange={degreeHandler2}       
                            defaultValue={profile.education ? profile.education.split(",")[4] :null}   
                             
                            sx={{marginRight:"10px"}}
                            />
                             <TextField 
                            label="Gpa"
                            sx={{marginRight:"10px"}}
                            onChange={gpaHandler2}       
                            defaultValue={profile.education ? profile.education.split(",")[7] :null} 
                            type="number"
                            />
                            </Box>
         <Box>
         <Typography>Graduation Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                          label="Date"
                          value={educationdate2 ||null}
                        format="DD-MM-YYYY"
                        defaultValue={profile.education ? profile.education.split(",")[10] :null}   
                        onChange={(newValue2) => {
                            setEducationdate2(newValue2);
                        
                        }}
                        
                        renderInput={(params) => <TextField {...params} />}
                          />
                      </LocalizationProvider>
         </Box>
                        </Box>
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                          <label >3</label>
                        <Box>
                        <TextField 
                            label="School Name"           
                            sx={{marginRight:"10px"}}
                            defaultValue={profile.education ? profile.education.split(",")[2] :null}   
                            onChange={schoolNameHandler3}       
                            />
                             <TextField 
                            label="Degree"         
                            sx={{marginRight:"10px"}}
                            defaultValue={profile.education ? profile.education.split(",")[5] :null}   
                            onChange={degreeHandler3}       
                            />
                             <TextField 
                            label="Gpa"
                            sx={{marginRight:"10px"}}
                            defaultValue={profile.education ? profile.education.split(",")[8] :null}   
                            onChange={gpaHandler3}       
                            type="number"
                            />
                        </Box>
         <Box>
         <Typography>Graduation Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                          label="Date"
                          value={educationdate3 ||null}
                        format="DD-MM-YYYY"
                        defaultValue={profile.education ? profile.education.split(",")[11] :null}   
                        onChange={(newValue3) => {
                            setEducationdate3(newValue3);
                        
                        }}
                        
                        renderInput={(params) => <TextField {...params} />}
                          />
                      </LocalizationProvider>
         </Box>
                        </Box>
                       
                       
                <Button type="submit">Save</Button>
                </Box>
               </form>
           </Box>
            </Modal> 
          </div>
          <div className="experience" >
        <h3 style={{margin:"10px"}}>Experience</h3>
        <hr/>
        {JSON.parse(localStorage.getItem("User")) ?profile.Userid == decoded.id ?
        <Button 
        onClick={handleOpened}
        sx={{    
          top: "-50px",
          left: "-37rem",
          position: "relative"}}>
        <SettingsIcon />
        
       </Button> : "" :<Unauthorized/> }
       <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-around",marginTop:"0px"}}>
          <div  style={{display:"flex",flexDirection:"column"}}>
             <h4 style={{marginTop:"0px"}}>First Job</h4>
           <Typography><b>Company Name:</b>  {profile.experience ? companyName=="undefined" ? companyName=="": companyName : ""}</Typography>
           <Typography><b>Job Title:</b>  {profile.experience ? jobTitle=="undefined" ? jobTitle=="": jobTitle  : ""}</Typography>
           <Typography><b>Years of Experience: </b> {profile.experience ? yearsOfExperience=="undefined" ? yearsOfExperience=="": yearsOfExperience  : ""}</Typography>
          <Typography sx={{display:"flex",flexDirection:"column"}}><b>Job Description </b>  {profile.experience ? jobDescription=="undefined" ? jobDescription=="":jobDescription: ""}</Typography> 

            </div>
            <div  style={{display:"flex",flexDirection:"column"}}>
             <h4 style={{marginTop:"0px"}}>Second Job</h4>
           <Typography><b>Company Name:</b>  {profile.experience ? companyName2=="undefined" ? companyName2=="": companyName2 : ""}</Typography>
           <Typography><b>Job Title:</b>  {profile.experience ? jobTitle2=="undefined" ? jobTitle2=="": jobTitle2  : ""}</Typography>
           <Typography><b>Years of Experience: </b> {profile.experience ? yearsOfExperience2=="undefined" ? yearsOfExperience2=="": yearsOfExperience2  : ""}</Typography>
          <Typography sx={{display:"flex",flexDirection:"column"}}><b>Job Description </b>  {profile.experience ? jobDescription2=="undefined" ? jobDescription2=="":jobDescription2: ""}</Typography> 

            </div>
            <div  style={{display:"flex",flexDirection:"column"}}>
             <h4 style={{marginTop:"0px"}}>Third Job</h4>
           <Typography><b>Company Name:</b>  {profile.experience ? companyName3=="undefined" ? companyName3=="": companyName3 : ""}</Typography>
           <Typography><b>Job Title:</b>  {profile.experience ? jobTitle3=="undefined" ? jobTitle3=="": jobTitle3  : ""}</Typography>
           <Typography><b>Years of Experience: </b> {profile.experience ? yearsOfExperience3=="undefined" ? yearsOfExperience3=="": yearsOfExperience3  : ""}</Typography>
          <Typography sx={{display:"flex",flexDirection:"column"}}><b>Job Description </b>  {profile.experience ? jobDescription3=="undefined" ? jobDescription3=="":jobDescription3: ""}</Typography> 

            </div>
          </Box>
          
       <Modal
            open={opened}
            onClose={handleCloseed}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflow:'scroll',}}
            >
           <Box sx={{ ...style, width: 800, background:"" }}>
               <form onSubmit={(e)=>{
                    e.preventDefault();
                    editprofileex();
                    }
                    }>
                <Box sx={{justifyContent:'center',
                display:'flex',
                flexDirection:"column",
                alignItems:"center",
                textAlign:"center"}} >
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                        <label>1</label>
                             <Box>
                             <TextField 
                            label="Company Name"           
                            onChange={companyNameHandler}       
                            sx={{marginRight:"10px"}}
                            defaultValue={profile.experience ? profile.experience.split(",")[0] :null}
                           
                            />
                          
                             <TextField 
                            label="Title"      
                            defaultValue={profile.experience ? profile.experience.split(",")[3] :null}   
                            sx={{marginRight:"10px"}}   
                            onChange={jobTitleHandler}    
                      
                            />
                           <TextField 
                            label="Years of Experience"      
                            defaultValue={profile.experience ? profile.experience.split(",")[9] :null}   
                            sx={{marginRight:"10px"}}   
                            onChange={yearsOfExperienceHandler}    
                      
                            />
                             </Box>
              <Box> <TextField 
                            label="Job Description"
                            defaultValue={profile.experience ? profile.experience.split(",")[6] :null}   
                            sx={{marginRight:"10px",width:"500px"}}
                            onChange={jobDescriptionHandler}       
                            multiline
                            rows={6}       
                           
                            /> </Box>
                     
                        </Box>
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                        <label>2</label>
                             <Box>
                             <TextField 
                            label="Company Name"           
                            onChange={companyNameHandler2}       
                            sx={{marginRight:"10px"}}
                            defaultValue={profile.experience ? profile.experience.split(",")[1] :null}
                           
                            />
                          
                             <TextField 
                            label="Title"      
                            defaultValue={profile.experience ? profile.experience.split(",")[4] :null}   
                            sx={{marginRight:"10px"}}   
                            onChange={jobTitleHandler2}    
                      
                            />
                           <TextField 
                            label="Years of Experience"      
                            defaultValue={profile.experience ? profile.experience.split(",")[10] :null}   
                            sx={{marginRight:"10px"}}   
                            onChange={yearsOfExperienceHandler2}    
                      
                            />
                             </Box>
              <Box> <TextField 
                            label="Job Description"
                            defaultValue={profile.experience ? profile.experience.split(",")[7] :null}   
                            sx={{marginRight:"10px",width:"500px"}}
                            onChange={jobDescriptionHandler2}       
                            multiline
                            rows={6}
                            /> </Box>
                     
                        </Box>
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                        <label>3</label>
                             <Box>
                             <TextField 
                            label="Company Name"           
                            onChange={companyNameHandler3}       
                            sx={{marginRight:"10px"}}
                            defaultValue={profile.experience ? profile.experience.split(",")[2] :null}
                           
                            />
                          
                             <TextField 
                            label="Title"      
                            defaultValue={profile.experience ? profile.experience.split(",")[5] :null}   
                            sx={{marginRight:"10px"}}   
                            onChange={jobTitleHandler3}    
                      
                            />
                           <TextField 
                            label="Years of Experience"      
                            defaultValue={profile.experience ? profile.experience.split(",")[11] :null}   
                            sx={{marginRight:"10px"}}   
                            onChange={yearsOfExperienceHandler3}    
                      
                            />
                             </Box>
              <Box> <TextField 
                            label="Job Description"
                            defaultValue={profile.experience ? profile.experience.split(",")[8] :null}   
                            sx={{marginRight:"10px",width:"500px"}}
                            onChange={jobDescriptionHandler3}       
                            multiline
                            rows={6}   
                           
                            /> </Box>
                     
                        </Box>
                <Button type="submit">Save</Button>
                </Box>
               </form>
           </Box>
            </Modal> 
          </div>
            <div className="activeapplications">           
            {uploadfilealert ? <Alert severity="success" >Your files are being uploaded page will reload automatically when finished</Alert>:""}
             <MUIDataTable
                className="table"
               title={<><Box>
               <h3>Applications</h3>
               </Box>
               </>}
               data={job}
               columns={columns}
               options={options}
               />
               </div>
        </div>
      
        </div>
        <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:"5%"}}>
            Upload Requested Documents <br/> You can upload up to 4 file
          </Typography>
         <Box x={{textAlign:"center"}}>
         <input style={stylediv} type="file"  onChange={saveFile}/>
          <input style={stylediv} type="file"  onChange={saveFile2}/>
          <input style={stylediv} type="file"  onChange={saveFile3}/>
          <input style={stylediv} type="file"  onChange={saveFile4}/>
       
         </Box>
         <Box >
         

         </Box>
        </Box>
      
      </Modal>
    </div>
    </>}
    <Footer/>
    </> :isLoading ? <Spinner/> : !isHide ? <NotFound/> : <Spinner/>}
  
    </div>
  )
}

export default Profile