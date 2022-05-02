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
function AdminPanel() {


      var token=localStorage.getItem("User");
      var decoded = jwt_decode(token);

const [user,setUser]=React.useState([]);

  useEffect(()=>{
    axios.get("https://localhost:44361/api/Home",{
    }).then((res)=>{
      let a = res.data.map((x=>x.userRole))
      let user=[]
      for (let i=0;i<res.data.length;i++){
        if(a[i]==="user"){
          user.push(res.data[i])
        }
      }
      setUser(user);
    })
  })
  const removeUser = async (Id) => {
    try {
      const res = await axios.delete(`https://localhost:44361/api/Home/${Id}`,{
      })
      console.log(res.data)
      window.location.reload(false);
      
    } catch (error) {
      alert(error)
    }
  }
  const makeHR =async (Id)=>{
    try {
        const res=await axios.post(`${"https://localhost:44361/api/Home/HR"}`,{
                  id:Id,
                  userRole: "hr",    
                  email:"a",
                  firstName:"as",
                  lastName:"vc",
                  Passwords:"cz",          
        })
        console.log(res.data)
        window.location.reload(false);
    } catch (error) {
        alert(error)
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
    label:"Make HR",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
          <Button onClick={()=>makeHR(value)}><RemoveRedEyeIcon/></Button>
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
    <Navbar/>
    <SideBar/>
    <div className="container">
    <Box sx={{marginBottom:"2%",marginTop:"1%"}}>
        <h3>Welcome to the Users Section {decoded.firstName} </h3>
    </Box>
    <Box sx={{ height: 400, width: '70%' }}>
    <MUIDataTable

      title={<><Box>
      <h3>Users Table</h3>
      </Box>
      </>}
      data={user}
      columns={columns}
      options={options}
    />
    </Box>
          </div>      
    </>
    
  )
}

export default AdminPanel