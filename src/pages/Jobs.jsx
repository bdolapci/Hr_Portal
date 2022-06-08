import React from 'react'
import Navbar from '../components/Navbar';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
function Jobs(props) {
    const[jobopen,setJobOpen]=React.useState([]);
    const[jobclosed,setJobClosed]=React.useState([]);
    const [getJob, setGetJob] = React.useState("");
    const [getApplicantsfortJob, setGetApplicantsfortJob] = React.useState("");
    
    if(JSON.parse(localStorage.getItem("User")) !== null){
      var token=localStorage.getItem("User");
      var decoded = jwt_decode(token);
     }
     let b=[]
     let c=[]
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
          for(let i=0;i<a.length;i++){
            if(a[i].Date=="closed"){
              b.push(a[i])
            }
            else{
              c.push(a[i])
            }
          }
          setJobOpen(b);
          setJobClosed(c);
        })
    },[]);
    function TabPanel(props) {
      const { children, value, index, ...other } = props;
    
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }
    
    
    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    };
  
    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
    const [value, setValue] = React.useState(0);
    
    const handleChange= (event, newValue) => {
        setValue(newValue);
    }
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
  const closeJob=async(Id)=>{
    try {
      const res=await axios.post(
        `https://localhost:44361/api/Home/Jobs/EditJobDate`,
      {
        Id: `${Id}`,
        UserId:decoded.id,
        Date:"closed",
      })
     
      window.location.reload(true);
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
             {value=="null" ? "" :value.slice(0,16)}
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
      {
        name:"Id",
        label:"Close Job",
        options:{
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
             <Button onClick={()=>closeJob(value)}><RemoveRedEyeIcon/></Button>
              </>
            );
          }
        }
      },
    ]

    const columns2 = [
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
             {value=="null" ? "" :value.slice(0,16)}
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
    <div style={{backgroundColor:"rgb(248, 248, 248)",minHeight:"140vh"}}>
      {JSON.parse(localStorage.getItem("User")) !== null ?decoded.userRole=="hr" ?<>
      <Navbar/>
   <SideBar/>
   <div className="container" >
    <Box sx={{marginBottom:"2%",marginTop:"1%"}}>
        <Typography variant='h4' sx={{color:"rgb(25, 118, 210)"}}>Welcome to the Jobs Section </Typography>
    </Box>
    <Box sx={{ height: 400, width: '70%' }}>
    <Tabs className='Tabs' value={value} onChange={handleChange} centered sx={{margin:"auto",width:"30%"}}>
    <Tab  label="Live Jobs" {...a11yProps(0)}/>
    <Tab label="Old Jobs" {...a11yProps(1)}/>
    </Tabs>
    <TabPanel value={value} index={0}>
    <MUIDataTable

    title={<><Box>
    <h3>Jobs Table</h3>
    <Button  href='/hrPanel/jobs/Postjob'><AddIcon/>Post New Job</Button>
    </Box>
    </>}
    data={jobclosed}
    columns={columns}
    options={options}
    />
    </TabPanel>
    <TabPanel value={value} index={1}>
    <MUIDataTable

    title={<><Box>
    <h3>Jobs Table</h3>
    <Button  href='/hrPanel/jobs/Postjob'><AddIcon/>Post New Job</Button>
    </Box>
    </>}
    data={jobopen}
    columns={columns2}
    options={options}
    />
    </TabPanel>
    </Box>
   </div>
      </>  :<Unauthorized/> :<Unauthorized/>}
    </div>
  )
}

export default Jobs