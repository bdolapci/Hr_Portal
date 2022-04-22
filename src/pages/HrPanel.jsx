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
import PostJob from '../components/PostJob';
function HrPanel() {

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
  const[user,setUser]=React.useState(null);
  const[job,setJob]=React.useState(null);

  useEffect(()=>{
      axios.get("http://localhost:46836/api/Home",{
      }).then((res)=>{
        let a = res.data.map((x=>x.isApplicant))
        let isapp=[]
        console.log(a)
        for(let i=0;i<res.data.length;i++){
          if(a[i]===true){
            isapp.push(res.data[i])
          }
        }
          setUser(isapp);
      })
  },[]);

  useEffect(()=>{
    axios.get("http://localhost:46836/api/Home/Jobs",{
    }).then((res)=>{
        console.table(res.data);
        setJob(res.data);     
    })
},[]);




  return (
      <>
    <Navbar/>
    <Tabs className='Tabs' value={value} onChange={handleChange} centered>
    <Tab  label="Applicants" {...a11yProps(0)}/>
    <Tab label="Post Jobs" {...a11yProps(1)}/>
    <Tab label="Edit Jobs" {...a11yProps(2)}/>
    </Tabs>
    <TabPanel value={value} index={0}> 
    <TextField
          id="filled-search"
          label="Search Applicant"
          type="search"
          variant="filled"
          sx={{ "width": "80%" }}
        />
        <Box>
        <div>{user ? <OneUser user={user}/> : ""}</div>
        </Box>
    </TabPanel>
    <TabPanel value={value} index={1}>
      <PostJob></PostJob>
    <TextField
          id="filled-search"
          label="Search Jobs"
          type="search"
          variant="filled"
          sx={{ "width": "80%" }}
          
        />
        <Box>
        <div>{job ? <OneJob job={job}/> : ""}</div>
        </Box>
        </TabPanel>
    <TabPanel value={value} index={2}>
    <TextField
          id="filled-search"
          label="Search Jobs"
          type="search"
          variant="filled"
          sx={{ "width": "80%" }}
        />
        <Box>
        <div>{job ? <OneJob  job={job} /> : ""}</div>
        </Box>
        </TabPanel>
    
   
    </>
    
  )
}

export default HrPanel