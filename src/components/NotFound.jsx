import React from 'react'
import { Button } from '@mui/material'

function NotFound() {
  return (
    <div style={{justifyContent:"center",textAlign:"center",marginTop:"13%"}}>
        <h1 style={{fontSize:"128px"}}>404</h1>
        <h2 style={{fontSize:"64px"}}> Not Found</h2>
        <h3>It seems like this Page does not exists.Please click on the below link to return to the main page.</h3>
        <Button href="/">Click here</Button>
    </div>
  )
}

export default NotFound