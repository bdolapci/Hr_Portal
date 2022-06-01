import React from 'react'

import Navbar from "../components/Navbar";
import OneUser from '../components/OneUser';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../styles/AdminPanel.scss";
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import OneJob from '../components/OneJob';
import SideBar from '../components/SideBar';
import jwt_decode from "jwt-decode";
import MUIDataTable from 'mui-datatables';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Unauthorized  from '../components/Unauthorized';
function AdminPanelHr() {
  if(JSON.parse(localStorage.getItem("User")) !== null){
    var token=localStorage.getItem("User");
    var decoded = jwt_decode(token);
   }

const [hr,setHr]=React.useState([]);
const [companyverify,setCompanyverify]=React.useState();
  useEffect(()=>{
    axios.get("https://localhost:44361/api/Home",{
    }).then((res)=>{
      let a = res.data.map((x=>x.userRole))
      let hr=[]
      for (let i=0;i<res.data.length;i++){
        if(a[i]==="hr"){
          hr.push(res.data[i])
        }
      }
      setHr(hr);
    })
  },[])
  const removeUser = async (Id) => {
    try {
      const res = await axios.delete(`https://localhost:44361/api/Home/${Id}`,{
      })
      console.log(res.data)
      window.location.reload(true);
      
    } catch (error) {
      alert(error)
    }
  }
  const makeUser =async (Id)=>{
    try {
        const res=await axios.post(`${"https://localhost:44361/api/Home/HR"}`,{           
                id:Id,
                userRole: "user",
                email:"a",
                firstName:"as",
                lastName:"vc",
                Passwords:"cz",          
        })
        console.log(res.data)
        window.location.reload(true);
    } catch (error) {
        alert(error)
    }
}
const verify=async(Id)=>{
  try {
    const res=await axios.post(`${"https://localhost:44361/api/Home/VerifyCompany"}`,{           
      id:Id,
      userRole: "user",
      email:"a",
      firstName:"as",
      lastName:"vc",
      Passwords:"cz",
      isCompanyVerified:true,          
})
  if(res.data.isCompanyVerified==true){
    setCompanyverify("Verified")
  }
  window.location.reload(true);
  } catch (error) {
    console.log(error)
  }
}
const columns = [
  {
    name:"firstName",
    label:"First Name",
  },
  {
    name:"lastName",
    label:"Last Name",
  },
  {
    name:"email",
    label:"Email",
  },
  {
    name: "Id",
    label:"Remove User",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
          <Button onClick={()=>removeUser(value)}><RemoveRedEyeIcon/></Button>
          </>
        );
      }
    }
  },
  {
    name: "Id",
    label:"Make User",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
          <Button onClick={()=>makeUser(value)}><RemoveRedEyeIcon/></Button>
          </>
        );
      }
    }
  },
  {
    name: "Id",
    label:"Status",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
          {hr.map((x,i)=>{
            if(hr[i].Id==value){
              
              if(hr[i].isCompanyVerified==true){
                
                return(
                  <>
                  <Button >
                  Verified
                  </Button>
                  </>
                )
              }
              else{
                return(
                  <>
                  <Button onClick={()=>{verify(value)}} >
                  Not Verified
                  </Button>
                  </>
                )
              }
            }
          })}
          </>
                
        );
      }
    }
  },
  
]

const options = {
  filterType: 'checkbox',
  selectableRows: "none",
  print:false,
  viewColumns:false,
  download	:false,
  filter:false,
};



  return (
  
      <>
        {JSON.parse(localStorage.getItem("User")) !== null ?decoded.userRole =="admin" ?
        <div style={{backgroundColor:"rgb(248, 248, 248)",minHeight:"100vh"}}>
         <Navbar/>
    <SideBar/>
    <div className="container">
    <Box sx={{marginBottom:"2%",marginTop:"1%"}}>
        <Typography variant='h4' sx={{color:"rgb(25, 118, 210)"}}>Welcome to the HR Section </Typography>
    </Box>
    <Box sx={{ height: 400, width: '70%' }}>
    <MUIDataTable

      title={<><Box>
      <h3>HR Table</h3>
      </Box>
      </>}
      data={hr}
      columns={columns}
      options={options}
    />
    </Box>
          </div>    
        </div> :<Unauthorized/>:<Unauthorized/>}
     
    </>
    
  )
}


export default AdminPanelHr