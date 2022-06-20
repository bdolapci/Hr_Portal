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
  const [categoryjob,setCategoryjob]=React.useState([]);
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


  let b = []

  const deneme = async()=>{
    setIsLoading(true);
    try{
      const res = await axios.get("https://localhost:44361/api/Home/Jobs")
      for(var i = 0; i<res.data.length; i++){
        b.push(res.data[i])
    
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
      if(categories !== undefined){
        setCategoryjob(b.filter(x=>x.category.includes(categories)))
      }
      else{
      setJob(b)
      }
      setIsLoading(false);
    }
    catch(error){
      console.log(error)

    }
  }
  let x=[]
  const [output, setOutput] = React.useState()
    const getfilter=async()=>{
      try {
        const res=await axios.post("https://localhost:44361/api/Home/JobsFiltered",{
            companyName:companyName,
            jobType:jobType,
            experience:experienceneed,
            isRemote:isRemote,
            SystemDate:date
        } 
        )
       
        for(var i = 0; i<res.data.length; i++){
          x.push(res.data[i])
      
        }
        for(var i = 0; i< x.length; i++){
          if( x[i].Date.includes("Jan")){
            x[i].Date =  x[i].Date.replace("Jan",1)
          }
          if( x[i].Date.includes("Feb")){
            x[i].Date =  x[i].Date.replace("Feb",2)
          }
          if( x[i].Date.includes("Mar")){
            x[i].Date =  x[i].Date.replace("Mar",3)
          }
          if( x[i].Date.includes("Apr")){
            x[i].Date =  x[i].Date.replace("Apr",4)
          }
          if( x[i].Date.includes("May")){
            x[i].Date =  x[i].Date.replace("May",5)
          }
          if( x[i].Date.includes("Jun")){
            x[i].Date =  x[i].Date.replace("Jun",6)
          }
          if( x[i].Date.includes("Jul")){
            x[i].Date =  x[i].Date.replace("Jul",7)
          }
          if( x[i].Date.includes("Aug")){
            x[i].Date =  x[i].Date.replace("Aug",8)
          }
          if( x[i].Date.includes("Sep")){
            x[i].Date =  x[i].Date.replace("Sep",9)
          }
          if( x[i].Date.includes("Oct")){
            x[i].Date =  x[i].Date.replace("Oct",10)
          }
          if( x[i].Date.includes("Nov")){
            x[i].Date =  x[i].Date.replace("Nov",11)
          }
          if( x[i].Date.includes("Dec")){
            x[i].Date =  x[i].Date.replace("Dec",12)
          }
        }
        
        setJob(x)
      } catch (error) {
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
      setCompanyName("")
     window.location.reload()
    }
  


  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth()+1;
  const day = newDate.getDate();
 // const job2 ={"Name":["deneme","deneme2"],}
  

  

 
  
  // React.useEffect(()=>{
  //   setOutput([])
  
  //   job.filter(val=>{
  //     if(val.companyName && val.companyName.toLowerCase().includes(input.toLowerCase())){
  //       setOutput(output=>[...output,val])
  //     }
      
  //   })
  // },[input])

 
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

const Cards=({job})=>{
  console.log(job)
  return(
    <>
      { job.map((value,index)=>{
     

     if(value.Date.slice(9,13)>year || value.Date.slice(9,13)==year && value.Date.slice(3,5)>month || 
     value.Date.slice(9,13)==year && value.Date.slice(3,5)==month && value.Date.slice(6,8)>day|| value.Date=='null'){
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
            <button style={{backgroundColor:"rgb(25, 118, 210)",
           width:"2rem",
           height:"2rem",
           border:0,
            borderRadius:"0.3rem",
            color:"white",textDecoration:"none"}} onClick={()=>paginate(number)}  className="page-link">
              {number}
            </button>
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

const currentPost2 =categoryjob.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div style={{
       backgroundColor:"rgb(251, 251, 251)",minHeight:"100vh",display:"flex",minHeight:"100vh",flexDirection:"column",
       }}> 

    <Navbar2/>
    <Typography color="rgb(25, 118, 210)" variant="h3" sx={{justifyContent:"center",textAlign:"center",marginTop:"5rem"}}>{categories}</Typography>
      <div className="containerall" style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"60%",margin:"0 0 0 17%"}}>
      {isLoading ? <Spinner/> :
        <>
    <Box sx={{   alignItems: "center",
    justifyContent: "center",
    textAlign:"center",
    height: "45rem",
    width: "25%",
    boxShadow:"0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    padding:"2%",borderRadius:"1.125rem",display:"flex",flexDirection:"column",backgroundColor:"white"}}>
         <Typography variant="h4" sx={{marginBottom:"1%",color:"rgb(25, 118, 210)"}}>Filtering</Typography>
        <form onSubmit={(e)=>{
          e.preventDefault()        
            getfilter()

        }}>
            
        <div style={{display:"flex",flexDirection:"column",width:"100%",textAlign:"start",justifyContent:"start"}}>
        <Box sx={{display:"flex",flexDirection:"column"}}>  
        <label>Company Name</label>
        <TextField sx={{marginLeft:"1%"}} onChange={companyNameHandler}  ></TextField>
        </Box>

        <Box sx={{display:"flex",flexDirection:"column",marginLeft:"1%"}}>  
        <label>Experience Type</label>
        <TextField onChange={experienceneedHandler}></TextField>
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
                    <Button sx={{marginBottom:"5%"}} variant="contained" type="submit">Apply Filter</Button>
                <Button variant="contained" onClick={clearfilter}>Clear Filter</Button>
                  </Box>
        </div>    
     
        </form>
    </Box>
       
    
    <div style={gridstyle} className="grid">
    {categories !=undefined ? <>
      <Cards job={currentPost2}/>
      <Pagination
        cardPerPage={postsPerPage}
        totalCardds={categoryjob.length}
        paginate={paginate}
        />
    </> :<>
    <Cards job={currentPosts}/>
    <Pagination
        cardPerPage={postsPerPage}
        totalCardds={job.length}
        paginate={paginate}
        />
    </>}
    

   </div> 
  
        </>}

      </div>
      <div style={{color:"white",background: "rgb(21, 101, 192)",bottom:"0",height:"2rem",width:"100%",position:"fixed", boxShadow:" 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"}}>
        <div className="mid"  style={{justifyContent:"center",textAlign:"center",alignItems:"center"}}>2022 HrPortal. All rights reserved
  </div>
    </div>
   
   
 </div>
   
    </>
  );
}

export default AllJobs;
