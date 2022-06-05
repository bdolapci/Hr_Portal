import React from 'react'
import Navbar2 from '../components/Navbar2';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom'
import banner from '../pictures/banner.jpg'
import jwt_decode  from 'jwt-decode';
import NotFound from '../components/NotFound';
import { Button,Box, Alert } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
function JobInfo(){
    const [isLoading, setIsLoading] = React.useState(false);
    const [job,setJob] = React.useState("");
    const [user,setUser] = React.useState([]);
    const [profile,setProfile] = React.useState([]);
    const [alert,setAlert] = React.useState(false);
    const [isHide, setIsHide] = React.useState(true);
    const [alert2,setAlert2] = React.useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
   if(JSON.parse(localStorage.getItem("User")) !== null){
    var token=localStorage.getItem("User");
    var decoded = jwt_decode(token);
   }
    const getallInfo = () => {
        setIsLoading(true);
        axios.get(`https://localhost:44361/api/Home/Jobs/${id}`,{
        }).then((res)=>{
            setJob(res.data);
            setIsLoading(false);
        })
      }
     const getUserInfo =()=>{
        setIsLoading(true);
        axios.get(`https://localhost:44361/api/Home`,{
        }).then((res)=>{
           
            for(var i=0;i<res.data.length;i++){
                if(res.data[i].Id==job.UserId){
                    setUser(res.data[i]);
                }
            }
        })
        axios.get("https://localhost:44361/api/Home/Profile",{
        }).then((res)=>{
            for(var i=0;i<res.data.length;i++){
                if(res.data[i].Userid==job.UserId){
                    setProfile(res.data[i]);
                }
            }
            setIsLoading(false);
        })
     }
    
     const applyjob = () =>{
         if(JSON.parse(localStorage.getItem("User")) !== null){
            if(decoded.userRole != "hr" ){
                navigate("/application/"+id);
            }
            else{
                setTimeout(() => setAlert(false), 3000);
                setAlert(true);
            }
         }else if(JSON.parse(localStorage.getItem("User")) === null){
            setTimeout(() => setAlert2(false), 3000);
            setAlert2(true);
        }
       
     }


      React.useEffect(()=>{
          getallInfo();
          
       
        
      },[])
      React.useEffect(()=>{
        getUserInfo();
      },[job])
      setTimeout(()=>setIsHide(false),500)
    return(
        
        <div style={{backgroundColor:"rgb(248, 248, 248)",minHeight:"100vh"}}>
        {id==job.Id ? <>
            <Navbar2 />
        {isLoading ? <Spinner /> :
         <div className="main" style={{justifyContent:"center",alignItems:"center",textAlign:"center",marginTop:"5%",minHeight:"50rem"}}>
         <div className="middle" style={{justifyContent:"center",textAlign:"center",display:"flex",flexDirection:"row",margin:"5%"}}>
             <div className="leftpart" style={{padding:"2%",display:"flex",flexDirection:"column",width:"50%",boxShadow:"rgb(0 0 0 / 16%) 0px 1px 4px",borderRadius:"1.125rem",minHeight:"50rem",backgroundColor:"white"}} >
                 <div className="titlecategory">
                 {job.photo=="" ? <img src={banner} style={{maxWidth:"250px",marginTop:"5%"}} alt="empty"/> :
             <img style={{maxWidth:"500px",maxHeight:"200px",marginTop:"5%"}} src={"https://hrportal.blob.core.windows.net/uploadfile/"+job.photo} alt="banner"></img>}
                     <h1 style={{color:"rgb(25, 118, 210)"}}>{job.Name}</h1>
                     <h3 style={{color:"rgb(25, 118, 210)"}}>{job.category}</h3>
                 </div>
                 
                 <div className="description" style={{whiteSpace: "pre-wrap",textAlign:"left"}}>{job.description}</div>
                 <Box sx={{justifyContent:"center",alignItems:"center",textAlign:"center"}}>
                 <Button onClick={()=>{applyjob()}} variant='contained'>Apply Job</Button>
                 {alert ? <Alert  sx={{marginTop:"2%  "}}  severity="error">It seems like you are using Hr account please use personal account to apply job</Alert> : ""}
                 {alert2 ? <Alert  sx={{marginTop:"2%  "}}  severity="error">It seems like you are not logged in.Please Login or Register</Alert> : ""}
                 </Box>
             </div>
             <div className="rightpart" style={{width:"20%",boxShadow:"rgb(0 0 0 / 16%) 0px 1px 4px",marginLeft:"5%",borderRadius:"1.125rem",height:"45rem",backgroundColor:"white"}}>
            {job.photo=="" ? <img src={banner} style={{maxWidth:"250px",marginTop:"5%"}} alt="empty"/> :
             <img style={{maxWidth:"250px",maxHeight:"200px",marginTop:"5%"}} src={"https://hrportal.blob.core.windows.net/uploadfile/"+job.photo} alt="banner"></img>}
                  <h3 style={{color:"rgb(25, 118, 210)"}}>Category <br/><span style={{fontWeight:"normal",color:"black"}}>{job.category}</span></h3>
                  <h3 style={{color:"rgb(25, 118, 210)"}}>Company Name <br/><span style={{fontWeight:"normal",color:"black"}}>{job.companyName}</span></h3>
                  <h3 style={{color:"rgb(25, 118, 210)"}}>Job Type <br/><span style={{fontWeight:"normal",color:"black"}}>{job.jobType}</span></h3>
                  <h3 style={{color:"rgb(25, 118, 210)"}}>Job Experience <br/><span style={{fontWeight:"normal",color:"black"}}>{job.experienceneed}</span></h3>
                 <h3 style={{color:"rgb(25, 118, 210)"}}>HR Name <br/><span style={{fontWeight:"normal",color:"black"}}> {user.firstName} {user.lastName} </span></h3>
                 <h3 style={{color:"rgb(25, 118, 210)"}}>HR Email <br/> <span style={{fontWeight:"normal",color:"black"}}>{user.email}</span></h3>
                 <Button href={profile.Linkedin}><LinkedInIcon>{profile.Linkedin}</LinkedInIcon></Button>
               
                 
                 <Box sx={{justifyContent:"center",alignItems:"center",textAlign:"center"}}>
                 <Button onClick={()=>{applyjob()}} variant='contained'>Apply Job</Button>
                 {alert ? <Alert sx={{marginTop:"2%  "}} severity="error">It seems like you are using Hr account please use personal account to apply job</Alert> : ""}
                 {alert2 ? <Alert  sx={{marginTop:"2%  "}}  severity="error">It seems like you are not logged in.Please Login or Register </Alert> : ""}
                 </Box>
             </div>
            
         </div>
             
        
       
         </div>
        }
        
       
        <Footer/>
        </> :isLoading ? <Spinner/> :!isHide ? <NotFound/>:<Spinner/>} 
       
        </div>
    )
    
}
export default JobInfo