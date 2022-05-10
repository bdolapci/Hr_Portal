import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Card,CardContent, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import axios from 'axios'
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jwt_decode  from 'jwt-decode';
import { useEffect } from 'react';


function EditJob() {
    const { id } = useParams();
    const nav = useNavigate();
    var token=localStorage.getItem("User");
    var decoded = jwt_decode(token);
    const [name,setName]=React.useState("")
    const [description,setDescription]=React.useState('')
    const [category,setCategory]=React.useState('')
    const [photo,setPhoto]=React.useState('')
    const [date,setDate]=React.useState(null)
    const [getJob,setGetJob]=React.useState('')
    function NameHandler(e){
        setName(e.target.value);
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
        function dateHandler(e){
        setDate(e.target.value);
        }

    const editJobName =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobName`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            Name: `${name}`,
          })
          console.log(res)
          console.log(res.data)
          nav("/hrPanel/jobs")
        } catch (error) {
          console.log(error)
        }
      }
      const editJobDate =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobDate`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            Date: `${date}`,
          })
          console.log(res)
          console.log(res.data)
          nav("/hrPanel/jobs")
        } catch (error) {
          console.log(error)
        }
      }
      const editJobDescription =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobDesciption`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            description: `${description}`,
          })
          console.log(res)
          console.log(res.data)
          nav("/hrPanel/jobs")
        } catch (error) {
          console.log(error)
        }
      }
      const editJobCategory =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobCategory`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            category: `${category}`,
          })
          console.log(res)
          console.log(res.data)
          nav("/hrPanel/jobs")
        } catch (error) {
          console.log(error)
        }
      }
      const editJobPhoto =async()=>{
        try {
          const res=await axios.post(
            `https://localhost:44361/api/Home/Jobs/EditJobPhoto`,
          {
            Id: `${id}`,
            UserId:decoded.id,
            photo: `${photo}`,
          })
          console.log(res)
          console.log(res.data)
          nav("/hrPanel/jobs")
        } catch (error) {
          console.log(error)
        }
      }



      const Input = styled('input')({
        display: 'none',
      });


  return (
   <>
   <Navbar/>
   <SideBar/>
   <section >
      <div className="formpart" 
      style={{border:"0px ",
      margin:"auto"
      ,width:"70%",
      borderRadius:"1.125rem",
      boxShadow: "rgb(0 0 0 / 8%) -8px -8px",
      }}>
            <form onSubmit={(e)=>{
              if(name!=''){
                editJobName()
              } 
              if(date!=null){
                editJobDate()
              } 
              if(description!=''){
              editJobDescription()
              } 
              if(category!=''){
                editJobCategory()
              }
              if (photo!=''){
                editJobPhoto()
              }
              
              e.preventDefault()
              
            }}>
                <Box sx={{justifyContent:'center',
                display:'flex',
                flexDirection:"column",
                alignItems:"center",
                textAlign:"center"}} >
                  <Typography>
                    Job Name
                  </Typography>
                <TextField 
               // multiline 
               variant="filled"
               sx={{ marginBottom:"2%",width:"20%"}}
               label="Name"
               multiline
               placeholder={getJob}
                onChange={NameHandler}
               ></TextField>
                <Box sx={{ marginTop:"0",marginBottom:"2%",width:"20%"}}>
                <Typography>
                    Job Deadline
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Basic example"
                         value={date}
                        format="DD-MM-YYYY"
                       disablePast
                        onChange={(newValue) => {
                          setDate(newValue);
                          console.log(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                  </LocalizationProvider>
                </Box>
                <Typography>
                    Job Description
                  </Typography>
                <TextField 
                multiline 
                variant="filled"sx={{ marginBottom:"2%",width:"20%"}}
                label="Description"
                placeholder="Description"
                 onChange={descriptionHandler}
                ></TextField>
                <Box sx={{width:"100%","marginBottom":"2%",marginTop:"0"}}>
                <Typography>
                    Chose the Category
                  </Typography>
                <FormControl sx={{width:"20%"}}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                 <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{color:"black"}}
                    value={category}
                    label="Category"
                    onChange={categoryHandler}
                    >
                    <MenuItem value={"Software"}>Software</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                    </FormControl>
                      </Box>
                      <Typography>
                    Pick a photo
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="contained-button-file">
                    <Input onChange={photoHandler} accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                </Stack>
                <Button type="submit">Post Job</Button>
                </Box>
                
            </form>
                </div>
                </section>
   </>
    
  )
}

export default EditJob