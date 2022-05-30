import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
function Home() {


  return (
   <>
     <CssBaseline />
 <Navbar/>
  


   <Footer/>
   </>
  )
}

export default Home