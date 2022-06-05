import React from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import jwt_decode from "jwt-decode";
import Unauthorized from '../components/Unauthorized';
import { Typography } from '@mui/material';
import axios from 'axios';
import {AreaChart, Area,LineChart,Line,BarChart,CartesianGrid,XAxis,YAxis,Legend,Tooltip,Bar,PieChart,Pie,Cell} from 'recharts';
import Box from '@mui/material/Box';
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
  const [waitingapplicants,setWaitingapplicants]=React.useState(0);
  const [last5jobs,setLast5jobs]=React.useState([]);
  const [last5applicants,setLast5applicants]=React.useState([]);
  let a=[]
  let b=[]
  let c=[]
  let d=[]
  let e=[]
  let f=[]
  let g=[]
  let h=[]
  let s=[]
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
          s.push(a[i])
        }
        
        
      }
      for(var i=0;i<b.length;i++){
        e.push(b[i].Jobsid)
      }
      s.sort(function(a, b){
        var l=new Date(a.Date)
        var m=new Date(b.Date)
        return l-m
      }).reverse()
     
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
        else if(b[i].isAccepted==2){
          g.push(b[i])
        }
        else{
          h.push(b[i])
        }
         
        
      }
      let appnumber=[0,0,0,0,0]

      for(var i=0;i<b.length;i++){
        if(s[0] &&s[0].Id==(b[i].Jobsid)){ 
          appnumber[0]++
        }
        else if(s[1] &&s[1].Id==(b[i].Jobsid)){
          appnumber[1]++
        }
        else if(s[2] &&s[2].Id==(b[i].Jobsid)){
          appnumber[2]++
        }
        else if(s[3] &&s[3].Id==(b[i].Jobsid)){
          appnumber[3]++
        }
        else if(s[4] &&s[4].Id==(b[i].Jobsid)){
          appnumber[4]++
        }
        else{
          continue;
        }
      }
     

      setLast5applicants(appnumber)
      
    
      setLast5jobs(s)
      setWaitingapplicants(h.length)
      setAccpetedApplicants(f.length)
      setRejectedApplicants(g.length)
      setRatio(f.length/b.length)
      setCountopen(c.length)
      setCountclose(d.length)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(last5applicants,last5jobs,"")
  React.useEffect(()=>{
    getJobs()
 
  },[])

  const data=[
    {name:'Jobs',"Total Jobs":totalJobs,"Open Jobs":countopen,"Closed Jobs":countclose},
  ]
  const data01=[
    {name:'Total Applicants',"value":totalap==0 },
    {name:'Accepted Applicants',"value":accpetedApplicants},
    {name:'Rejected Applicants',"value":rejectedApplicants},
    {name:'Waiting Applicants',"value":waitingapplicants},
  ]
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const data4=[
    {name:"Last Closed",value:last5applicants[0]},
    {name:"Fourth Closed",value:last5applicants[1]},
    {name:"Third Closed",value:last5applicants[2]},
    {name:"Second Closed",value:last5applicants[3]},
    {name:"First Closed",value:last5applicants[4]},
  ]

  return (
    <>
    {decoded.userRole=="hr" ?<>
    <Navbar/>
    <SideBar/>
    <div className="container" >
    <h1 style={{color:"rgb(25, 118, 210)"}}>Welcome to your Panel</h1>
    <div className="informations" style={{display:"flex",flexDirection:"row"}}>
   
      <div className="leftpart" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <Box sx={{boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",borderRadius:"1.125rem"}}>
        <Typography>Number of applicants for the last 5 closed jobs</Typography>
      
        <AreaChart
          width={1200}
          height={400}
          data={data4}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      
      </Box>
     <Box sx={{display:"flex",flexDirection:"row",marginBottom:"4%"}}>
       <Box  sx={{boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",borderRadius:"1.125rem"}}>
       <Typography>Total Jobs Bar </Typography>
     <BarChart width={730} height={250} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Total Jobs" fill="#0088FE" />
      <Bar dataKey="Open Jobs" fill="#82ca9d" />
      <Bar dataKey="Closed Jobs" fill="#FFBB28" />
    </BarChart>
       </Box>
      <Box sx={{boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",borderRadius:"1.125rem",marginLeft:"2%"}}>
      <Typography>Total Applicants Chart </Typography>
      <div className="conpie" style={{display:"flex",justifyContent:"center"}}>
      <PieChart width={530} height={250}>
      <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" labelLine={false}
            label={renderCustomizedLabel}>
        <Cell key={`Total Applicants`} fill={"#0088FE"} />
        <Cell key={`Accepted Applicants`} fill={"#00C49F"} />
        <Cell key={`Rejected Applicants`} fill={"#FFBB28"} />
        <Cell key={`Waiting Applicants`} fill={"#FF8042"} />
        </Pie> 
      <Tooltip />
    </PieChart> 
    </div>
      </Box>
     </Box>
        
    {/* {/* <LineChart
          width={500}
          height={300}
          data={data3}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        > 
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        
        </LineChart> */}
        <Typography sx={{marginBottom:"2%",textAlign:"start",fontSize:"24px",color:""}}>Most Applied Job: <span style={{color:"rgb(25, 118, 210)"}}>{mostapplied}</span></Typography>
        <Typography sx={{marginBottom:"2%",textAlign:"start",fontSize:"24px"}}>Most Applied Category: <span style={{color:"rgb(25, 118, 210)"}}>{mostappliedCategory}</span></Typography>
        <Typography sx={{marginBottom:"2%",textAlign:"start",fontSize:"24px"}}>Acceptance/Application Ratio for All opened Jobs: <span style={{color:"rgb(25, 118, 210)"}}>{ratio?ratio.toString().slice(0,4):""}</span></Typography>
      </div>
    
    </div>
    </div>
    </> :<Unauthorized/>}
    </>
  )
}

export default HrPanelHome