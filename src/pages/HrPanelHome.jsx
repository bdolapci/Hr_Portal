import React from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import jwt_decode from "jwt-decode";
import Unauthorized from '../components/Unauthorized';
import { Typography } from '@mui/material';
import axios from 'axios';
import {BarChart,CartesianGrid,XAxis,YAxis,Legend,Tooltip,Bar,PieChart,Pie,Cell} from 'recharts';
function HrPanelHome() {
  var token=localStorage.getItem("User");
  var decoded = jwt_decode(token);
  const [alljobs,setalljobs]=React.useState([]);
  const [totalJobs,setTotalJobs]=React.useState(0);
  const [totalap,setTotalap]=React.useState(0);
  const [totalApplicants,setTotalApplicants]=React.useState([]);
  const [countopen,setCountopen]=React.useState(0);
  const [countclose,setCountclose]=React.useState(0);
  const [mostapplied,setMostapplied]=React.useState(0);
  const [ratio,setRatio]=React.useState(0);
  const [mostappliedCategory,setMostappliedCategory]=React.useState(0);
  const [accpetedApplicants,setAccpetedApplicants]=React.useState(0);
  const [rejectedApplicants,setRejectedApplicants]=React.useState(0);
  let a=[]
  let b=[]
  let c=[]
  let d=[]
  let e=[]
  let f=[]
  let g=[]
  const getJobs =async()=>{
    try {
      const res =await axios.get("https://localhost:44361/api/Home/Jobs")
      const res2 =await axios.get("https://localhost:44361/api/Home/JobsApplicantJoin")
       
      for(var i=0;i<res.data.length;i++){
        if(res.data[i].UserId == decoded.id){
          a.push(res.data[i])
        }}
        for(var i=0;i<a.length;i++){
          for(var j=0;j<res2.data.length;j++){
            if(a[i].Id==res2.data[j].Jobsid){
                b.push(res2.data[j])
            }
          }
        } 
       
        setTotalap(b.length)
       setTotalJobs(a.length)
      setalljobs(res.data)
      setTotalApplicants(res2.data)
      const today = new Date()
      for(var i=0;i<a.length;i++){
        const newDate = new Date(a[i].Date)
        
        if (today.getTime() <newDate.getTime()) {
          c.push(a[i])
        }
        else{
          d.push(a[i])
        }
      }
      for(var i=0;i<b.length;i++){
        e.push(b[i].Jobsid)
      }
      e.sort()
      let max_count=1
      let ress=e[0];
      let curr_count = 1;
      for(let i=1;i<e.length;i++){
        if(e[i]==e[i-1]){
          curr_count++;
        }
        else{
          if(curr_count>max_count){
            max_count=curr_count;
            ress=e[i-1];
          }
          curr_count=1;
        }
      }
      for(var i=0;i<b.length;i++){
        if(b[i].Jobsid==ress){
          setMostapplied(b[i].Name)
          setMostappliedCategory(b[i].category)
        }
        if(b[i].isAccepted==1){
          f.push(b[i])
        }
        else{
          g.push(b[i])
        }
      }
      setAccpetedApplicants(f.length)
      setRejectedApplicants(g.length)
      setRatio(f.length/b.length)
      setCountopen(c.length)
      setCountclose(d.length)
    } catch (error) {
      console.log(error)
    }
  }

  
  React.useEffect(()=>{
    getJobs()
 
  },[])
  const data=[
    {name:'Jobs',"Total Jobs":totalJobs,"Open Jobs":countopen,"Closed Jobs":countclose},
  ]
  const data01=[
    {name:'Total Applicants',"value":totalap},
    {name:'Accepted Applicants',"value":accpetedApplicants},
    {name:'Rejected Applicants',"value":rejectedApplicants},
  ]
  

  return (
    <>
    {decoded.userRole=="hr" ?<>
    <Navbar/>
    <SideBar/>
    <div className="container" >
    <h1>Welcome to your Panel</h1>
    <div className="informations" style={{display:"flex",flexDirection:"row",marginTop:"10%"}}>
        
      <div className="leftpart" style={{width:"40rem"}}>
      <BarChart width={730} height={250} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Total Jobs" fill="#0088FE" />
      <Bar dataKey="Open Jobs" fill="#82ca9d" />
      <Bar dataKey="Closed Jobs" fill="#FFBB28" />
    </BarChart>
        <PieChart width={730} height={250}>
      <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8">
        <Cell key={`Total Applicants`} fill={"#0088FE"} />
        <Cell key={`Accepted Applicants`} fill={"#00C49F"} />
        <Cell key={`Rejected Applicants`} fill={"#FFBB28"} />
        </Pie> 
      <Tooltip />
    </PieChart>
       
        <Typography sx={{marginBottom:"2%",textAlign:"start",fontSize:"24px"}}>Most Applied Job: {mostapplied}</Typography>
        <Typography sx={{marginBottom:"2%",textAlign:"start",fontSize:"24px"}}>Most Applied Category: {mostappliedCategory}</Typography>
        <Typography sx={{marginBottom:"2%",textAlign:"start",fontSize:"24px"}}>Acceptance/Application Ratio for All opened Jobs: {ratio?ratio.toString().slice(0,4):""}</Typography>
      </div>
      <div className="rightpart" style={{width:"40rem"}}>
        <Typography>Chat Part</Typography>
      </div>
    </div>
    </div>
    </> :<Unauthorized/>}
    </>
  )
}

export default HrPanelHome