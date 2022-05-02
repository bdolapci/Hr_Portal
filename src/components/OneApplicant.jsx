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
import { CssBaseline } from '@mui/material';
function OneApplicant ({user}) {  
    const [alertdelete,setAlertDelete]=useState(false);






  return (
   <>
    <CssBaseline />
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
            key={user}>{ } {user.firstName} {user.lastName} {console.log()}</h3>
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
                <Button  href="/profile"  sx={{"border":"0.5px solid gray"}}>Display Profle</Button>
                <Button  sx={{"border":"0.5px solid gray"}}>Display Documents</Button>
                {user ? 
                <>
                <Button style={{ backgroundColor: "rgb(30 173 37)",color:"white" }} sx={{"border":"0.5px solid gray"}}>Accept Applicant</Button>
              
                <Button style={{ backgroundColor: '#e42424',color:"white" }} sx={{"border":"0.5px solid gray"}}>Reject Applicant</Button>   </>: ""}

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

export default OneApplicant