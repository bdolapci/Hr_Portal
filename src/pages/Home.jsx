import React from 'react'
import Navbar2 from '../components/Navbar2';
import SideBar from '../components/SideBar'
import { Button, Link, TablePagination, TextField, Typography } from '@mui/material';
import { Box } from '@mui/material';
import OneJobHR from '../components/OneJobHR';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Paper from '@mui/material/Paper';
import MUIDataTable from "mui-datatables";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';
import "../styles/SideBar.scss"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Unauthorized from '../components/Unauthorized';
import Jobinfocard from '../components/Jobinfocard';
import Spinner from '../components/Spinner';
import signin from '../pictures/singin.jpg';
import cowork from '../pictures/cowork.svg';
import share from '../pictures/share.svg';
function Home() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [isHide, setIsHide] = React.useState(true);
  const[job,setJob]=React.useState([]);
  const [getJobInfo, setGetJobInfo] = React.useState("");
  const [getopThree, setGetopThree] = React.useState("");
   const text2=["Everywhere","Office","Home"]

    const [newName2, setnewName2] = React.useState("");
  let Navigate = useNavigate();
  let a  =[]
  let b = []
  const deneme = async()=>{
    setIsLoading(true);
    try{
      const res = await axios.get("https://localhost:44361/api/Home/Jobs")
      for(var i = 0; i<res.data.length; i++){
          a.push(res.data[i])
      }
      let c = res.data.map((x=>x.category))
      const count ={}
      for(const element of c){
        if(count[element]){
          count[element]++
        }
        else{
          count[element] = 1
        }
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


      setGetopThree(count)

      setIsLoading(false);
    }
    catch(error){
      console.log(error)

    }
  }
    useEffect(()=>{
      deneme()
    },[])

    const shuffle2=React.useCallback(()=>{
      const index2= Math.floor(Math.random() * text2.length);
      setnewName2(text2[index2]);
    },[])

  useEffect(() => {
    const intervalID2 = setInterval(shuffle2, 2000);
    return () => {

      clearInterval(intervalID2);
    }
}, [shuffle2])

//console.log(job[1].Name)
    const gridstyle={
      display:"grid",
      gridRow:" auto auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      justifyContent: "center",
      marginTop:"3%",
      paddingBottom:"10%",

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
      if(val.Name.toLowerCase().includes(input.toLowerCase())){
        setOutput(output=>[...output,val])
      }
    })
  },[input])
  
  return (

      <div style={{
        backgroundColor: "rgb(251 251 251)",minHeight:"100vh",display:"flex",flexDirection:"column",
        justifyContent:"space-between"}}> 

    <Navbar2/>
  
        {isLoading ? <Spinner/> :
        <>
        <Box sx={{display:"flex",flexDirection:"row",justifyContent:"center",}}>
          <Box sx={{marginRight:"3rem",alignItems:"center",textAlign:"center",display:"flex",flexDirection:"column",
          justifyContent:"space-around"}}>
          <Typography variant="h4"><span style={{color:"rgb(25, 118, 210)"}}>Discover</span> new Opportunities</Typography>
          <Typography variant="h5">Top Three Category</Typography>
          <ul>
          {Object.keys(getopThree).map((key,index)=>{
            return(
              <li style={{textAlign:"start",color:"rgb(25, 118, 210)"}} key={index}> <Typography variant='h5' sx={{color:"black"}}>{key}</Typography></li>
            )
          })}
          
            
          </ul>
          </Box>
          <Box>
          <img  style={{width:"25rem"}} className='signinsvg' src={share} alt="signin" />
          </Box>
        </Box>
        <Box sx={{display:"flex",flexDirection:"row-reverse",justifyContent:"center",}}>
          <Box sx={{alignItems:"center",textAlign:"center",display:"flex",flexDirection:"column",
          justifyContent:"center",width: "24rem"}}>
          <Typography variant="h4">Work from <span style={{color:"rgb(25, 118, 210)"}}>{newName2}</span></Typography>
         
        
          </Box>
          <Box sx={{marginRight:"3rem"}}>
          <img style={{width:"25rem"}}  className='signinsvg' src={cowork} alt="signin" />
          </Box>
        </Box>
          <Box sx={{marginTop:"8%"}}><TextField 
  sx={{ marginBottom:"2%",width:"40%",backgroundColor:"white"  }}
  placeholder="Search Job"
  id="outlined-basic"
  variant="outlined"
  onChange={e=>setInput(e.target.value)}
></TextField></Box>
    <div style={gridstyle} className="grid">
    {output.length>0 ?
      output.map((value,index)=>{
     if(value.Date.slice(9,13)>year || value.Date.slice(9,13)==year && value.Date.slice(3,5)>month || 
     value.Date.slice(9,13)==year && value.Date.slice(3,5)==month && value.Date.slice(6,8)>day|| value.Date=='null'){
       return(
         <Jobinfocard key={index} id={value.Id} Name={value.Name} Category={value.category} photo={value.photo} companyName={value.companyName}/>
       )
     }
     <Button href='/jobs'  variant='contained' >See More Job</Button>
 }):
 output.length==0 && input.length>0 ?
     <Typography variant='h4' sx={{color:"rgb(25, 118, 210)"}}>No Job Found</Typography>
     : job.map((value,index)=>{
     

        if(value.Date.slice(9,13)>year || value.Date.slice(9,13)==year && value.Date.slice(3,5)>month || 
        value.Date.slice(9,13)==year && value.Date.slice(3,5)==month && value.Date.slice(6,8)>day|| value.Date=='null'){
          return(
            <Jobinfocard key={index} id={value.Id} Name={value.Name} Category={value.category} photo={value.photo} companyName={value.companyName}/>
          )
        }
          
        
    })}
  <Box  sx={{justifyContent:"center",alignItems:"center",textAlign:"center"}}> 
 
  {output.length==0 && input.length>0 ? "" :<Button href='/jobs'  variant='contained' >See More Job</Button> }
  </Box>
   </div> 
   <div style={{color:"white",background: "rgb(21, 101, 192)",bottom:"0",height:"2rem",width:"100%", boxShadow:" 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"}}>
        <div className="mid"  style={{justifyContent:"center",textAlign:"center",alignItems:"center"}}>2022 HrPortal. All rights reserved
  </div>
    </div>
        </>}


   
   
 </div>

  )
}

export default Home