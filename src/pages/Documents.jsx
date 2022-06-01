import React from 'react'
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import MUIDataTable from "mui-datatables";
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axios from 'axios';
import jwt_decode  from 'jwt-decode';
import NotFound from '../components/NotFound';
import jsPDF from "jspdf";
import Unauthorized from '../components/Unauthorized';
function Documents() {
    let { id } = useParams();
    let { jobid } = useParams();
    if(JSON.parse(localStorage.getItem("User")) !== null){
      var token=localStorage.getItem("User");
      var decoded = jwt_decode(token);
     }
    const options = {
        filterType: 'checkbox',
        selectableRows: "none",
        print:false,
        viewColumns:false,
        download	:false,
        filter :false,
      };
      const [getFiles, setGetFiles] = React.useState([]);
      const fetchFile =async (event)=>{
    try {
      const res=await axios.get("https://localhost:44361/api/Home/GetFiles",{
          headers:{
                'Content-Type':'application/json',
                'Accept':'*/*',
          }
      })   
          setGetFiles(res.data)  
    } catch (error) {
       
      console.log(error)
    }
      }

      React.useEffect(()=>{
        
        fetchFile();
      },[])
   
      const downloadFile =async (name)=>{
        try {
          const res=await axios.get(`https://localhost:44361/api/Home/downloadFile/${name}`,{
            responseType: 'blob',
          })
          var fileDownload = require('js-file-download');
          fileDownload(res.data, name);
        } catch (error) {
           
          console.log(error)
        }
          }
          // const viewfile=async(name)=>{
          //   try {
          //     const res=await axios.get(`https://localhost:44361/api/Home/downloadFile/${name}`,{
          //       responseType: 'blob',
          //     })
          //     const readder = new FileReader();
          //    readder.onload = function(e) {
          //       var contents = e.target.result;
          //       var w = window.open();
          //       w.document.write(contents);
          //     };
          //     readder.readAsText(res.data);
          //     const text=await new Response(res.data).text();
          //     console.log(res.data,"")
          //     const doc = new jsPDF();
          //     doc.text(10,20,text,{ maxWidth:200 })
          //     doc.output('dataurlnewwindow');
        
          //   } catch (error) {
               
          //     console.log(error)
          //   }
          // }
          const [getJob,setGetJob]=React.useState('')
          const getsinglejob =async()=>{
            try {
              const res =await axios.get("https://localhost:44361/api/Home/Jobs/"+id)
              setGetJob(res.data)
            } catch (error) {
              console.log(error)
            }
          }
          React.useEffect(()=>{
            getsinglejob()
          },[])
          
  return (
    <div style={{backgroundColor:"rgb(248, 248, 248)",minHeight:"100vh"}}>
      {JSON.parse(localStorage.getItem("User")) !== null ?decoded.userRole=="hr"  ? <>
      <Navbar />
        <SideBar />
        <div className='container'style={{margin:"auto",width:"80%",marginTop:"10rem"}} >
          <h1>
            Uploaded Files
          </h1>
         <Box sx={{boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",borderRadius:"1.125rem",padding:"20px",backgroundColor:"white  "}}>
           {getFiles ? getFiles.map((item,index)=>{
            
              return(
                item.Name.split("_")[0]==id && item.Name.split("_")[1]==jobid ? 
                <Box >
              
                <Button onClick={()=>downloadFile(item.Name)}> <FileDownloadIcon></FileDownloadIcon>{item.Name}</Button>
                {/* <Button onClick={()=>viewfile(item.Name)}> <RemoveRedEyeIcon></RemoveRedEyeIcon>{item.Name}</Button> */}
                </Box>:""
              )
            })
           :""}
         </Box>
        <Button variant='contained' href='http://localhost:3000/hrPanel/jobs' sx={{"border":"0.5px solid gray,",marginTop:"5%"}}>Go Back</Button>
    </div>
      </>: <NotFound/>:<Unauthorized/>}
    </div>
  )
}

export default Documents