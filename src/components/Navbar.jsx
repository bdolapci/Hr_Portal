import React from 'react'
import "../styles/Navbar.scss"
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <header className='header'>
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
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li className='register'>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </header>
  )
}

export default Navbar