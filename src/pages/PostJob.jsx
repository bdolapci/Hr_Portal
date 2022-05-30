import React from 'react'
import { Card,CardContent, Typography } from '@mui/material'
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
import Unauthorized from '../components/Unauthorized';
import banner from "../pictures/banner.jpg"
function PostJob() {

  const nav = useNavigate();

    const [name,setName]=React.useState("")
const [description,setDescription]=React.useState('')
const [category,setCategory]=React.useState('')
const [photo,setPhoto]=React.useState('')
var token=localStorage.getItem("User");
var decoded = jwt_decode(token);
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
const [file,setFile]=React.useState();
const [fileName,setFileName]=React.useState();
const saveFile=(event)=>{
  setFile(event.target.files[0])
  setFileName(event.target.files[0].name)
}
const [alert1,setAlert1]=React.useState(false);

const nameoffile=name+"_"+decoded.id+"_"+fileName
const uploadFile =async (event)=>{
  
  const formData=new FormData();
  formData.append("formFile",file,nameoffile)
try {
const res=await axios.post("https://localhost:44361/api/Home/UploadFile",formData)
console.log(res);
setAlert1(true)
setTimeout(() => {
  setAlert1(false);
}, 4000); 

} catch (error) {
  setAlert1(false);
console.log(error)
}
}

const [value, setValue] = React.useState(null);
const postJob =async()=>{
  try {
    const res=await axios.post(
      "https://localhost:44361/api/Home/Jobs",
    {
      UserId:decoded.id,
      Name: `${name}`,
      Date: `${value}`,
      description: `${description}`,
      category: `${category}`,
      photo: `${nameoffile}`,
    })
    console.log(res)
    console.log(res.data)
    nav("/hrPanel/home")
  } catch (error) {
    console.log(error)
  }
}
const dat=new Date().toISOString()

  const Input = styled('input')({
    display: 'none',
  });
  return (
    <>
   {decoded.userRole =="hr" ? <>
   <Navbar/>
    <SideBar/>
     <section >
      <div className="formpart" 
      style={{border:"0px ",
      margin:"auto"
      ,width:"70%",
      borderRadius:"1.125rem",
      boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) ",
      padding:"3%"
      }}>
          <h1 style={{textAlign:"center"}}>Post Job</h1>
            <form  onSubmit={(e)=>{
              
              postJob()
              uploadFile()
              e.preventDefault()
              
            }}>
              <div className="contain" style={{display:"flex"}}>

            
                <div style={{justifyContent:'center',
                display:'flex',
                flexDirection:"column",
                alignItems:"center",
                textAlign:"center",
                width:"70%"}} >
                  <Typography>
                    Job Name
                  </Typography>
                <TextField 
               // multiline  
               variant="filled"
               sx={{ marginBottom:"2%",width:"40%"}}
               label="Name"
               multiline
               required
               placeholder="Name"
               onChange={NameHandler}
               ></TextField>
                <Box sx={{ marginTop:"0",marginBottom:"2%",width:"40%"}}>
                <Typography>
                    Job Deadline
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date"
                        value={value}
                        required
                        format="DD-MM-YYYY"
                        onChange={(newValue) => {
                          setValue(newValue);
                          console.log(newValue);
                        }}
                         disablePast={true}
                        renderInput={(params) => <TextField {...params} />}
                      />
                  </LocalizationProvider>
                </Box>
                
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
                    required
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
                  <div className="photoupload" style={{display:"flex",flexDirection:"row"}}>

                  <input style={{
                    display: "inline-block",
                    background:" linear-gradient(top, #f9f9f9, #e3e3e3)",
                    border: "1px solid #999",
                          borderRadius: "3px",
                          padding:" 5px 8px",
                          outline: "none",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                          textShadow: "1px 1px #fff",
                          fontWeight: "700",
                          fontSize: "10pt",
                        }} type="file" onChange={saveFile}/>
            </div>
                
                </div>
                <div style={{width:"30%"}} className="multi">
                <Typography>
                    Job Description
                  </Typography>
                <TextField 
                multiline 
             

                rows={10}
                variant="filled"sx={{ marginBottom:"2%",width:"90%"}}
                label="Description"
                placeholder="Description"
                onChange={descriptionHandler}
                ></TextField>
                </div>
                </div>
                <div style={{marginTop:"5%",justifyContent:"center",aligItems:"center",textAlign:"center"}}  className="postdiv">
               
                <Button type="submit">Post Job</Button>
                </div>
            </form>
                </div>
                
                </section>
   </> : <Unauthorized/>}

    </>
  )
}

export default PostJob