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
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Unauthorized from '../components/Unauthorized';
function AdminPanelJobs() {

  if(JSON.parse(localStorage.getItem("User")) !== null){
    var token=localStorage.getItem("User");
    var decoded = jwt_decode(token);
   }
      var Navigate = useNavigate();
      const[job,setJob]=React.useState([]);
     
      useEffect(()=>{
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
      const removeJob = async (Id) => {
        try {
          const res = await axios.delete(`https://localhost:44361/api/Home/Jobs/${Id}`,{
          })
          console.log(res.data)
          window.location.reload(false);
        } catch (error) {
          alert(error)
        }
      } 
      const columns = [
        {
          name:"Name",
          label:"Name",
        },
        {
          name:"Date",
          options:{
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <>
               {value.slice(3,16)}
                </>
              );
            }
          }
        },
        {
          name:"category",
          label:"Category",
        },
  {
    name: "Id",
    label:"Delete Job",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
          <Button onClick={()=>removeJob(value)} ><RemoveRedEyeIcon/></Button>
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
      <div style={{backgroundColor:"rgb(248, 248, 248)",minHeight:"100vh"}}>
      {JSON.parse(localStorage.getItem("User")) !== null ?decoded.userRole =="admin" ? <>
      <Navbar/>
    <SideBar/>
    <div className="container">
    <Box sx={{marginBottom:"2%",marginTop:"1%"}}>
        <Typography variant='h4' sx={{color:"rgb(25, 118, 210)"}}>Welcome to the Jobs Section </Typography>
    </Box>
    <Box sx={{ height: 400, width: '70%' }}>
    <MUIDataTable

      title={<><Box>
      <h3>Job Table</h3>
      </Box>
      </>}
      data={job}
      columns={columns}
      options={options}
    />
    </Box>
          </div>      
      </>: <Unauthorized/>:<Unauthorized/>}
  
    </div>
    
  )
}


export default AdminPanelJobs