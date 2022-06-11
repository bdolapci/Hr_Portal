import React from 'react'
import "../styles/Navbar.scss"
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { margin } from '@mui/system';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Typography } from '@mui/material';
function Navbar() {

  
  let user=JSON.parse(localStorage.getItem("User"));
  let Navigate = useNavigate();
  function logout(){
    localStorage.removeItem("User");
    Navigate("/");
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  if(JSON.parse(localStorage.getItem("User")) !== null){
    try {
      var token=localStorage.getItem("User");
      var decoded = jwt_decode(token);
      
    } catch (error) {
      console.log(error)
    }
    }
   const [profiledata,setProfiledata]=React.useState([]);
    React.useEffect(()=>{
      axios.get("https://localhost:44361/api/Home/Profile",{
      }).then((res)=>{
        let a=[]
        let b = res.data.map((x=>x.Id))
        for(let i=0;i<res.data.length;i++){
         if(user){
          if(res.data[i].Userid==decoded.id){
            a.push(b[i])
          }
         }
        }
        setProfiledata(a);
      })
     
     
  },[]);

 
  
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handle =()=>{
    handleClose();
    logout();
  }

  const handleProfile = () =>{
    Navigate(`/profile/${profiledata}`);
  }
  return (
    <header className='header' sx={{margin:"0px"}}>
      <div className="logo">
        <Link to="/">
        <Typography variant='h6' sx={{color:"rgb(25, 118, 210)"}}>HR Portal</Typography>
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/jobs">Jobs</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
       
        {
          localStorage.getItem("User") ?
          <>
           {decoded ? decoded.userRole =="hr" ?  <li>
          <Link to="/hrPanel/home">Dashboard</Link>
        </li> : decoded.userRole=="admin" ? <li>
          <Link to="/adminPanel">Dashboard</Link>
        </li> : "" :""}
           <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem  onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handle}> Logout</MenuItem>
              </Menu>
            </div>
          </>:
          <>
          <li>
          <Link to="/login">Log In</Link>
        </li>
        
          <Button sx={{color:"white !important"}} variant='contained' href="/register">Register</Button>
      
            </>
}
      </ul>
    </header>
  )
}

export default Navbar