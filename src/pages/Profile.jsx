import { Box, Button } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
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

import Stack from '@mui/material/Stack';
function Profile() {
  
  const [open, setOpen] = useState(false);
  const [openex, setOpenex] = useState(false);
  const [opened, setOpened] = useState(false);
  const [opencer, setOpencer] = useState(false);
  const [opensk, setOpensk] = useState(false);
  const [opench, setOpench] = useState(false);
  const [openit, setOpenit] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenex = () => setOpenex(true);
  const handleCloseex = () => setOpenex(false);
  const handleOpened = () => setOpened(true);
  const handleCloseed = () => setOpened(false);
  const handleOpencer = () => setOpencer(true);
  const handleClosecer = () => setOpencer(false);
  const handleOpensk = () => setOpensk(true);
  const handleClosesk = () => setOpensk(false);
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
  const {id} = useParams();
  const[job,setJob]=React.useState([]);
  const[profile,setProfile]=React.useState([]);
  const[user,setUser]=React.useState([]);
  var token=localStorage.getItem("User");
    var decoded = jwt_decode(token);

  React.useEffect(()=>{
    axios.get("https://localhost:44361/api/Home/Jobs",{
    }).then((res)=>{
      let a=[]
      for(let i=0;i<res.data.length;i++){
        if(res.data[i].UserId==decoded.id){
          a.push(res.data[i])
        }
      }
        setJob(a);
    })
   
   
},[]);


React.useEffect(()=>{
  axios.get(`https://localhost:44361/api/Home/Profile/${id}`,{
  }).then((res)=>{
    
      setProfile(res.data);
  })
},[]);

React.useEffect(()=>{
  axios.get(`https://localhost:44361/api/Home/User/${decoded.id}`,{
  }).then((res)=>{
      setUser(res.data);
  })
},[]);
  const [facebook, setFacebook] = React.useState('');
  const [twitter, setTwitter] = React.useState('');
  const [linkedin, setLinkedin] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [aboutsection, setAboutsection] = React.useState('');
  const [skills, setSkills] = React.useState('');
  const [education, setEducation] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [followers, setFollowers] = React.useState('');
  const[following,setFollowing]=React.useState('');
  const [certification, setCertification] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [emptyField3,setEmptyField3] = React.useState(false);
  const addFollowers =async ()=>{
    try {
      const res = await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfilefollowers`,	
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
  const editskills=async()=>{
    try {
      const res = await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfileskills`,	
        {
            Id:id,
            UserId:decoded.id,
            skills:skills,
        }
      )
      window.location.reload();
      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }
  const editcertification=async()=>{
    try {
      const res = await axios.post(
        `https://localhost:44361/api/Home/Profile/EditProfilecertification`,	
        {
            Id:id,
            UserId:decoded.id,
            certification:certification,
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
            experience:experience,
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
            education:education,
        }
      )
      window.location.reload(true);
      console.log(res)

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
  function skillsHandler(e){
    setSkills(e.target.value);
  }
  function educationHandler(e){
    setEducation(e.target.value);
  }
  function experienceHandler(e){
    setExperience(e.target.value);
  }
  function followersHandler(e){
    setFollowers(e.target.value);
  }
  function followingHandler(e){
    setFollowing(e.target.value);
  }
  function certificationHandler(e){
    setCertification(e.target.value);
  }

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
  
    const handleNext = () => {
      if (activeStep===0) {
          controlemail();
        if(email===user.email){
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
    },
  ]
  var formData =new FormData();

  const onfileChange =(e)=>{
    console.log(e.target.files[0])
    if(e.target.files[0]){
      formData.append("file",e.target.files[0])
    }
  }
  async function submitFileData(){
   await axios.post("https://localhost:44361/api/Home/UploadFile",{
      formData
    })
    .then(res=>{
      console.log(res)
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

  return (
    <>
    <Navbar/>
    
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
        {profile.Userid == decoded.id ? <Button 
        onClick={handleOpenit}
        sx={{    
          top: "-50px",
          position: "relative"}}>
        <SettingsIcon />
        
       </Button> : "" }
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
        <img src={banner} alt="banner">
        </img>
        {profile.Userid == decoded.id ?
        <Button 
        onClick={handleOpen}
        sx={{    
          top: "-50px",
          position: "relative"}}>
        <SettingsIcon />
        
       </Button> : "" }
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
                    }
                    }>
               <Box sx={{justifyContent:'center',
                display:'flex',
                flexDirection:"column",
                alignItems:"center",
                textAlign:"center"}} >
                        <Box sx={{width:"100%"}}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="contained-button-file">
                    <input name="file" onChange={onfileChange}  accept="file/*" id="contained-button-file" multiple type="file" />
                    <button onClick={submitFileData}  variant="contained" component="span">
                      Upload
                    </button>
                  </label>
                </Stack>                 
                        </Box>
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                        <TextField 
                            label="About"
                            multiline
                            rows={5}                
                            onChange={aboutsectionHandler}       
                            />
                            <Box>                            
                            <TextField 
                            label="Facebook"
                            sx={{marginRight:"3%"}}
                            onChange={facebookHandler}
                            />
                             <TextField 
                            label="Twitter"
                            sx={{marginRight:"3%"}}
                            onChange={twitterHandler}
                            />
                             <TextField 
                            label="Linkedin"      
                            onChange={linkedinHandler}     
                            />
                            </Box>
                        </Box>
                <Button type="submit">Save</Button>
                </Box>
               </form>
           </Box>
            </Modal> 
        <Button 
        onClick={addFollowers}
        sx={{position:"relative",
        top:"-4rem",
        marginLeft:"2rem",
        backgroundColor:"white",
        border:"1px solid white",
        color:"black",
        paddingLeft:"2rem",
        paddingRight:"2rem",
        borderRadius:"2rem",
    }} >Follow Me</Button>
   
        <div className="about">
            <h3 >About</h3>
            <h4>{profile.about}</h4>
                <hr />
                <div className="follow">
                    <div className="followers">
                    <h4>Followers</h4>
                    <h4>{profile.Followers}</h4>
                    </div>
            <div className="following">
            <h4>Following</h4>  
            <h4>{profile.Following}</h4>
            </div>
            <Box sx={{justifyContent:"space-around",alignItems:"center",textAlign:"center"}}>
              <Button target="_blank" href={profile.Facebook}>

           <GitHubIcon sx={{marginRight:"5%"}}/>
              </Button>
              <Button target="_blank" href={profile.Twitter}> 
              <TwitterIcon sx={{marginRight:"5%"}}/>
              </Button>    
              <Button target="_blank" href={profile.Linkedin}>
            <LinkedInIcon/>
              </Button>
            </Box>
                </div>
            
        </div>
          <div style={{justifyContent:"center",alignItems:"center",textAlign:"center",marginBottom:""}} className="changepassword">
          {profile.Userid == decoded.id ?
            <Button onClick={handleOpench} variant="contained">Change Password</Button> : "" }
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
        {emptyField2 ? <Alert severity="error">verification number is incorrect</Alert> :  "" }
          {activeStep === 0 ?( 
          <TextField style={{marginTop:"20px",marginLeft:"20px"}} onChange={emailInput} id="outlined-basic" label="Email" variant="outlined" />
          ):""}
          {wrongEmail ? <Alert sx={{marginTop:"3%"}} severity="error">Email is not correct</Alert> :  ""}
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
        <div className="experience" style={{boxShadow: "0px 2px 4px 0px #404040"}}>
        <h3 style={{margin:"10px"}}>Experience</h3>
        <hr/>
        {profile.Userid == decoded.id ?
        <Button   
        onClick={handleOpenex}
        sx={{    
          top: "-50px",
          left: "-37rem",
          position: "relative"}}>
        <SettingsIcon />
        
       </Button> : "" }
            <Box  sx={{marginTop:"0px",textAlign:"start",padding:"10px",    
           position: "relative"}}>
          {profile.experience}

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
                    editprofileex();
                    }
                    }>
               <Box sx={{justifyContent:'center',
                display:'flex',
                flexDirection:"column",
                alignItems:"center",
                textAlign:"center"}} >
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                        <TextField 
                            label="Experience"
                            multiline
                            rows={5}                
                            onChange={experienceHandler}       
                            />

                        </Box>
                <Button type="submit">Save</Button>
                </Box>
               </form>
           </Box>
            </Modal> 
          </div>
          <div className="experience" style={{boxShadow: "0px 2px 4px 0px #404040"}}>
        <h3 style={{margin:"10px"}}>Education</h3>
        <hr/>
        {profile.Userid == decoded.id ?
        <Button 
        onClick={handleOpened}
        sx={{    
          top: "-50px",
          left: "-37rem",
          position: "relative"}}>
        <SettingsIcon />
        
       </Button> : "" }
            <Box  sx={{marginTop:"0px",textAlign:"start",padding:"10px", 
           position: "relative"}}>
          {profile.education}

            </Box>
          
       <Modal
            open={opened}
            onClose={handleCloseed}
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
                        <TextField 
                            label="Education"
                            multiline
                            rows={5}                
                            onChange={educationHandler}       
                            />

                        </Box>
                <Button type="submit">Save</Button>
                </Box>
               </form>
           </Box>
            </Modal> 
          </div>
           
          <div className="experience" style={{boxShadow: "0px 2px 4px 0px #404040"}}>
        <h3 style={{margin:"10px"}}>Certification</h3>
        <hr/>
        {profile.Userid == decoded.id ?
        <Button 
        onClick={handleOpencer}
        sx={{    
          top: "-50px",
          left: "-37rem",
          position: "relative"}}>
        <SettingsIcon />
        
       </Button> : "" }
            <Box  sx={{marginTop:"0px",textAlign:"start",padding:"10px",    
           position: "relative"}}>
          {profile.certification}

            </Box>
          
       <Modal
            open={opencer}
            onClose={handleClosecer}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
           <Box sx={{ ...style, width: 800, background:"" }}>
               <form onSubmit={(e)=>{
                    e.preventDefault();
                    editcertification();
                    }
                    }>
               <Box sx={{justifyContent:'center',
                display:'flex',
                flexDirection:"column",
                alignItems:"center",
                textAlign:"center"}} >
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                        <TextField 
                            label="Certification"
                            multiline
                            rows={5}                
                            onChange={certificationHandler}       
                            />

                        </Box>
                <Button type="submit">Save</Button>
                </Box>
               </form>
           </Box>
            </Modal> 
          </div>
            <div className="experience" style={{boxShadow: "0px 2px 4px 0px #404040"}}>
        <h3 style={{margin:"10px"}}>Skills</h3>
        <hr/>
        {profile.Userid == decoded.id ?
        <Button 
        onClick={handleOpensk}
        sx={{    
          top: "-50px",
          left: "-37rem",
          position: "relative"}}>
        <SettingsIcon />
        
       </Button> : "" }
            <Box  sx={{marginTop:"0px",textAlign:"start",padding:"10px",    
           position: "relative"}}>
          {profile.Skills}
            </Box>
        
       <Modal
            open={opensk}
            onClose={handleClosesk}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
           <Box sx={{ ...style, width: 800, background:"" }}>
               <form onSubmit={(e)=>{
                    e.preventDefault();
                    editskills();
                    }
                    }>
               <Box sx={{justifyContent:'center',
                display:'flex',
                flexDirection:"column",
                alignItems:"center",
                textAlign:"center"}} >
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                        <TextField 
                            label="Skills"
                            multiline
                            rows={5}                
                            onChange={skillsHandler}       
                            />

                        </Box>
                <Button type="submit">Save</Button>
                </Box>
               </form>
           </Box>
            </Modal> 
          </div> 
            <div className="activeapplications">           
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
        
    </div>
    <Footer/>
    </>
  )
}

export default Profile