import React from 'react'
import "../styles/Navbar.scss"
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { margin } from '@mui/system';
function Navbar() {

  let user=JSON.parse(localStorage.getItem("User"));
  let Navigate = useNavigate();
  function logout(){
    localStorage.removeItem("User");
    Navigate("/");
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
          localStorage.getItem("User")?
          <>
           <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
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