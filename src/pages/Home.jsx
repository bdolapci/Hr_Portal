import React from 'react'
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar'
import { Button, Link, TablePagination, TextField } from '@mui/material';
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
function Home() {


  const[job,setJob]=React.useState([]);
  const [getJobInfo, setGetJobInfo] = React.useState("");
  let Navigate = useNavigate();
  let a  =[]
  let b = []
  const deneme = async()=>{
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
      
      setJob(b)
      console.log(a)
    }
    catch(error){
      console.log(error)

    }
  }
    useEffect(()=>{
      deneme()
    },[])

//console.log(job[1].Name)


    const gridstyle={
      display:"grid",
      gridTemplateColumns: "400px 400px",
      gridRow:" auto auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      justifyContent: "center",
      marginTop:"6%",
      marginBottom:"10%",

  }
 // const job2 ={"Name":["deneme","deneme2"],}
   console.log(job)
  return (

      <> 


    <Navbar/>
    <h1 style={{textAlign:"center",marginTop:"5%",fontSize:"64px"}}>Categories</h1>
    <div style={gridstyle} className="grid">
      
    {job.map((value,index)=>{
        return(
            
            <Jobinfocard Name={value.Name} photo={value.photo} description={value.description} id={value.Id}
            /> 
            

        ) 
    })}


   </div> 





 </>
  )
}

export default Home