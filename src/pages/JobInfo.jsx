import React from 'react'
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom'
import banner from '../pictures/banner.jpg'
function JobInfo(){

    const [job,setJob] = React.useState([]);
    const {id} = useParams();
    const getallInfo = () => {
        axios.get(`https://localhost:44361/api/Home/Jobs/${id}`,{
        }).then((res)=>{
            setJob(res.data);
           
         
        })
      }
 
      console.log(job)
      React.useEffect(()=>{
          getallInfo();
      },[])
      console.log(job)
    return(
        <><Navbar />
        <div className="main">
        
            
        <h1>{job.Name}</h1>
        <h1>{job.Date}</h1>

        
        
        <h1>{job.description}</h1>
        <h1>{job.category}</h1>
        <img src={banner} style={{maxWidth:"500px"}} />

        </div>
        </>
    )
    
}
export default JobInfo