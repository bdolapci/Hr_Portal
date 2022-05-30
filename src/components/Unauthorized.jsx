import { Button } from '@mui/material'
import { letterSpacing } from '@mui/system'
import React from 'react'

function Unauthorized() {
  return (
    <div style={{justifyContent:"center",textAlign:"center",marginTop:"13%"}}>
        <h1 style={{fontSize:"128px",color:"rgb(21, 101, 192)",letterSpacing:"20px"}}>403 </h1>
        <h2 style={{fontSize:"64px",color:"rgb(21, 101, 192)",letterSpacing:"3px"}}>Forbidden </h2>
        <h3>You are trying to access a page that you do not have access to. Please click on the below link to return to the main page.</h3>
        <Button href="/" variant='outlined'>Click here</Button>
    </div>
   
  )
}

export default Unauthorized