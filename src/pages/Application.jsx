import React from 'react'
import { Card,CardContent, Step, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import axios from 'axios'
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import jwt_decode from "jwt-decode";
import Navbar from '../components/Navbar';
import jsPDF from "jspdf";
import { useParams } from 'react-router-dom';
import { Alert } from '@mui/material';
import NotFound from '../components/NotFound';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
function Application() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isHide, setIsHide] = React.useState(true);
  const {id} = useParams();
  const navigate = useNavigate();
  const stylediv={
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
                          marginBottom:"3%"
  }

  const filecounter=0;
  const [expectedSalary, setExpectedSalary] = React.useState("");
  const [anythingelse,setAnythingElse]=React.useState("");
  const expectedSalaryHandler = (e) => {
    setExpectedSalary(e.target.value);
  };
  const anythingElseHandler = (e) => {
    setAnythingElse(e.target.value);
  };
 

  const [file,setFile]=React.useState();
  const [fileName,setFileName]=React.useState();
  const saveFile=(event)=>{
    setFile(event.target.files[0])
    setFileName(event.target.files[0].name)
  }
  const [file2,setFile2]=React.useState();
  const [fileName2,setFileName2]=React.useState();
  const saveFile2=(event)=>{
    setFile2(event.target.files[0])
    setFileName2(event.target.files[0].name)
  }
  const [file3,setFile3]=React.useState();
  const [fileName3,setFileName3]=React.useState();
  const saveFile3=(event)=>{
    setFile3(event.target.files[0])
    setFileName3(event.target.files[0].name)
  }
  const [file4,setFile4]=React.useState();
  const [fileName4,setFileName4]=React.useState();
  const saveFile4=(event)=>{
    setFile4(event.target.files[0])
    setFileName4(event.target.files[0].name)
  }
  const [count, setCount] = React.useState(0);

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const sendLast =async()=>{
    sendApplication();
    uploadFile();
    setCount(count+1);
    try {
      const res= axios.post("https://localhost:44361/api/Home/Applicants",{
        Userid:decoded.id,
        Jobsid:id,
        isAccepted:0,
        ProfileId:profileInfo.Id 
      })
      console.log("burada")
      
      } catch (error) {
      console.log(error)
    }
    controlemail();
    setTimeout(()=>{
      navigate("/")
    },5000)
 
  }

  const [alert1,setAlert1]=React.useState(false);
  const uploadFile =async (event)=>{
    const nameoffile=decoded.id+"_"+id+"_"+fileName
    const formData=new FormData();
    if(file !== undefined){

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
try {
  const res=await axios.post("https://localhost:44361/api/Home/CreateFile",{
    Userid:decoded.id,
    Name:fileName,
    Jobid:id,
  })
  console.log(res);
} catch (error) {
  
  console.log(error)
}
  const nameoffile2=decoded.id+"_"+id+"_"+fileName2
  const formData2=new FormData();
  if(file2!==undefined){
    formData2.append("formFile",file2,nameoffile2)
 
  
  try {
  const res=await axios.post("https://localhost:44361/api/Home/UploadFile",formData2)
  console.log(res);
  setAlert1(true)
  setTimeout(() => {
  setAlert1(false);
  }, 4000); 

  } catch (error) {
  setAlert1(false);
  console.log(error)
  }
  try {
    const res=await axios.post("https://localhost:44361/api/Home/CreateFile",{
      Userid:decoded.id,
      Name:fileName2,
      Jobid:id,
    })
    console.log(res);
  } catch (error) {
    
    console.log(error)
}
}
    const nameoffile3=decoded.id+"_"+id+"_"+fileName3
    const formData3=new FormData();
    if(file3!==undefined){
      formData3.append("formFile",file3,nameoffile3)


    try {
    const res=await axios.post("https://localhost:44361/api/Home/UploadFile",formData3)
    console.log(res);
    setAlert1(true)
    setTimeout(() => {
    setAlert1(false);
    }, 4000); 

    } catch (error) {
    setAlert1(false);
    console.log(error)
    }
    try {
      const res=await axios.post("https://localhost:44361/api/Home/CreateFile",{
        Userid:decoded.id,
        Name:fileName3,
        Jobid:id,
      })
      console.log(res);
    } catch (error) {
      
      console.log(error)
  }
    }
      
 
  
    const nameoffile4=decoded.id+"_"+id+"_"+fileName4
    const formData4=new FormData();
    if(file4!==undefined){
      formData4.append("formFile",file4,nameoffile4)


    try {
    const res=await axios.post("https://localhost:44361/api/Home/UploadFile",formData4)
    console.log(res);
    setAlert1(true)
    setTimeout(() => {
    setAlert1(false);
    }, 4000); 

    } catch (error) {
    setAlert1(false);
    console.log(error)
    }
    try {
      const res=await axios.post("https://localhost:44361/api/Home/CreateFile",{
        Userid:decoded.id,
        Name:fileName4,
        Jobid:id,
      })
      console.log(res);
    } catch (error) {
      
      console.log(error)
  }
    }
  }
  const [userInfo,setUserInfo]=React.useState()
  const [profileInfo,setProfileInfo]=React.useState()
  const [singleJob,setSingleJob]=React.useState()
  const getuserInfo =async ()=>{
    setIsLoading(true)
    try {
      const res=await axios.get("https://localhost:44361/api/Home/User/"+decoded.id)
      setUserInfo(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getprofileInfo =async ()=>{
    setIsLoading(true)
    try {
      const res=await axios.get("https://localhost:44361/api/Home/ProfileSingle/"+decoded.id)
      setProfileInfo(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getSingleJob =async ()=>{
    setIsLoading(true)
    try {
      const res=await axios.get("https://localhost:44361/api/Home/Jobs/"+id)
      setSingleJob(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(()=>{
    setIsLoading(true)
    getuserInfo()
    getprofileInfo()
    getSingleJob()
    setIsLoading(false)
  },[])
  console.log(singleJob)
  const handleSend = async() => {
    const rand = Math.floor(Math.random() * 10000000);
    const doc = new jsPDF();

    const data = 
    'Initial Informations'+'\n'+ '\n'+
    'First Name: ' + userInfo.firstName + '\n' +
    'Last Name: ' + userInfo.lastName + '\n' +
    'Gender:' + userInfo.gender + '\n' + 
    'Linkedin:' + profileInfo.Linkedin + '\n' + 
    'Certifications:' +profileInfo.certification + '\n' + '\n'+
    'Educational Background'+'\n'+ '\n'+
    'Education 1'+ '\n'+
    'School Name:'+profileInfo.education.split(",")[0] + '\n' + 
    'Degree:'+profileInfo.education.split(",")[3] + '\n' + 
    'Gpa:'+profileInfo.education.split(",")[6] + '\n' + 
    'Graduation Day:'+profileInfo.education.split(",")[9].slice(3,15) + '\n' + 
    'Education 2'+ '\n'+
    'School Name 2:'+profileInfo.education.split(",")[1] + '\n' +    
    'Degree2:'+profileInfo.education.split(",")[4] + '\n' + 
    'Gpa2:'+profileInfo.education.split(",")[7] + '\n' + 
    'Graduation Day2:'+profileInfo.education.split(",")[10].slice(3,15) + '\n' + 
    'Education 3'+ '\n'+
    'School Name 3:'+profileInfo.education.split(",")[2] + '\n' + 
    'Degree3:'+profileInfo.education.split(",")[5] + '\n' + 
    'Gpa3:'+profileInfo.education.split(",")[8] + '\n' + 
    'Graduation Day3:'+profileInfo.education.split(",")[11].slice(3,15) + '\n' + '\n'+
    'Experience'+'\n'+ '\n'+
    'Experience: 1' + '\n'+
    'Company Name:'+profileInfo.experience.split(",")[0] + '\n' + 
    'Job Title:'+profileInfo.experience.split(",")[3] + '\n' + 
    'Job Description:'+profileInfo.experience.split(",")[6] + '\n' + 
    'Worked on year:'+profileInfo.experience.split(",")[9] + '\n' + 
    'Experience: 2' + '\n'+
    'Company Name2:'+profileInfo.experience.split(",")[1] + '\n' + 
    'Job Title:'+profileInfo.experience.split(",")[4] + '\n' + 
    'Job Description2:'+profileInfo.experience.split(",")[7] + '\n' + 
    'Worked on year2:'+profileInfo.experience.split(",")[10] + '\n' + 
    'Experience: 3' + '\n'+
    'Company Name3:'+profileInfo.experience.split(",")[2] + '\n' + 
    'Job Title:'+profileInfo.experience.split(",")[5] + '\n' + 
    'Job Description3:'+profileInfo.experience.split(",")[8] + '\n' + 
    'Worked on year3:'+profileInfo.experience.split(",")[11] + '\n' + 
    'Expected Salary:' +expectedSalary + '\n' +
    'Anything Else:' +anythingelse + '\n' 
 
    const str =decoded.id+"_"+id+"_"+rand.toString()+".pdf";
    doc.text(10,20,data.split("Experience: 1")[0],{ maxWidth:200 })
   doc.addPage()
    doc.text(10,20,data.split("Experience: 1")[1],{ maxWidth:200 })
    doc.setFontSize(21);
    doc.save(str);  
  };
  let user=JSON.parse(localStorage.getItem("User"));
  if(JSON.parse(localStorage.getItem("User")) !== null){
    try {
      var token=localStorage.getItem("User");
      var decoded = jwt_decode(token);
      
    } catch (error) {
      console.log(error)
    }
    }
    const sendApplication=async(event)=>{
    const rand = Math.floor(Math.random() * 10000000);
    const doc = new jsPDF();
    
    const data =  
    'Initial Informations'+'\n'+ '\n'+
    'First Name: ' + userInfo.firstName + '\n' +
    'Last Name: ' + userInfo.lastName + '\n' +
    'Gender:' + userInfo.gender + '\n' + 
    'Linkedin:' + profileInfo.Linkedin + '\n' + 
    'Certifications:' +profileInfo.certification + '\n' + '\n'+
    'Educational Background'+'\n'+ '\n'+
    'Education 1'+ '\n'+
    'School Name:'+profileInfo.education.split(",")[0] + '\n' + 
    'Degree:'+profileInfo.education.split(",")[3] + '\n' + 
    'Gpa:'+profileInfo.education.split(",")[6] + '\n' + 
    'Graduation Day:'+profileInfo.education.split(",")[9].slice(3,15) + '\n' + 
    'Education 2'+ '\n'+
    'School Name 2:'+profileInfo.education.split(",")[1] + '\n' +    
    'Degree2:'+profileInfo.education.split(",")[4] + '\n' + 
    'Gpa2:'+profileInfo.education.split(",")[7] + '\n' + 
    'Graduation Day2:'+profileInfo.education.split(",")[10].slice(3,15) + '\n' + 
    'Education 3'+ '\n'+
    'School Name 3:'+profileInfo.education.split(",")[2] + '\n' + 
    'Degree3:'+profileInfo.education.split(",")[5] + '\n' + 
    'Gpa3:'+profileInfo.education.split(",")[8] + '\n' + 
    'Graduation Day3:'+profileInfo.education.split(",")[11].slice(3,15) + '\n' + '\n'+
    'Experiences'+'\n'+ '\n'+'\n'+
    'Experience: 1' + '\n'+
    'Company Name:'+profileInfo.experience.split(",")[0] + '\n' + 
    'Job Title:'+profileInfo.experience.split(",")[3] + '\n' + 
    'Job Description:'+profileInfo.experience.split(",")[6] + '\n' + 
    'Worked on year:'+profileInfo.experience.split(",")[9] + '\n' + 
    'Experience: 2' + '\n'+
    'Company Name2:'+profileInfo.experience.split(",")[1] + '\n' + 
    'Job Title:'+profileInfo.experience.split(",")[4] + '\n' + 
    'Job Description2:'+profileInfo.experience.split(",")[7] + '\n' + 
    'Worked on year2:'+profileInfo.experience.split(",")[10] + '\n' + 
    'Experience: 3' + '\n'+
    'Company Name3:'+profileInfo.experience.split(",")[2] + '\n' + 
    'Job Title:'+profileInfo.experience.split(",")[5] + '\n' + 
    'Job Description3:'+profileInfo.experience.split(",")[8] + '\n' + 
    'Worked on year3:'+profileInfo.experience.split(",")[11] + '\n' + 
    'Expected Salary:' +expectedSalary + '\n' +
    'Anything Else:' +anythingelse + '\n'   
 
    const str =decoded.id+"_"+id+"_"+rand.toString()+".pdf";
    doc.text(10,20,data.split("Experiences")[0],{ maxWidth:200 })
   doc.addPage()
    doc.text(10,20,data.split("Experiences")[1],{ maxWidth:200  })
    
    var blobPdf= new Blob([doc.output('blob')], {type: 'application/pdf'});
    var filer = new File([blobPdf], str, {type: 'application/pdf'});
    const formData=new FormData();
    formData.append("hi",filer)
    try {
      const res= axios.post("https://localhost:44361/api/Home/UploadFile",formData)
      console.log("burada")
      setAlert1(true)
      setTimeout(() => {
        setAlert1(false);
        
      }, 4000); 
      
      } catch (error) {
        setAlert1(false);
      console.log(error)
    }
   try {
    const res=await axios.post("https://localhost:44361/api/Home/CreateFile",{
      Userid:decoded.id,
      Name:str,
      Jobid:id,
    })
    console.log(res);
  } catch (error) {
    
    console.log(error)
}

  }
    const Input = styled('input')({
        display: 'none',
      });
      async function controlemail() {
        try {
          const response2 = await axios.post(
            `https://localhost:44361/api/Home/SendSuccess`,
            {
             ToEmail:`${userInfo.email}`,
             Subject:"Successfull Application",
             Body:"Your application has been successfully sent to the company",
            }
          );
        } catch (error) {
          console.log(error);
       
        }
      }
     setTimeout(()=>setIsHide(false),500)
  return (
   <div style={{backgroundColor:"rgb(248, 248, 248)"}}>
  {singleJob && user ? <>  <Navbar/>
  {isLoading? <Spinner/>:
     <div className="container" style={{marginTop:"3%",marginBottom:"3%"}}>
     <div className="middle" style={{width:"50%",boxShadow:" 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
     ,borderRadius: "1.125rem",backgroundColor:"white",
   padding: "2%",
}}>
     <Typography variant='h4' style={{marginBottom:"10%",color:"rgb(25, 118, 210)"}}>
                {singleJob.Name}
            </Typography>
            {alert1 ? <Alert severity="success">Upload Successfull(You will be redirected to the main page in5s)</Alert> :  ""}
             <div style={{display:"flex",flexDirection:"column", marginTop:"4%",marginBottom:"4%"}} className="uploads">
<div className="leftpart" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
  <label >Please answer this question only if it is wanted in job description</label>
<TextField
             onChange={expectedSalaryHandler}
        
        sx={{width:"40%",marginBottom:"3%",marginTop:"1%"}}
        id="outlined-required"
        label="Expected Salary"
        variant="outlined"
      />
      <label>You can write anything else your employee wants</label>
             <TextField
             onChange={anythingElseHandler}
             inputProps={{ maxLength: 500 }}
        multiline
        rows={8}
        sx={{width:"60%",marginTop:"2%"}}
        id="outlined-required"
        label="Anything Else"
        variant="outlined"
      />
</div>
               <label style={{marginTop:"4%"}}>Please upload the files that wanted in Job Description</label>
               <label>You can upload up to 4 files</label>
          <div className="divupload" style={{marginTop:"4%",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>         
          <input style={stylediv} type="file"  onChange={saveFile}/>
<input style={stylediv} type="file"  onChange={saveFile2}/>
 <input style={stylediv} type="file"  onChange={saveFile3}/>
 <input style={stylediv} type="file"  onChange={saveFile4}/>
         <div style={{display:"flex",flexDirection:"column"}} className="senadpp">
          
       <Button onClick={handleSend}>Download as Pdf</Button> 
        <Button onClick={sendLast}>Send Application</Button> 
       
       </div>
          </div>
        

             </div>
        
     </div>
 </div> }

   <Footer/>
   </> : isLoading ? <Spinner/> : !isHide ? <NotFound/>  :<Spinner/>}
   </div>
  )
}

export default Application