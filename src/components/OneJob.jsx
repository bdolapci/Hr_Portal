import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material';
import Box from '@mui/material/Box';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

function OneJob({job}) {  
 
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
            key={job}>{job.Date}</h3>
            </Box>
            
                </Box>
          <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
          }}>
  
          <CardActions>
              <Button onClick={() => removeJob(job.Id)} type='submit' sx={{"border":"0.5px solid gray"}}>Delete Job</Button>
                
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