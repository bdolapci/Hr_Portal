import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, ButtonGroup, makeStyles } from '@mui/material';
import Box from '@mui/material/Box';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

function OneUser ({user}) {  
    const [alertdelete,setAlertDelete]=useState(false);
    const removeUser = async (Id) => {
    try {
      const res = await axios.delete(`${"https://localhost:44361/api/Home"}`,{
          headers:{
              id:Id
          }
      })
      console.log(res.data)
      window.location.reload(false);
      setAlertDelete(true);
    } catch (error) {
      alert(error)
    }
  }

  const makeHR =async (Id)=>{
      try {
          const res=await axios.post(`${"https://localhost:44361/api/Home/HR"}`,{
                    id:Id,
                    userRole: "hr",            
          })
          console.log(res.data)
          window.location.reload(false);
      } catch (error) {
          alert(error)
      }
  }

  const makeUser =async (Id)=>{
    try {
        const res=await axios.post(`${"https://localhost:44361/api/Home/HR"}`,{           
                id:Id,
                userRole: "user",           
        })
        console.log(res.data)
        window.location.reload(false);
    } catch (error) {
        alert(error)
    }
}

  return (
   <>
        {alertdelete ? <Alert severity="success">User Successfully Deleted</Alert> :  ""}
        {user.map((user)=>(
            
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
            key={user}>{user.firstName} {user.lastName}</h3>
                    </Box>
            <Box>
            <Typography sx={{
                textAlign: 'left',
            }}>               
                Email
            </Typography>
            <h3 key={user}>{user.email}</h3>
            </Box>
            
                </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
    
            <CardActions>
                {/* {user.isApplicant ? <ButtonGroup>
                    <Button type='submit' sx={{"border":"0.5px solid gray"}}  >See Uploaded Documents</Button>
                    <Button type='submit' sx={{"border":"0.5px solid gray"}} >See Profile</Button>
                    <Button type='submit' sx={{"border":"0.5px solid gray"}} >Accept Applicant</Button>
                    <Button type='submit' sx={{"border":"0.5px solid gray"}} >Reject Applicant</Button>
                </ButtonGroup>: */}
                <ButtonGroup>
                <Button onClick={() => removeUser(user.Id)} type='submit' sx={{"border":"0.5px solid gray"}}>Delete Account</Button>
                {user.userRole==="hr" ?<Button onClick={() => makeUser(user.Id)} type='submit' sx={{"border":"0.5px solid gray"}}>Make User</Button>:
                <Button onClick={()=>makeHR(user.Id)} sx={{"border":"0.5px solid gray"}}>Make HR</Button>}

                </ButtonGroup>
               
               
                  
            </CardActions>
                    </Box>
                </CardContent>
                
        </Card>
        ))
        
    }
 
    </>

  )
}

export default OneUser