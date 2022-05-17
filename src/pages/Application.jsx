import React from 'react'
import { Card,CardContent, Step, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import axios from 'axios'
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import jwt_decode from "jwt-decode";
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Stepper from '../components/Stepperr';
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";

function Application() {
    const Input = styled('input')({
        display: 'none',
      });
    
  return (
   <>
   <Navbar/>
   <div className="container" style={{marginTop:"3%"}}>
       <div className="middle" style={{width:"50%",boxShadow:" 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
       ,borderRadius: "1.125rem",
     padding: "2%",
}}>
       <h1 style={{marginBottom:"10%"}}>
                  Job Name:Jr Software Engineer
              </h1>
           <Stepper/>
          
       </div>
   </div>
   </>
  )
}

export default Application