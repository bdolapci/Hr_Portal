import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Alert, Card,CardContent, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import axios from 'axios'
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jwt_decode  from 'jwt-decode';
import { useEffect } from 'react';
import Unauthorized from '../components/Unauthorized';
import NotFound from '../components/NotFound';
import Spinner from '../components/Spinner';


function EditJob() {
    const { id } = useParams();
    const nav = useNavigate();
    if(JSON.parse(localStorage.getItem("User")) !== null){
      var token=localStorage.getItem("User");
      var decoded = jwt_decode(token);
     }
    const [name,setName]=React.useState("")
    const [description,setDescription]=React.useState('')
    const [category,setCategory]=React.useState('')
    const [photo,setPhoto]=React.useState()
    const [date,setDate]=React.useState(null)
    const [getJob,setGetJob]=React.useState('')
    const [isLoading, setIsLoading] = React.useState(false);
    const [isHide, setIsHide] = React.useState(true);
    const [isRemote,setIsRemote]=React.useState("")
const [jobtype,setJobtype]=React.useState("")
const [companyName,setCompanyName]=React.useState("")
const [experienceneed,setExperienceneed]=React.useState("")
const [successalert,setSuccessalert]=React.useState(false)
    function NameHandler(e){
        setName(e.target.value);
      }
      function descriptionHandler(e){
        setDescription(e.target.value);
      }
      function categoryHandler(e){
        setCategory(e.target.value);
      }
      function photoHandler(e){
        setPhoto(e.target.value);
      }
        function dateHandler(e){
        setDate(e.target.value);
        }
        function jobtypeHandler(e){
        setJobtype(e.target.value);
        }
        function companyNameHandler(e){
        setCompanyName(e.target.value);
        }
        function experienceneedHandler(e){
        setExperienceneed(e.target.value);
        }
        function isRemoteHandler(e){
        setIsRemote(e.target.value);
        }

        const [file,setFile]=React.useState();
        const [fileName,setFileName]=React.useState();
        const saveFile=(event)=>{
          setPhoto(event.target.files[0]);
          setFile(event.target.files[0])
          setFileName(event.target.files[0].name)
        }
   
        const nameoffile=id+"_"+fileName
        const nameoffile2=getJob.photo
        const [alert1,setAlert1]=React.useState(false);
        const getsinglejob =async()=>{
          setIsLoading(true);
          try {
            const res =await axios.get("https://localhost:44361/api/Home/Jobs/"+id)
            setGetJob(res.data)
            setIsLoading(false);
          } catch (error) {
            console.log(error)
          }
        }
        React.useEffect(()=>{
          setIsLoading(true);
          getsinglejob()
          setIsLoading(false);
        },[])
        const uploadfile2 =async (event)=>{
          let blob =await fetch("https://hrportal.blob.core.windows.net/uploadfile/"+nameoffile2,{
            headers:{
              'Acess-Control-Allow-Origin':'*',
            }
          }).then(
            response => response.blob()
          ).then(blobFile=>new File([blobFile],nameoffile2),{type: "image/jpeg"})
          const formData=new FormData();
        formData.append("formFile",blob,nameoffile2)
        try {
          const res=await axios.post("https://localhost:44361/api/Home/UploadFile",formData)
          console.log(res);
          setAlert1(true)
        
          setTimeout(() => {
            nav("/hrPanel/home")
            setAlert1(false);
          }, 2000); 
          
          } catch (error) {
            setAlert1(false);
          console.log(error)
          }
        }
        console.log(file,nameoffile2)
        const uploadFile =async (event)=>{
            const formData=new FormData();
          formData.append("formFile",file,nameoffile)
            try {
              const res=await axios.post("https://localhost:44361/api/Home/UploadFile",formData)
              console.log(res);
              setAlert1(true)
            
              setTimeout(() => {
                nav("/hrPanel/home")
                setAlert1(false);
              }, 2000); 
              
              } catch (error) {
                setAlert1(false);
              console.log(error)
              }
             
          }
        
       
    const editJobName =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobName`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            Name: `${name}`,
          })
          setSuccessalert(true)
          setTimeout(()=>{
            nav("/hrPanel/home")
          },2000)
          
        } catch (error) {
          console.log(error)
        }
      }
      const editJobDate =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobDate`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            Date: `${date}`,
          })
          setSuccessalert(true)
          setTimeout(()=>{
            nav("/hrPanel/home")
          },2000)
        } catch (error) {
          console.log(error)
        }
      }
      const editJobDescription =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobDescription`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            description: `${description}`,
          })
          setSuccessalert(true)
          setTimeout(()=>{
            nav("/hrPanel/home")
          },2000)
        } catch (error) {
          console.log(error)
        }
      }
      const editJobCategory =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobCategory`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            category: `${category}`,
          })
          setSuccessalert(true)
          setTimeout(()=>{
            nav("/hrPanel/home")
          },2000)
        } catch (error) {
          console.log(error)
        }
      }
      const editJobPhoto =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobPhoto`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            photo: `${nameoffile}`,
          })
          setSuccessalert(true)
          setTimeout(()=>{
            nav("/hrPanel/home")
          },2000)
        } catch (error) {
          console.log(error)
        }
      }
      const editJobPhoto2 =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobPhoto`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            photo: `${nameoffile2}`,
          })
          setSuccessalert(true)
          setTimeout(()=>{
            nav("/hrPanel/home")
          },2000)
        } catch (error) {
          console.log(error)
        }
      }
      const editJobRemote =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobRemote`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            isRemote: `${isRemote}`,
          })
          setSuccessalert(true)
          setTimeout(()=>{
            nav("/hrPanel/home")
          },2000)
        } catch (error) {
          console.log(error)
        }
      }
      const editJobType =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobType`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            jobType: `${jobtype}`,
          })
          setSuccessalert(true)
          setTimeout(()=>{
            nav("/hrPanel/home")
          },2000)
        } catch (error) {
          console.log(error)
        }
      }
      const editJobExperience =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditExperienceNeed`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            experienceneed: `${experienceneed}`,
          })
          setSuccessalert(true)
          setTimeout(()=>{
            nav("/hrPanel/home")
          },2000)
        } catch (error) {
          console.log(error)
        }
      }
      const editJobCompanyName =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobCompanyName`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            companyName: `${companyName}`,
          })
          setSuccessalert(true)
          setTimeout(()=>{
            nav("/hrPanel/home")
          },2000)
        } catch (error) {
          console.log(error)
        }
      }

      

      const Input = styled('input')({
        display: 'none',
      });
      setTimeout(()=>setIsHide(false),500)
     
  return (
   <div style={{backgroundColor:"rgb(248, 248, 248)",minHeight:"105vh"}}>
  { JSON.parse(localStorage.getItem("User")) !== null ?decoded.userRole=="hr" && getJob.UserId ==decoded.id ?<>
  <Navbar/>
   <SideBar/>
   {isLoading ? <Spinner/> :
   <section >
   <div className="formpart" 
   style={{border:"0px ",
   margin:"auto"
   ,width:"70%",
   borderRadius:"1.125rem",
   boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) ",
   padding:"4%",
   backgroundColor:"white",
   marginBottom:"3%"
   }}>
       {successalert ? <Alert>Job Successfully Edited Redirecting to Home in 2s</Alert> :""}
     <Typography variant='h4' style={{textAlign:"center",marginBottom:"2%",color:"rgb(25, 118, 210)"}}>Edit Job</Typography>
         <form onSubmit={(e)=>{
           if(name!=''){
             editJobName()
           } 
           if(date!=null){
             editJobDate()
           } 
           if(description!=''){
           editJobDescription()
           } 
           if(category!=''){
             editJobCategory()
           }
           if(isRemote!=''){
              editJobRemote()
            }
            if(jobtype!=''){
              editJobType()
            }
            if(experienceneed!=''){
              editJobExperience()
            }
            if(companyName!=''){
              editJobCompanyName()
            }
           if (file!=''){
             uploadFile()
             editJobPhoto()
           }
           if(file ==undefined){
            uploadfile2()
            editJobPhoto2()
          }           
           e.preventDefault()
           
         }}>
            <div className="contain" style={{display:"flex",flexDirection:"column"}}>
            <div className="updiv"  style={{display:"flex",flexDirection:"row"}}>
 
            <div style={{justifyContent:'center',
                display:'flex',
                flexDirection:"column",
                alignItems:"center",
                textAlign:"center",
                width:"60%"}} >
                  <Typography>
                    Job Name
                  </Typography>
                <TextField 
               // multiline  
               variant="filled"
               sx={{ marginBottom:"2%",width:"50%"}}
              
               multiline
               
               placeholder="Name"
               defaultValue={getJob.Name}
               onChange={NameHandler}
               ></TextField>
                <Box sx={{ marginTop:"0",marginBottom:"2%",width:"50%"}}>
                <Typography>
                    Job Deadline ({getJob.Date.slice(0,15)})
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date"
                        value={date}
                        
                        format="DD-MM-YYYY"
                        onChange={(newValue) => {
                          setDate(newValue);
                          
                        }}
                         disablePast={true}
                        renderInput={(params) => <TextField {...params} />}
                      />
                  </LocalizationProvider>
                </Box>
                
                <Box sx={{width:"100%","marginBottom":"2%",marginTop:"0"}}>
                <Typography>
                    Chose the Category
                  </Typography>
                <FormControl sx={{width:"30%"}}>
                <InputLabel id="demo-simple-select-label">{getJob.category}</InputLabel>
                 <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{color:"black"}}
                    value={category}
                    //  label="Category"
                    
                    onChange={categoryHandler}
                    defaultValue={getJob.category}
                    
                    >
                   
                      <MenuItem value={"Accounting"}>Accounting</MenuItem>
                    <MenuItem value={"Customer Service"}>Customer Service</MenuItem>
                    <MenuItem value={"Analytics&Data Science"}>Analytics & Data Science</MenuItem>
                    <MenuItem value={"Design&Illustration"}>Design&Illustration</MenuItem>
                    <MenuItem value={"Engineering"}>Engineering</MenuItem>
                    <MenuItem value={"Web&Software Development"}>Web&Software Development</MenuItem>
                    <MenuItem value={"Law&Legal"}>Law&Legal</MenuItem>
                    <MenuItem value={"Marketing"}>Marketing</MenuItem>
                    <MenuItem value={"Writing&Translation"}>Writing&Translation</MenuItem>
                    <MenuItem value={"Architecture"}>Architecture</MenuItem>
                </Select>
                    </FormControl>
                      </Box>
                      <Typography>
                    Pick a photo
                  </Typography>
                  <div className="photoupload" style={{display:"flex",flexDirection:"row"}}>

                  <input style={{
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
                        }} type="file"
                        
                        onChange={saveFile}/>
            </div>
                
                </div>
                <div style={{width:"30%",justifyContent:"center",textAlign:"center"}} className="multi">
                  <Typography sx={{justifyContent:"center",textAlign:"center"}}>
                    Work Option
                  </Typography>
                  <FormControl sx={{width:"80%",marginBottom:"2%"}}>
                <InputLabel id="demo-simple-select-label">{getJob.isRemote}</InputLabel>
                 <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{color:"black"}}
                    value={isRemote}
                    label="Category"
                    
                    onChange={isRemoteHandler}
                    >
                    <MenuItem value={"Software"}>Remote</MenuItem>
                    <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
                    <MenuItem value={"On Place"}>On Place</MenuItem>
                </Select>
                    </FormControl>
                    <Typography sx={{justifyContent:"center",textAlign:"center"}}>
                    Job Type
                  </Typography>
                  <FormControl sx={{width:"80%",marginBottom:"2%"}}>
                <InputLabel id="demo-simple-select-label">{getJob.jobType}</InputLabel>
                 <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{color:"black"}}
                    value={jobtype}
                    label="Category"
                    
                    onChange={jobtypeHandler}
                    >
                    <MenuItem value={"Full Time"}>Full Time</MenuItem>
                    <MenuItem value={"Part Time"}>Part Time</MenuItem>
                    <MenuItem value={"Internship"}>Internship</MenuItem>
                    <MenuItem value={"Freelance"}>Freelance</MenuItem>
                </Select>
                    </FormControl>
                    <Typography>
                    Job Experience
                  </Typography>
                <TextField 
               // multiline  
               variant="filled"
               sx={{ marginBottom:"2%",width:"80%"}}
              
               multiline
               placeholder="Job Experience"
               onChange={experienceneedHandler}
               defaultValue={getJob.experienceneed}
               ></TextField>
                <Typography>
                    Company Name
                  </Typography>
                <TextField 
               // multiline  
               variant="filled"
               sx={{ marginBottom:"2%",width:"80%"}}
            
               multiline
               
               placeholder="Company Name"
               onChange={companyNameHandler}
               defaultValue={getJob.companyName}
               ></TextField>
              
                </div>
            </div>
           <div className="downdiv" style={{display:"flex",flexDirection:"column",justifyContent:"center",textAlign:"center",alignItems:"center",marginTop:"2%"}}>
  <Typography>
                    Job Description
                  </Typography>
                <TextField 
                multiline 
             
                defaultValue={getJob.description}
                rows={10}
                variant="filled"sx={{ marginBottom:"2%",width:"90%"}}
              
                placeholder="Description"
                onChange={descriptionHandler}
                ></TextField>
           </div>
                </div>
           <div style={{marginTop:"2%",justifyContent:"center",aligItems:"center",textAlign:"center"}}  className="postdiv">

           <Button variant='contained' type="submit">Edit Job</Button>
           </div>
                           
         </form>
             </div>
             </section>}
  </> :isLoading ? <Spinner/> : !isHide ? <NotFound/>  :<Spinner/>:<Unauthorized/>}
   </div>
    
  )
}

export default EditJob