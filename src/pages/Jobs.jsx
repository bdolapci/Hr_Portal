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
function Jobs(props) {
    const[job,setJob]=React.useState([]);
    const [getJob, setGetJob] = React.useState("");
    const [getApplicantsfortJob, setGetApplicantsfortJob] = React.useState("");
    var token=localStorage.getItem("User");
    var decoded = jwt_decode(token);
    let Navigate = useNavigate();
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

const EditGetJob=async(Id)=>{

  try {
    const res=await axios.get(`https://localhost:44361/api/Home/Jobs/${Id}`)
    setGetJob(res.data)
    console.log(res.data)
    
    Navigate(`/hrPanel/jobs/EditJob/${Id}`);
  } catch (error) {
    console.log(error)
  }
}
const getApplicantsforJob=async (Id)=>{
  try {
    const res =await axios.get(`https://localhost:44361/api/Home/JobApplicants/${Id}`)
    setGetApplicantsfortJob(res.data)
    Navigate(`/hrPanel/applicants/${Id}`);
  } catch (error) {
    console.log(error)
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
             {value.slice(0,16)}
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
        label:"Edit Job",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
              
               <Button 
                onClick={()=>EditGetJob(value)}
               ><EditIcon/></Button> 
              </>
            );
          }
        }
      },
      {
        name: "Id",
        label: "Display Applicants",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
              <Button onClick={()=>getApplicantsforJob(value)}><RemoveRedEyeIcon/></Button>
              </>
            );
          }
        }
      },
    ]

    const options = {
      filterType: 'checkbox',
      selectableRows: false,
      print:false,
      viewColumns:false,
      download	:false,
      filter:false,
    };
    
  return (
    <>
      {decoded.userRole=="hr" ?<>
      <Navbar/>
   <SideBar/>
   <div className="container" >
    <Box sx={{marginBottom:"2%",marginTop:"1%"}}>
        <h3>Welcome to the Jobs Section </h3>
    </Box>
    <Box sx={{ height: 400, width: '70%' }}>
    <MUIDataTable

      title={<><Box>
      <h3>Jobs Table</h3>
      <Button  href='/hrPanel/jobs/Postjob'><AddIcon/>Post New Job</Button>
      </Box>
      </>}
      data={job}
      columns={columns}
      options={options}
    />
    </Box>
   </div>
      </>  :<Unauthorized/>}
    </>
  )
}

export default Jobs