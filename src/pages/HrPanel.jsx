import React from 'react'
import Navbar from "../components/Navbar";
import OneUser from '../components/OneUser';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../styles/AdminPanel.scss";
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import OneJob from '../components/OneJob';
import { Card,CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Applicants from './Applicants';
function HrPanel() {

  const [value, setValue] = React.useState(0);
  
  const handleChange= (event, newValue) => {
      setValue(newValue);
  }
  const[user,setUser]=React.useState(null);
  const[job,setJob]=React.useState(null);

  useEffect(()=>{
      axios.get("https://localhost:44361/api/Home",{
      }).then((res)=>{
        let a = res.data.map((x=>x.isApplicant))
        let isapp=[]
        for(let i=0;i<res.data.length;i++){
          if(a[i]===true){
            isapp.push(res.data[i])
          }
        }
          setUser(isapp);
      })
  },[]);

  useEffect(()=>{
    axios.get("https://localhost:44361/api/Home/Jobs",{
    }).then((res)=>{
        console.table(res.data);
        setJob(res.data);     
    })
},[]);

const nav = useNavigate();

const [name,setName]=React.useState("")
const [date,setDate]=React.useState('')
const [description,setDescription]=React.useState('')
const [category,setCategory]=React.useState('')
const [photo,setPhoto]=React.useState('')

function NameHandler(e){
setName(e.target.value);
}
function DateHandler(e){
setDate(e.target.value);
}
function descriptionHandler(e){
setDescription(e.target.value);
}
function categoryHandler(e){
setCategory(e.target.value);
}
function photoHandler(e){
setPhoto(e.target.value);
}

const postJob =async()=>{
try {
const res=await axios.post(
  "https://localhost:44361/api/Home/Jobs",
{
  Name: `${name}`,

  description: `${description}`,
  category: `${category}`,
  photo: `${photo}`,
})
console.log(res)
console.log(res.data)
window.location.reload()
} catch (error) {
console.log(error)
}
}

  return (
      <>
    <Navbar/>
   <Sidebar/>
    </>
    
  )
}

export default HrPanel