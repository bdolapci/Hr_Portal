import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonGroup, makeStyles } from '@mui/material';
import Box from '@mui/material/Box';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

import { Link, useNavigate } from "react-router-dom";
function OneJob({job}) {  
    const [jobState,setJobState]=useState();

    const navigate = useNavigate();

 
  const removeJob = async (Id) => {
  try {
    const res = await axios.delete(`${"https://localhost:44361/api/Home/Jobs"}`,{
        headers:{
            id:Id
        }
    })
    console.log(res.data)
    window.location.reload(false);
  } catch (error) {
    alert(error)
  }
} 

useEffect(()=>{
    axios.get("https://localhost:44361/api/Home/Jobs",{
    }).then((res)=>{
        let dt =res.data.map(x=>x.Date);
        let k=[]
        for(let i=0;i<dt.length;i++){
            k.push(dt[i])
            k[i]=k[i].slice(0,10)
        }
        console.log(k);
        setJobState(k);    
        
    })
},[]);

const current =new Date()
const date =`${current.getFullYear()}-0${current.getMonth()+1}-${current.getDate()}`; 
return (
 <>
      {job.map((job)=>(
          <Card sx={{marginBottom:"3%"}}>
          <CardContent sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
          }}>
             <Box sx={{marginLeft:"5%",display:'flex'}}>
                    <Box sx={{marginRight:"20%"}}> 
                    <Typography sx={{
                textAlign: 'left',
            }}>               
                Name 
            </Typography>
            <h3 
            style={{"width":"10rem","textAlign":"left"}}
            key={job}>{job.Name} </h3>
                    </Box>
            <Box>
            <Typography sx={{
                textAlign: 'left',
            }}>               
                Date
            </Typography>
            <h3
             style={{"width":"12rem","textAlign":"left"}}
            key={job}>{job.Date.split("T")[0]}
            </h3>
            </Box>
            
                </Box>
          <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
          }}>
  
          <CardActions>
          {(job.Date.split("T")[0].split("-")[0]>date.split("-")[0]) ||
              (job.Date.split("T")[0].split("-")[0]===date.split("-")[0] && job.Date.split("T")[0].split("-")[1]>date.split("-")[1] ) ||
              (job.Date.split("T")[0].split("-")[0]===date.split("-")[0] && job.Date.split("T")[0].split("-")[1]===date.split("-")[1] 
              &&job.Date.split("T")[0].split("-")[2]>date.split("-")[2])
              ? 
              <ButtonGroup>
                <Button href='/hrPanel/jobs/EditJob'  sx={{"border":"0.5px solid gray"}} >Edit Job</Button>
                <Button href="/hrPanel/applicants" type='submit' sx={{"border":"0.5px solid gray"}}>
             Display Applicants
                </Button>
              </ButtonGroup>            
              :           
              <Button disabled sx={{"border":"0.5px solid gray"}} >Edit Job</Button>
              }                    
          </CardActions>
                  </Box>
              </CardContent>
              
      </Card>
      ))
      
  }

  </>

)
}

export default OneJob