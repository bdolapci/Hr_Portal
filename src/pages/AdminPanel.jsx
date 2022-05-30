import React from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import jwt_decode from "jwt-decode";
import Unauthorized  from '../components/Unauthorized'
import { Typography } from '@mui/material';
import axios from 'axios';
function AdminPanel() {
  var token=localStorage.getItem("User");
  var decoded = jwt_decode(token);
const [numberofusers,setNumberofusers]=React.useState(0);
const [companyrepresetetives,setCompanyrepresetetives]=React.useState(0);
const [numberofjobs,setNumberofjobs]=React.useState(0);
let a=[]
let b=[]
  const getnumberofusers=async()=>{
    try {
      const res =await axios.get("https://localhost:44361/api/Home")
      for(var i=0;i<res.data.length;i++){
        if(res.data[i].userRole=="user"){
          a.push(res.data[i])
        }
        else if(res.data[i].userRole=="hr"){
          b.push(res.data[i])
        }
      }
      setNumberofusers(a.length);
     setCompanyrepresetetives(b.length);

    } catch (error) {
      console.log(error)
    }
  }
  const getnumberofjobs=async()=>{
    try {
      const res=await axios.get("https://localhost:44361/api/Home/Jobs")
      setNumberofjobs(res.data.length)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(()=>{
    getnumberofusers()
    getnumberofjobs()
  },[])

  return (
    <>
    {decoded.userRole=="admin" ? 
    <>
        <Navbar/>
    <SideBar/>
    <div className="container" >
    <h1>Welcome to your Panel</h1>
    <div className="informations" style={{display:"flex",flexDirection:"row",marginTop:"10%"}}>

      <div className="leftpart" style={{width:"40rem"}}>
    <Typography sx={{marginBottom:"2%",textAlign:"start",fontSize:"24px"}}>Number of Users: {numberofusers}</Typography>
    <Typography sx={{marginBottom:"2%",textAlign:"start",fontSize:"24px"}}>Number of Company Representative: {companyrepresetetives}</Typography>
    <Typography sx={{marginBottom:"2%",textAlign:"start",fontSize:"24px"}}>Number of Total Jobs: {numberofjobs}</Typography>
      </div>
      <div className="rightpart" style={{width:"40rem"}}>
        <Typography>Chat Part</Typography>
      </div>
    </div>
    </div>
    </> : <Unauthorized/>}

    
    </>
  )
}

export default AdminPanel