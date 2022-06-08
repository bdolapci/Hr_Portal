import React from 'react'
import Navbar  from '../components/Navbar';
import  Sidebar  from '../components/SideBar';
import '../styles/Applicants.scss'
import { Alert, TextField } from '@mui/material';
import { Box } from '@mui/material';
import OneUser from '../components/OneUser';
import { useEffect } from 'react';
import axios from 'axios';
import OneApplicant from '../components/OneApplicant';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import MUIDataTable from "mui-datatables";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import Cancel from '@mui/icons-material/Cancel';
import { useParams } from "react-router-dom";
import Unauthorized from '../components/Unauthorized';
import jwt_decode  from 'jwt-decode';
import NotFound from '../components/NotFound';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Modal from '@mui/material/Modal';
function Applicants() {
  if(JSON.parse(localStorage.getItem("User")) !== null){
    var token=localStorage.getItem("User");
    var decoded = jwt_decode(token);
   }
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{width:'100%'}}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  
  let { id } = useParams();

  
  const[user,setUser]=React.useState([]);

  const[accepteduser,setAcceptedUser]=React.useState([]);
  const[rejecteduser,setRejectedUser]=React.useState([]);


  const combined =async()=>{
     axios.get(`https://localhost:44361/api/Home/UserApplicantJoin`,{
    }).then((res)=>{
      let k=[]
      let l=[]
      let m=[]
      let s=[]
      for(let i=0;i<res.data.length;i++){
        if(res.data[i].Jobsid==id){
          if(res.data[i].isAccepted=="0"){
            k.push(res.data[i])
          }
          else if(res.data[i].isAccepted=="1"){
            l.push(res.data[i])
          }
          else{
            m.push(res.data[i])
          }
        }
      }
      setUser(k)
      setAcceptedUser(l)
      setRejectedUser(m)
    })
  }  
  const [job,setJob]=React.useState([]);
  useEffect(()=>{
    axios.get("https://localhost:44361/api/Home/Jobs",{
    }).then((res)=>{ 
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].Id==id){
            setJob(res.data[i])
          }
        }
      
    })

 
},[]);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const [open3, setOpen3] = React.useState(false);

const handleOpen3 = () => setOpen3(true);
const handleClose3 = () => setOpen3(false);

  useEffect(()=>{
    combined();
 
  },[]);

  const [message,setMessage]=React.useState("");
  
 
  const acceptuser=async(Id)=>{
   
    let x;
    for(let i=0;i<user.length;i++){
      if(user && user[i].Id==Id){
         x=user[i].email
      }
    }
   try {  
     const res =await axios.put(`https://localhost:44361/api/Home/AcceptApplicants/${Id}`,{
      Id:Id,
      Jobsid:id,
      isAccepted:1
     },)

    const res2 = await axios.post(`https://localhost:44361/api/Home/SendSuccess`,
    {
     ToEmail:`${x}`,
      Subject:"Information about our application",
      Body:"We are happy to inform you that you have been accepted to the job"+job.Name+"\n" +"Hr for the Job will contact you soon"+"\n"+"\n"+"This mail is automatic Please do not respond to this mail"
    })
    window.location.reload(true);
     
   } catch (error) {
     console.log(error)
   }
  }
  const rejectuser=async(Id)=>{
    let y;
    for(let i=0;i<user.length;i++){
      if(user && user[i].Id==Id){
      y=user[i].email
      }
    }
    try {
      const res =await axios.put(`https://localhost:44361/api/Home/AcceptApplicants/${Id}`,{
      Id:Id,  
      Jobsid:id,
      isAccepted:2
      },)
     
      const res2 =await axios.post(`https://localhost:44361/api/Home/SendSuccess`,
      {
        ToEmail:`${y}`,
        Subject:"Information about our application",
        Body:"We regret to inform you that you have not been selected for the job:"+job.Name+"\n" +" We wish you successfull carreer"+"\n"+"\n"+"This mail is automatic Please do not respond to this mail"
      })
      window.location.reload(true);
    
    } catch (error) {
      console.log(error)
    }
   }
    const [extradocreqalert,setExtradocreqAlert]=React.useState(false);
   
   const requestExtraDocumentMail = async(Id)=>{
    
    let f;
     for(let i=0;i<accepteduser.length;i++){
      if(accepteduser[i].Id==Id){
       f=accepteduser[i].email
      }
    }
   
     try {
      const res =await axios.put(`https://localhost:44361/api/Home/Extradocument/${Id}`,{
        Id:Id,  
        Jobsid:id,
        isExtraDocumentRequested:1
        },)
      const res2 =await axios.post(`https://localhost:44361/api/Home/SendSuccess`,
      {
        ToEmail:`${f}`,
        Subject:"Extra Documents Requested for job "+job.Name,
        Body:message,
      })
      setTimeout(()=>{
        setExtradocreqAlert(false)
        window.location.reload(true);
      },3000)
        setExtradocreqAlert(true)
     } catch (error) {
       console.log(error)
     }
   }
 

  const [value, setValue] = React.useState(0);
  
  const handleChange= (event, newValue) => {
      setValue(newValue);
  }

  const columns = [
    {
      name:"firstName",
      label:"First Name",
    },
    {
      name:"lastName",
      label:"Last Name",
    },
    {
      name:"email",
      label:"Email",
    },
    {
      name: "UserId",
      label:"Display Profile",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          let a="/profile/"+value;
          return (
            <>
            <Button href={a}><RemoveRedEyeIcon/></Button>
            </>
          );
        }
      }
    },
    {
      name: "UserId",
      label: "Display Documents",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          let a="/hrPanel/applicants/"+id+"/documents/"+value
          
          return (
            <>
            <Button href={a}><RemoveRedEyeIcon/></Button>
            </>
          );
        }
      }
    },
    {
      name: "Id",
      label: "Accept/Reject Applicants",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
         
          return (
            <>
            <Button onClick={()=>acceptuser(value)} ><DoneIcon/></Button>
            <Button onClick={()=>rejectuser(value)}><CancelIcon/></Button>
        
            </>
          );
        }
      }
    },
  ]
  const columns2 = [
    {
      name:"firstName",
      label:"First Name",
    },
    {
      name:"lastName",
      label:"Last Name",
    },
    {
      name:"email",
      label:"Email",
    },
    {
      name: "ProfileId",
      label:"Display Profile",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          let a="/profile"+"/"+value
          return (
            <>
            <Button href={a}><RemoveRedEyeIcon/></Button>
            </>
          );
        }
      }
    },
    {
      name: "UserId",
      label: "Display Documents",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          let a="/hrPanel/applicants/"+id+"/documents/"+value
          return (
            <>
            <Button href={a}><RemoveRedEyeIcon/></Button>
            </>
          );
        }
      }
    },
  ]
  const columns3 = [
    {
      name:"firstName",
      label:"First Name",
    },
    {
      name:"lastName",
      label:"Last Name",
    },
    {
      name:"email",
      label:"Email",
    },
    {
      name: "ProfileId",
      label:"Display Profile",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          let a="/profile"+"/"+value
          return (
            <>
            <Button href={a}><RemoveRedEyeIcon/></Button>
            </>
          );
        }
      }
    },
    {
      name: "UserId",
      label: "Display Documents",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          let a="/hrPanel/applicants/"+id+"/documents/"+value
          return (
            <>
            <Button href={a}><RemoveRedEyeIcon/></Button>
            </>
          );
        }
      }
    },
    {
      name: "Id",
      label: "Request Extra Documents",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
         
          return (
            <>
            <Button variant='contained' onClick={ handleOpen3}>Create Mail</Button>
            {message=="" ?
             <Button disabled sx={{marginLeft:"1rem"}} variant='contained' onClick={()=>{requestExtraDocumentMail(value)}} >Send Mail(Closed)</Button>
            : <Button sx={{marginLeft:"1rem"}} variant='contained' onClick={()=>{requestExtraDocumentMail(value)}} >Send Mail</Button>}
           
        
            </>
          );
        }
      }
    },
  ]

  const options = {
    filterType: 'checkbox',
    selectableRows: "none",
    print:false,
    viewColumns:false,
    download	:false,
    filter :false,
  };

  return (
 <div style={{backgroundColor:"rgb(248, 248, 248)",minHeight:"100vh"}} >
    {JSON.parse(localStorage.getItem("User")) !== null ?decoded.userRole =="hr" ? <>
    <Navbar/>
    <Sidebar/>
    <div className='container'style={{margin:"auto",width:"80%"}} >
    <Tabs className='Tabs' value={value} onChange={handleChange} centered>
    <Tab  label="Open Applications" {...a11yProps(0)}/>
    <Tab label="Accepted" {...a11yProps(1)}/>
    <Tab label="Rejected" {...a11yProps(2)}/>
    </Tabs>
    {extradocreqalert ? <Alert severity="success">Mail Sended Reloading Page in 3s</Alert> :""}
    <TabPanel value={value} index={0}>  

    <MUIDataTable

      title={<><Box>
      <h3>Applicants Table</h3>
      </Box>
      </>}
      data={user}
      columns={columns}
      options={options}
      />
   
    </TabPanel>
    <TabPanel value={value} index={1}>  
    <MUIDataTable

        title={<><Box>
        <h3>Applicants Table</h3>
       
        </Box>
        </>}
        data={accepteduser}
        columns={columns3}
        options={options}
        />
    </TabPanel>
    <TabPanel value={value} index={2}>  
    <MUIDataTable

      title={<><Box>
      <h3>Applicants Table</h3>
      
      </Box>
      </>}
      data={rejecteduser}
      columns={columns2}
      options={options}
      />
    </TabPanel>
    <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:"5%"}}>
            Request Extra Documents from Applicant
          </Typography>
          <TextField 
          id="outlined-basic"
          multiline
          rows={8}
          placeholder="message"
          label="Write your message here"
          onChange={(e)=>setMessage(e.target.value)}
          value={message}
          key="very_unique_key"
          
          />
       
        </Box>
      </Modal>
     
        <Button href='http://localhost:3000/hrPanel/jobs' sx={{"border":"0.5px solid gray"}}>Go Back</Button>
    </div>
    </>:<NotFound/> :<Unauthorized/>}
 </div>
  )
}

export default Applicants