import React from 'react'
import Navbar  from '../components/Navbar';
import  Sidebar  from '../components/SideBar';
import '../styles/Applicants.scss'
import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import OneUser from '../components/OneUser';
import { useEffect } from 'react';
import axios from 'axios';
import OneApplicant from '../components/OneApplicant';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import MUIDataTable from "mui-datatables";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import Cancel from '@mui/icons-material/Cancel';
import { useParams } from "react-router-dom";

function Applicants() {

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{width:'100%'}}
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

  
  let { id } = useParams();

  
  const[user,setUser]=React.useState([]);

  const[accepteduser,setAcceptedUser]=React.useState("");
  const[rejecteduser,setRejectedUser]=React.useState("");
  const[userIdhold,setUserIdhold]=React.useState("");


  // const fetchData =()=>{
  //   const usertable="https://localhost:44361/api/Home"
  //   const applicanttable ="https://localhost:44361/api/Home/Applicants"

  //   const getUsers=axios.get(usertable)
  //   const getapplicants =axios.get(applicanttable)
  //   axios.all([getUsers,getapplicants]).then(
  //     axios.spread((...responses) => {
  //       const userdata = responses[0].data
  //       const applicantdata = responses[1].data
        
  //       let k=[]
  //       let l=[]
  //       let m=[]
  //       let s=[]

  //       // eslint-disable-next-line no-lone-blocks
  //       for(let i=0;i<applicantdata.length;i++){{
  //         for(let j=0;j<userdata.length;j++){
  //         if(userdata[j].Id==applicantdata[i].UserId &&applicantdata[i].Jobsid==id){
  //           if(applicantdata[i].isAccepted=="0"){
  //             k.push(userdata[j])
  //           }
  //           else if(applicantdata[i].isAccepted=="1"){
  //             l.push(userdata[j])
  //           }
  //           else{
  //             m.push(userdata[j])
  //           }
           
  //         } }
  //       }}
        
  //       setUser(k)
  //       setAcceptedUser(l)
  //       setRejectedUser(m)

        
  //     })
  //   )
  // }

  const combined =async()=>{
     axios.get(`https://localhost:44361/api/Home/UserApplicantJoin`,{
    }).then((res)=>{
      let k=[]
      let l=[]
      let m=[]
      let s=[]
      for(let i=0;i<res.data.length;i++){
        if(res.data[i].Jobsid==id){
          if(res.data[i].isAccepted=="0"){
            k.push(res.data[i])
          }
          else if(res.data[i].isAccepted=="1"){
            l.push(res.data[i])
          }
          else{
            m.push(res.data[i])
          }
        }
      }
      setUser(k)
      setAcceptedUser(l)
      setRejectedUser(m)
    })
  }  
  const [job,setJob]=React.useState([]);
  useEffect(()=>{
    axios.get("https://localhost:44361/api/Home/Jobs",{
    }).then((res)=>{ 
      
        setJob(res.data);
    })
   
 
},[]);


  useEffect(()=>{
    combined();
   
  },[]);



  const acceptuser=async(Id)=>{
   try {
     const res =await axios.put(`https://localhost:44361/api/Home/AcceptApplicants/${Id}`,{
      Id:Id,
      Jobsid:id,
      isAccepted:1
     },)
     window.location.reload(true);
     console.log(res)
   } catch (error) {
     console.log(error)
   }
  }
  const rejectuser=async(Id)=>{
    try {
      const res =await axios.put(`https://localhost:44361/api/Home/AcceptApplicants/${Id}`,{
      Id:Id,  
      Jobsid:id,
      isAccepted:2
      },)
      window.location.reload(true);
      console.log(res)
    } catch (error) {
      console.log(error)
    }
   }
  

  const [value, setValue] = React.useState(0);
  
  const handleChange= (event, newValue) => {
      setValue(newValue);
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
      label:"Display Profile",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          let a="/hrPanel/applicants/"+id+"/documents/"+value
          return (
            <>
            <Button href={a}><RemoveRedEyeIcon/></Button>
            </>
          );
        }
      }
    },
    {
      name: "UserId",
      label: "Display Documents",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          let a="/documents/"+value
          console.log(accepteduser[0].UserId)
          return (
            <>
            <Button href={a}><RemoveRedEyeIcon/></Button>
            </>
          );
        }
      }
    },
    {
      name: "Id",
      label: "Accept/Reject Applicants",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <>
            <Button onClick={()=>acceptuser(value)} ><DoneIcon/></Button>
            <Button onClick={()=>rejectuser(value)}><CancelIcon/></Button>
            </>
          );
        }
      }
    },
  ]
  const columns2 = [
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
      name: "ProfileId",
      label:"Display Profile",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          let a="/profile"+"/"+value
          return (
            <>
            <Button href={a}><RemoveRedEyeIcon/></Button>
            </>
          );
        }
      }
    },
    {
      name: "UserId",
      label: "Display Documents",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          let a="/hrPanel/applicants/"+id+"/documents/"+value
          return (
            <>
            <Button href={a}><RemoveRedEyeIcon/></Button>
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
    filter :false,
  };

  return (
 <>
    <Navbar/>
    <Sidebar/>
    <div className='container'style={{margin:"auto",width:"80%"}} >
    <Tabs className='Tabs' value={value} onChange={handleChange} centered>
    <Tab  label="Open Applications" {...a11yProps(0)}/>
    <Tab label="Accepted" {...a11yProps(1)}/>
    <Tab label="Rejected" {...a11yProps(2)}/>
    </Tabs>
    <TabPanel value={value} index={0}>  
    <MUIDataTable

      title={<><Box>
      <h3>Applicants Table</h3>
      </Box>
      </>}
      data={user}
      columns={columns}
      options={options}
      />
   
    </TabPanel>
    <TabPanel value={value} index={1}>  
    <MUIDataTable

        title={<><Box>
        <h3>Applicants Table</h3>
       
        </Box>
        </>}
        data={accepteduser}
        columns={columns2}
        options={options}
        />
    </TabPanel>
    <TabPanel value={value} index={2}>  
    <MUIDataTable

      title={<><Box>
      <h3>Applicants Table</h3>
      
      </Box>
      </>}
      data={rejecteduser}
      columns={columns2}
      options={options}
      />
    </TabPanel>
     
        <Button href='http://localhost:3000/hrPanel/jobs' sx={{"border":"0.5px solid gray"}}>Go Back</Button>
    </div>
 </>
  )
}

export default Applicants