import React from 'react'
import "../styles/Navbar.scss"
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { margin } from '@mui/system';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import jwt_decode from "jwt-decode";
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

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handle =()=>{
    handleClose();
    logout();
  }
  if(user){
    var token=localStorage.getItem("User");
    var decoded = jwt_decode(token);
  }
 
  return (
    <header className='header' sx={{margin:"0px"}}>
      <div className="logo">
        <Link to="/">HR Portal</Link>
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
           {decoded.userRole =="hr" ?  <li>
          <Link to="/hrPanel/home">Dashboard</Link>
        </li> : decoded.userRole=="admin" ? <li>
          <Link to="/adminPanel">Dashboard</Link>
        </li> : "" }
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
                <MenuItem component={Link} to='/profile' onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handle}> Logout</MenuItem>
              </Menu>
            </div>
          </>:
          <>
          <li>
          <Link to="/login">Log In</Link>
        </li>
        <li className='register'>
          <Link to="/register">Register</Link>
        </li>
            </>
}
      </ul>
    </header>
  )
}

export default Navbar