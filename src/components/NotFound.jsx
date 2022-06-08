import React from 'react'
import { Button } from '@mui/material'

function NotFound() {
  return (
    <div style={{justifyContent:"center",textAlign:"center",paddingTop:"15rem"}}>
        <h1 style={{fontSize:"128px",color:"rgb(21, 101, 192)",letterSpacing:"20px",marginTop:"0"}}>404</h1>
        <h2 style={{fontSize:"64px",color:"rgb(21, 101, 192)",letterSpacing:"3px"}}> Not Found</h2>
        <h3>It seems like this Page does not exists.Please click on the below link to return to the main page.</h3>
        <Button href="/">Click here</Button>
    </div>
  )
}

export default NotFound