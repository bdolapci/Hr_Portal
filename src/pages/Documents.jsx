import React from 'react'
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import MUIDataTable from "mui-datatables";
import { Alert, Button } from '@mui/material';
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
          const [getSingleapplicant, setGetSingleapplicant] = React.useState("");

        const getApplicant =async()=>{
          try {
            const res=await axios.get(`https://localhost:44361/api/Home/Applicants`,)
            for(var i=0;i<res.data.length;i++){
              if(res.data[i].UserId==id){
                setGetSingleapplicant(res.data[i])
              }
            }
            
          } catch (error) {
            console.log(error)
          }
        }
        const [alertclosed, setAlertclosed] = React.useState(false);
          React.useEffect(()=>{
            getApplicant()
          },[])

          const isextraclose =async()=>{
            
            try {
              const res =await axios.put(`https://localhost:44361/api/Home/Extradocument/${getSingleapplicant.Id}`,{
                Id:getSingleapplicant.Id,  
                Jobsid:id,
                isExtraDocumentRequested:0
                },)
               setTimeout(()=>{
                  setAlertclosed(false)
                  window.location.reload(true)
               },2000)
               setAlertclosed(true)
              
            } catch (error) {
              console.log(error)
            }
          }
          
  return (
    <div style={{backgroundColor:"rgb(251, 251, 251)",minHeight:"100vh"}}>
      {JSON.parse(localStorage.getItem("User")) !== null ?decoded.userRole=="hr"  ? <>
      <Navbar />
        <SideBar />
        <div className='container'style={{margin:"auto",width:"80%",marginTop:"10rem"}} >
         {alertclosed?<Alert severity='success'>Document upload to applicant closed successfully</Alert>:""} 
          <Typography variant='h3' sx={{color:"rgb(25, 118, 210)"}}>
            Uploaded Files
          </Typography>
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
       {getSingleapplicant.isExtraDocumentRequested==0? <Button disabled  variant='contained' sx={{"border":"0.5px solid gray,",marginTop:"5%"}}>Close Extra Document Upload</Button>:
        <Button onClick={isextraclose} variant='contained' sx={{"border":"0.5px solid gray,",marginTop:"5%"}}>Close Extra Document Upload</Button>}
        <Button variant='contained' href='http://localhost:3000/hrPanel/jobs' sx={{"border":"0.5px solid gray,",marginTop:"5%",marginBottom:"5%"}}>Go Back</Button>
    </div>
      </>: <NotFound/>:<Unauthorized/>}
    </div>
  )
}

export default Documents