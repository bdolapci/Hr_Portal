import React from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import jwt_decode from "jwt-decode";
import Unauthorized  from '../components/Unauthorized'
import { Typography } from '@mui/material';
import axios from 'axios';
import {AreaChart, Area,CartesianGrid,BarChart,XAxis,YAxis,Legend,Tooltip,Bar,PieChart,Pie,Cell, ResponsiveContainer} from 'recharts';
import Box from '@mui/material/Box';
function AdminPanel() {
  if(JSON.parse(localStorage.getItem("User")) !== null){
    var token=localStorage.getItem("User");
    var decoded = jwt_decode(token);
   }
  const [regusers,setRegusers]=React.useState([]);
const [numberofusers,setNumberofusers]=React.useState(0);
const [companyrepresetetives,setCompanyrepresetetives]=React.useState(0);
const [numberofjobs,setNumberofjobs]=React.useState(0);

const [countopen,setCountopen]=React.useState(0);
const [countclose,setCountclose]=React.useState(0);
  const newDate = new Date();

let a=[]
let b=[]
let c=[]
let d=[]
let f=[0,0,0,0,0,0,0,0,0,0,0,0]
  const getnumberofusers=async()=>{
    try {
      const res =await axios.get("https://localhost:44361/api/Home")

      for(var i=0;i<res.data.length;i++){
        if(res.data[i].userRole=="user"){
          a.push(res.data[i])
        }
        else if(res.data[i].userRole=="hr"){
          b.push(res.data[i])
        }
        if(res.data[i].regDate.slice(5,7)=="01"&& res.data[i].regDate.slice(0,4)==newDate.getFullYear()){
          f[0]+=1
        }
        else if(res.data[i].regDate.slice(5,7)=="02" && res.data[i].regDate.slice(0,4)==newDate.getFullYear()){
          f[1]+=1
        }
        else if(res.data[i].regDate.slice(5,7)=="03"&& res.data[i].regDate.slice(0,4)==newDate.getFullYear()){
          f[2]+=1
        }
        else if(res.data[i].regDate.slice(5,7)=="04"&& res.data[i].regDate.slice(0,4)==newDate.getFullYear()){
          f[3]+=1
        }
        else if(res.data[i].regDate.slice(5,7)=="05"&& res.data[i].regDate.slice(0,4)==newDate.getFullYear()){
          f[4]+=1
        }
        else if(res.data[i].regDate.slice(5,7)=="06"&& res.data[i].regDate.slice(0,4)==newDate.getFullYear()){
          f[5]+=1
        }
        else if(res.data[i].regDate.slice(5,7)=="07"&& res.data[i].regDate.slice(0,4)==newDate.getFullYear()){
          f[6]+=1
        }
        else if(res.data[i].regDate.slice(5,7)=="08"&& res.data[i].regDate.slice(0,4)==newDate.getFullYear()){
          f[7]+=1
        }
        else if(res.data[i].regDate.slice(5,7)=="09"&& res.data[i].regDate.slice(0,4)==newDate.getFullYear()){
          f[8]+=1
        }
        else if(res.data[i].regDate.slice(5,7)=="10"&& res.data[i].regDate.slice(0,4)==newDate.getFullYear()){
          f[9]+=1
        }
        else if(res.data[i].regDate.slice(5,7)=="11"&& res.data[i].regDate.slice(0,4)==newDate.getFullYear()){
          f[10]+=1
        }
        else if(res.data[i].regDate.slice(5,7)=="12"&& res.data[i].regDate.slice(0,4)==newDate.getFullYear()){
          f[11]+=1
        }
      }

      setRegusers(f)
      setNumberofusers(a.length);
     setCompanyrepresetetives(b.length);

    } catch (error) {
      console.log(error)
    }
  }
  console.log(regusers,"")
  const getnumberofjobs=async()=>{
    try {
      const res=await axios.get("https://localhost:44361/api/Home/Jobs")
      
      setNumberofjobs(res.data.length)
      const today = new Date()
      for(var i=0;i<res.data.length;i++){
        const newDate = new Date(res.data[i].Date)
        if (today.getTime() <newDate.getTime() || res.data[i].Date=="null") {
          c.push(a[i])
         
        }
        else{
          d.push(a[i])
      
        }
        
        
      }
      setCountopen(c.length)
      setCountclose(d.length)
     
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(()=>{
    getnumberofusers()
    getnumberofjobs()
  },[])
  const data=[
    {name:'Number of Registered Users in the System',"Number of Users":numberofusers,"Number of Company Representative":companyrepresetetives,},
  ]
  const data2=[
    {name:'Total jobs',"value":numberofjobs},
    {name:"Open Jobs","value":countopen},
    {name:"Closed Jobs","value":countclose},
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
    {name:"January",value:regusers[0]},
    {name:"February",value:regusers[1]},
    {name:"March",value:regusers[2]},
    {name:"April",value:regusers[3]},
    {name:"May",value:regusers[4]},
    {name:"June",value:regusers[5]},
    {name:"July",value:regusers[6]},
    {name:"August",value:regusers[7]},
    {name:"September",value:regusers[8]},
    {name:"October",value:regusers[9]},
    {name:"November",value:regusers[10]},
    {name:"December",value:regusers[11]},
  ]
  return (
    <>
    {JSON.parse(localStorage.getItem("User")) !== null ?decoded.userRole=="admin" ? 
    <div style={{backgroundColor:"rgb(251, 251, 251)",minHeight:"100vh"}}>
        <Navbar/>
    <SideBar/>
    <div className="container" >
    <h1 style={{color:"rgb(25, 118, 210)"}}>Welcome to your Panel</h1>
    <div className="all">
      <Box sx={{boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",borderRadius:"1.125rem",backgroundColor:"white"}}>
        <Typography>Number of registered users over time(Yearly)</Typography>
       


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
    <div className="informations" style={{display:"flex",flexDirection:"row"}}>
    <Box sx={{display:"flex",flexDirection:"row",marginBottom:"4%"}}>
       <Box sx={{boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",borderRadius:"1.125rem",backgroundColor:"white"}}>
       <Typography>Number of Registered Users in the System</Typography>
     <BarChart width={730} height={250} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Number of Users" fill="#0088FE" />
      <Bar dataKey="Number of Company Representative" fill="#82ca9d" />
      
    </BarChart>
       </Box>
      <Box sx={{boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",marginLeft:"2%",borderRadius:"1.125rem",backgroundColor:"white"}}>
      <Typography>Total Jobs Chart</Typography>
      <div className="conpie" style={{display:"flex",justifyContent:"center"}}>
      

      <PieChart width={530} height={250}>
      <Pie data={data2} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={100} fill="#8884d8" labelLine={false}
            label={renderCustomizedLabel}>
        <Cell key={`Total Jobs`} fill={"#0088FE"} />
        <Cell key={`Open Jobs`} fill={"#00C49F"} />
        <Cell key={`Closed Jobs`} fill={"#FFBB28"} />
        </Pie> 
      <Tooltip />
      </PieChart> 

      </div>
      </Box>
     </Box> 
    </div>
    </div>
    </div>
    </div> : <Unauthorized/>:<Unauthorized/>}

    
    </>
  )
}

export default AdminPanel