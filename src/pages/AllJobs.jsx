import React from "react";
import Navbar2 from "../components/Navbar2";
import SideBar from "../components/SideBar";
import { Button, Link, TablePagination, TextField } from "@mui/material";
import { Box } from "@mui/material";
import OneJobHR from "../components/OneJobHR";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "../styles/SideBar.scss";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Unauthorized from "../components/Unauthorized";
import Jobinfocard from "../components/Jobinfocard";
import Footer from "../components/Footer";
import Spinner from '../components/Spinner';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Card, CardContent, Typography } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function AllJobs() {



  const {categories} = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isHide, setIsHide] = React.useState(true);
  const[job,setJob]=React.useState([]);
  const [getJobInfo, setGetJobInfo] = React.useState("");
  const [isRemote,setIsRemote]=React.useState("")
  const [jobType,setJobtype]=React.useState("")
  const [companyName,setCompanyName]=React.useState("")
  const [experienceneed,setExperienceneed]=React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostsPerPage] = React.useState(10);

  const [date,setDate]=React.useState("")

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

    function dateHandler(e){
    setDate(e.target.value);
    }
  let Navigate = useNavigate();
  let a  =[]
  let b = []
  let c = []
  const deneme = async()=>{
    setIsLoading(true);
    try{
      const res = await axios.get("https://localhost:44361/api/Home/Jobs")
      for(var i = 0; i<res.data.length; i++){
          a.push(res.data[i])
      }
      a.reverse()
      if(a.length>=10){
        for(var i = 0; i<10; i++){
        b.push(a[i])
    }}else{
      for(var i = 0; i<a.length; i++){
        b.push(a[i])
      }
    } 
      for(var i = 0; i<b.length; i++){
        if(b[i].Date.includes("Jan")){
          b[i].Date = b[i].Date.replace("Jan",1)
        }
        if(b[i].Date.includes("Feb")){
          b[i].Date = b[i].Date.replace("Feb",2)
        }
        if(b[i].Date.includes("Mar")){
          b[i].Date = b[i].Date.replace("Mar",3)
        }
        if(b[i].Date.includes("Apr")){
          b[i].Date = b[i].Date.replace("Apr",4)
        }
        if(b[i].Date.includes("May")){
          b[i].Date = b[i].Date.replace("May",5)
        }
        if(b[i].Date.includes("Jun")){
          b[i].Date = b[i].Date.replace("Jun",6)
        }
        if(b[i].Date.includes("Jul")){
          b[i].Date = b[i].Date.replace("Jul",7)
        }
        if(b[i].Date.includes("Aug")){
          b[i].Date = b[i].Date.replace("Aug",8)
        }
        if(b[i].Date.includes("Sep")){
          b[i].Date = b[i].Date.replace("Sep",9)
        }
        if(b[i].Date.includes("Oct")){
          b[i].Date = b[i].Date.replace("Oct",10)
        }
        if(b[i].Date.includes("Nov")){
          b[i].Date = b[i].Date.replace("Nov",11)
        }
        if(b[i].Date.includes("Dec")){
          b[i].Date = b[i].Date.replace("Dec",12)
        }
      }
      setJob(b)
     
      setIsLoading(false);
    }
    catch(error){
      console.log(error)

    }
  }
    useEffect(()=>{
      deneme()
    },[])
    const clearfilter=()=>{
      setJobtype("")
      setCompanyName("")
      setExperienceneed("")
      setIsRemote("")
      setDate("")

    }


  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth()+1;
  const day = newDate.getDate();
 // const job2 ={"Name":["deneme","deneme2"],}
  const [input, setInput] = React.useState("")

  const [output, setOutput] = React.useState(job)

 
  
  React.useEffect(()=>{
    setOutput([])
  
    job.filter(val=>{
      if(val.companyName && val.companyName.toLowerCase().includes(input.toLowerCase())){
        setOutput(output=>[...output,val])
      }
      
    })
  },[input])

 
  const gridstyle={
    display:"grid",
    gridRow:" auto auto",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    justifyContent: "center",
    paddingBottom:"10%",
    marginTop:"5rem",
    width:"80%"
}
  
  console.log(categories,isRemote,jobType,date,)
const Cards=({job})=>{
  
  return(
    <>
    
     {output.length>0 ?
      output.map((value,index)=>{
     if(value.Date.slice(9,13)>year || value.Date.slice(9,13)==year && value.Date.slice(3,5)>month || 
     value.Date.slice(9,13)==year && value.Date.slice(3,5)==month && value.Date.slice(6,8)>day){
       return(
         <>
         {categories!=undefined && categories==value.category && isRemote.length==0 && jobType=="" && date =="" ? 
                  <Jobinfocard key={index} id={value.Id} Name={value.Name} Category={value.category} photo={value.photo} companyName={value.companyName}/>    
          :categories!=undefined && categories==value.category && isRemote.length>0 && isRemote==value.isRemote && jobType=="" && date =="" ?
          <Jobinfocard key={index} id={value.Id} Name={value.Name} Category={value.category} photo={value.photo} companyName={value.companyName}/>
          :categories!=undefined && isRemote.length>0 && isRemote==value.isRemote && jobType.length>0 && jobType ==value.jobType && date =="" ?
            <Jobinfocard key={index} id={value.Id} Name={value.Name} Category={value.category} photo={value.photo} companyName={value.companyName}/>
          :categories!=undefined && isRemote.length>0 && isRemote==value.isRemote && jobType.length>0 && jobType ==value.jobType &&  date =="New to Old" ?
          <>
          { console.log(value.Date,"gew") }
            <Jobinfocard key={index} id={value.Id} Name={value.Name} Category={value.category} photo={value.photo} companyName={value.companyName}/>
          </>
        
          :categories!=undefined && isRemote.length>0 && isRemote==value.isRemote && jobType.length>0 && jobType ==value.jobType &&  date =="Old to New" ?
            <Jobinfocard key={index} id={value.Id} Name={value.Name} Category={value.category} photo={value.photo} companyName={value.companyName}/>
          :""

         }
         </>
       )
     }
 })
   
  : 

      job.map((value,index)=>{
     

        if(value.Date.slice(9,13)>year || value.Date.slice(9,13)==year && value.Date.slice(3,5)>month || 
        value.Date.slice(9,13)==year && value.Date.slice(3,5)==month && value.Date.slice(6,8)>day){
          return(
              <>
              {categories != undefined &&categories==value.category ?
                          <Jobinfocard key={index} id={value.Id} Name={value.Name} Category={value.category} photo={value.photo} companyName={value.companyName}/>
            :   categories==undefined ?
            <Jobinfocard key={index} id={value.Id} Name={value.Name} Category={value.category} photo={value.photo} companyName={value.companyName}/>
            :""
                        }
              </>
            )
        }
          
        
    })}
    </>
  )
}

const Pagination =({cardPerPage,totalCardds,paginate})=>{
  const pageNumbers = [];
  for(let i = 1; i<=Math.ceil(totalCardds/cardPerPage); i++){
    pageNumbers.push(i);
  }
  return(
    <nav>
      <ul style={{listStyleType:"none",display:"flex",flexDirection:"row",position:"relative"}}  className="pagination">
        {pageNumbers.map(number=>(
          <li style={{listStyleType:"none",padding:"1%"}} key={number} className="page-item">
            <a style={{backgroundColor:"rgb(25, 118, 210)",
            padding:"70%",
            borderRadius:"0.3rem",
            color:"white",textDecoration:"none"}} onClick={()=>paginate(number)} href='/jobs/#!' className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = job.slice(indexOfFirstPost, indexOfLastPost);
const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <>
      <div style={{
        backgroundColor: "rgb(248 248 248)",minHeight:"100vh",display:"flex",minHeight:"100vh",flexDirection:"column",
        justifyContent:"space-between"}}> 

    <Navbar2/>
      
      <div className="containerall" style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"60%",margin:"0 0 0 17%"}}>
      {isLoading ? <Spinner/> :
        <>
    <Box sx={{   alignItems: "center",
    justifyContent: "center",
    textAlign:"center",
    height: "45rem",
    width: "25%",
    boxShadow:"0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    padding:"2%",borderRadius:"1.125rem",display:"flex",flexDirection:"column"}}>
         <Typography variant="h4" sx={{marginBottom:"1%",color:"rgb(25, 118, 210)"}}>Filtering</Typography>
      
        <div style={{display:"flex",flexDirection:"column",width:"100%",textAlign:"start",justifyContent:"start"}}>
        <Box sx={{display:"flex",flexDirection:"column"}}>  
        <label>Company Name</label>
        <TextField sx={{marginLeft:"1%"}} onChange={(e)=>{setInput(e.target.value)}}  ></TextField>
        </Box>

        <Box sx={{display:"flex",flexDirection:"column",marginLeft:"1%"}}>  
        <label>Experience Type</label>
        <TextField ></TextField>
        </Box>
      <Box sx={{display:"flex",flexDirection:"column",marginLeft:"1%"}}>
        <label>Work Option</label>
        <FormControl sx={{marginLeft:"1%"}}>
                <InputLabel id="demo-simple-select-label">Work Option</InputLabel>
                 <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{color:"black"}}
                    value={isRemote}
                    label="Work Option"
                    
                    onChange={isRemoteHandler}

                    
                    >
                    <MenuItem value={"Remote"}>Remote</MenuItem>
                    <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
                    <MenuItem value={"On Place"}>On Place</MenuItem>
                </Select>
                    </FormControl>
      </Box>
                  <Box sx={{display:"flex",flexDirection:"column",marginLeft:"1%"}}>
        <label>Job Type</label>
        <FormControl sx={{marginLeft:"1%"}}>
                <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
                 <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{color:"black"}}
                    value={jobType}
                    label="Job Type"
                    
                    onChange={jobtypeHandler}
                    
                    >
                    <MenuItem value={"Full Time"}>Full Time</MenuItem>
                    <MenuItem value={"Part Time"}>Part Time</MenuItem>
                    <MenuItem value={"Internship"}>Internship</MenuItem>
                    <MenuItem value={"Freelance"}>Freelance</MenuItem>
                </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{display:"flex",flexDirection:"column",marginLeft:"1%"}}>
        <label>Date</label>
        <FormControl sx={{marginLeft:"1%",marginBottom:"15%"}}>
                <InputLabel id="demo-simple-select-label">Date</InputLabel>
                 <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{color:"black"}}
                    value={date}
                    label="Date"
                    
                    onChange={dateHandler}
                    
                    >
                    <MenuItem value={"New to Old"}>New to Old</MenuItem>
                    <MenuItem value={"Old to New"}>Old to New</MenuItem>
                  
                </Select>
                    </FormControl>
                   
                <Button variant="contained" onClick={clearfilter}>Clear Filter</Button>
                  </Box>
        </div>    
     

    </Box>
       
        
    <div style={gridstyle} className="grid">
    <Cards job={currentPosts}/>
    <Pagination
        cardPerPage={postsPerPage}
        totalCardds={job.length}
        paginate={paginate}
        />

   </div> 
  
        </>}

      </div>
      <div style={{color:"white",background: "rgb(21, 101, 192)",bottom:"0",height:"2rem",width:"100%", boxShadow:" 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"}}>
        <div className="mid"  style={{justifyContent:"center",textAlign:"center",alignItems:"center",marginTop:"10px"}}>2022 HrPortal. All rights reserved
  </div>
    </div>
   
   
 </div>
   
    </>
  );
}

export default AllJobs;
