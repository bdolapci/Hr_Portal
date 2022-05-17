import React from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Alert } from "@mui/material";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
const steps = ['Enter your information  ', 'Upload Files',"Overview", 'Finish'];

function Stepperr() {

  
  const [firsName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [expectedSalary, setExpectedSalary] = React.useState("");
  const [schoolName, setSchoolName] = React.useState("");
  const [schoolName2, setSchoolName2] = React.useState("");
  const [schoolName3, setSchoolName3] = React.useState("");
  const [degree, setDegree] = React.useState("");
  const [degree2, setDegree2] = React.useState("");
  const [degree3, setDegree3] = React.useState("");
  const [gpa, setGpa] = React.useState("");
  const [gpa2, setGpa2] = React.useState("");
  const [gpa3, setGpa3] = React.useState("");
  const [educationdate, setEducationdate] = React.useState("");
  const [educationdate2, setEducationdate2] = React.useState("");
  const [educationdate3, setEducationdate3] = React.useState("");
  const [companyName,setCompanyName]=React.useState("");
  const [companyName2,setCompanyName2]=React.useState("");
  const [companyName3,setCompanyName3]=React.useState("");
  const [jobTitle,setJobTitle]=React.useState("");
  const [jobTitle2,setJobTitle2]=React.useState("");
  const [jobTitle3,setJobTitle3]=React.useState("");
  const [jobDescription,setJobDescription]=React.useState("");
  const [jobDescription2,setJobDescription2]=React.useState("");
  const [jobDescription3,setJobDescription3]=React.useState("");
  const [yearsOfExperience,setYearsOfExperience]=React.useState("");
  const [yearsOfExperience2,setYearsOfExperience2]=React.useState("");
  const [yearsOfExperience3,setYearsOfExperience3]=React.useState("");
  const [anythingelse,setAnythingElse]=React.useState("");

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };
  const expectedSalaryHandler = (e) => {
    setExpectedSalary(e.target.value);
  };
  const schoolNameHandler = (e) => {
    setSchoolName(e.target.value);
  };
  const schoolNameHandler2 = (e) => {
    setSchoolName2(e.target.value);
  };
  const schoolNameHandler3 = (e) => {
    setSchoolName3(e.target.value);
  };
  const degreeHandler = (e) => {
    setDegree(e.target.value);
  };
  const degreeHandler2 = (e) => {
    setDegree2(e.target.value);
  };
  const degreeHandler3 = (e) => {
    setDegree3(e.target.value);
  };
  const gpaHandler = (e) => {
    setGpa(e.target.value);
  };
  const gpaHandler2 = (e) => {
    setGpa2(e.target.value);
  };
  const gpaHandler3 = (e) => {
    setGpa3(e.target.value);
  };
  const educationdateHandler = (e) => {
    setEducationdate(e.target.value);
  };
  const educationdateHandler2 = (e) => {
    setEducationdate2(e.target.value);
  };
  const educationdateHandler3 = (e) => {
    setEducationdate3(e.target.value);
  };
  const companyNameHandler = (e) => {
    setCompanyName(e.target.value);
  };
  const companyNameHandler2 = (e) => {
    setCompanyName2(e.target.value);
  };
  const companyNameHandler3 = (e) => {
    setCompanyName3(e.target.value);
  };
  const jobTitleHandler = (e) => {
    setJobTitle(e.target.value);
  };
  const jobTitleHandler2 = (e) => {
    setJobTitle2(e.target.value);
  };
  const jobTitleHandler3 = (e) => {
    setJobTitle3(e.target.value);
  };
  const jobDescriptionHandler = (e) => {
    setJobDescription(e.target.value);
  };
  const jobDescriptionHandler2 = (e) => {
    setJobDescription2(e.target.value);
  };
  const jobDescriptionHandler3 = (e) => {
    setJobDescription3(e.target.value);
  };
  const yearsOfExperienceHandler = (e) => {
    setYearsOfExperience(e.target.value);
  };
  const yearsOfExperienceHandler2 = (e) => {
    setYearsOfExperience2(e.target.value);
  };
  const yearsOfExperienceHandler3 = (e) => {
    setYearsOfExperience3(e.target.value);
  };
  const anythingElseHandler = (e) => {
    setAnythingElse(e.target.value);
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

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };
  const Input = styled('input')({
    display: 'none',
  });
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped; 
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const anotherJob=()=>{
    return(
      <>
     
          {jobs.length==1 ?   
          <>
             <Box sx={{justifyContent:"space-between",marginBottom:"5%"}}>
           <TextField
          
          id="standard-required"
          label="Company Name"
          sx={{marginRight:"2%"}}
          onChange={companyNameHandler3 }
          variant="standard"
        />
        <TextField
          
          id="standard-required"
          label="Job Title"
          onChange={jobTitleHandler3 }
          sx={{marginRight:"2%"}}
          variant="standard"
        />
         <TextField
          
          onChange={yearsOfExperienceHandler3 }
          id="standard-number"
          type={'number'}
          label="Years of Experience"
          variant="standard"
        />
        </Box>
        <TextField
              multiline
              onChange={jobDescriptionHandler3 }
              rows={5}
              sx={{width:"400px"}}
          
          id="standard-required"
          label="Work Description"
         
        />
          </> :
          <>
          <Box sx={{justifyContent:"space-between",marginBottom:"5%"}}>
        <TextField
        
        id="standard-required"
        label="Company Name"
        sx={{marginRight:"2%"}}
        onChange={companyNameHandler2 }
        variant="standard"
        />
         <TextField
          
          onChange={jobTitleHandler2 }
          id="standard-required"
          label="Job Title"
          sx={{marginRight:"2%"}}
          variant="standard"
        />
         <TextField
          
          onChange={yearsOfExperienceHandler2 }
          id="standard-required"
          label="Years of Experience"
          variant="standard"

        />
        </Box>
        <TextField
              multiline
              onChange={jobDescriptionHandler2}
              rows={5}
              sx={{width:"400px"}}
          
          id="standard-required"
          label="Work Description"
         
        />
        </>
        }
           
                 
        
             
              
      </>
    )
  }
  const [alertapplication, setAlertapplication] = React.useState(false);
  
  const anotherEducation=()=>{
    
    return(
      <>
     
        {education.length==1 ?
        <>
         <Box sx={{justifyContent:"space-between",marginBottom:"5%"}}>
          <TextField
    
    id="standard-required"
    label="School Name"
    sx={{marginRight:"2%"}}
    variant="standard"
    onChange={schoolNameHandler3 }
  />
           <TextField
    
    id="standard-required"
    label="Degree"
    sx={{marginRight:"2%"}}
    variant="standard"
    onChange={degreeHandler3 }
  />
   <TextField
    
    id="standard-required"
    label="GPA"
  onChange={gpaHandler3 }
    variant="standard"
  />
       </Box>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                label="Date"
                value={educationdate3 ||null}
               format="DD-MM-YYYY"
               onChange={(newValue3) => {
                  setEducationdate3(newValue3);
               
               }}
                disablePast={true}
               renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
         
          </>: 
          <>
             <Box sx={{justifyContent:"space-between",marginBottom:"5%"}}>
            <TextField
    
    onChange={schoolNameHandler2 }
    id="standard-required"
    label="School Name"
    sx={{marginRight:"2%"}}
    variant="standard"
  />
           <TextField
    
    onChange={degreeHandler2 }
    id="standard-required"
    label="Degree"
    sx={{marginRight:"2%"}}
    variant="standard"
  />
   <TextField
    
    onChange={gpaHandler2 }
    id="standard-required"
    label="GPA" 
  
    variant="standard"
  />
    </Box>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                 label="Date"
                 value={educationdate2 ||null}
                format="DD-MM-YYYY"
                onChange={(newValue2) => {
                   setEducationdate2(newValue2);
                    console.log(newValue2)
                }}
                 disablePast={true}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

          </>
        }
      
       
     
      </>
    )
  }
  const nav = useNavigate();

  const sendApplication=async(event)=>{
    const rand = Math.floor(Math.random() * 10000000);
    const doc = new jsPDF();
    const data = await document.querySelector("#pdf");
    const str =decoded.id+"_"+rand.toString()+".pdf";
    
   doc.html(data).then(()=>{
    var blobPdf= new Blob([doc.html(data),doc.output('blob')], {type: 'application/pdf'});
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
   })

  }
  const [count, setCount] = React.useState(0);
  
  const sendLast =async()=>{
    sendApplication();
    uploadFile();
    setCount(count+1);
  }

  const filecounter=0;
  const handleSend = async() => {
    const rand = Math.floor(Math.random() * 10000000);
    const doc = new jsPDF();
    const data = await document.querySelector("#pdf");
    const str =decoded.id+"_"+rand.toString()+".pdf";
    doc.html(data).then(() => {
      doc.save(str);  
    });
    // Navigate("/")
  };
  const [jobs,setJobs]=React.useState([]);

  const [education,setEducation]=React.useState([]);
  const addeducationlist=(event)=>{
    setEducation([...education,anotherEducation()])
  }
  const addjoblist=(event)=>{
    setJobs([...jobs,anotherJob()])
  }

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

  const [alert1,setAlert1]=React.useState(false);
  const uploadFile =async (event)=>{
    const nameoffile=decoded.id+"_"+fileName
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
  const nameoffile2=decoded.id+"_"+fileName2
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
}
    const nameoffile3=decoded.id+"_"+fileName3
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
    }
    const nameoffile4=decoded.id+"_"+fileName4
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
    }
  }



  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
        
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        ""
      ) : (
        <React.Fragment>
           {activeStep === 0 ?( 
             <>
             <h3>Initial Informations</h3>
           
              <Box sx={{justifyContent:"space-between",}}>
              <TextField
          required
          id="standard-required"
          label="First Name"
            sx={{marginRight:"2%"}}
          variant="standard"
          onChange={firstNameHandler}
        />
                 <TextField
          required
          id="standard-required"
          label="Last Name"
          onChange={lastNameHandler}
          variant="standard"
        />
              </Box>
              
              <TextField
               onChange={expectedSalaryHandler}
          required
          id="standard-required"
          label="Expected Salary"
          variant="standard"
        />
              
            <h3 style={{marginTop:"10%"}}>Education</h3>
            <Box sx={{justifyContent:"space-between",marginBottom:"5%"}}>
              <TextField
          required
          onChange={schoolNameHandler}
          id="standard-required"
          label="School Name"
          sx={{marginRight:"2%"}}
          variant="standard"
        />
                 <TextField
          required
          onChange={degreeHandler}
          id="standard-required"
          label="Degree"
          sx={{marginRight:"2%"}}
          variant="standard"
        />
        <TextField
          required
          id="standard-required"
          label="GPA"
          onChange={gpaHandler}
          variant="standard"
        />
      
              </Box>
             
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date"
                         value={educationdate || null}
                        format="DD-MM-YYYY"
                        onChange={(newValue) => {
                           setEducationdate(newValue);
                        
                        }}
                         disablePast={true}
                        renderInput={(params) => <TextField {...params} />}
                      />
                  </LocalizationProvider>
                  <br/>
                  <div>
                    {education}
                  </div>
                  {education.length<2?<Button onClick={addeducationlist}>Add Education</Button>:null}
                  
            <h3  style={{marginTop:"10%"}}>Work Experience</h3>

            <Box sx={{justifyContent:"space-between",marginBottom:"5%"}}>
              <TextField
          
          id="standard-required"
          label="Company Name"
          onChange={companyNameHandler}
          sx={{marginRight:"2%"}}
          variant="standard"
        />
                 <TextField
          
          id="standard-required"
          label="Job Title"
          onChange={jobTitleHandler}
          sx={{marginRight:"2%"}}
          variant="standard"
        />
         <TextField
          
          id="standard-required"
          label="Years of Experience"
          variant="standard"
          onChange={yearsOfExperienceHandler}
        />
              </Box>
              <TextField
                   onChange={jobDescriptionHandler}
              multiline
              rows={5}
              sx={{width:"400px"}}
          
          id="standard-required"
          label="Work Description"
         
        />
   <br/>
   <div>{jobs} </div>
    {jobs.length<2?<Button onClick={addjoblist}>Add Job</Button>:null}
                 

              
             
             </>
          ):""}
          {activeStep === 1 ?( 
            <>
              {alert1 ? <Alert severity="success">Upload Successfull</Alert> :  ""}
               <div style={{display:"flex",flexDirection:"column", marginTop:"4%",marginBottom:"4%"}} className="uploads">
                 <label>Please upload the files that wanted in Job Description</label>
                 <label>You can upload up to 4 files</label>
                
            <div className="divupload" style={{marginTop:"4%",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
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
                          marginBottom:"3%"
  }} type="file" multiple onChange={saveFile}/>
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
                          marginBottom:"3%"
  }} type="file" multiple onChange={saveFile2}/>
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
                          marginBottom:"3%"
  }} type="file" multiple onChange={saveFile3}/>
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
  }} type="file" multiple onChange={saveFile4}/>
  
            </div>
          
 
               </div>
            </>
          ):""}
          {activeStep === 2 ?(
            <>
            
            <Typography sx={{marginTop:"5%",marginBottom:"2%  "}}>If there is anything else you want to add you can write it down below</Typography>
          <TextField      onChange={anythingElseHandler} style={{marginTop:"20px",marginLeft:"20px",width:"600px"}} multiline rows={8  }   id="outlined-basic"  variant="outlined" />
          
            </> 
          ):""}
          {activeStep === 3 ?(
            <>
            <h3>Overview</h3>
            {alert1 ? <Alert severity="success">Upload Successfull</Alert> :  ""}
             <div id="pdf">
             <Typography>
             {firsName.length>0 ?"First Name :"+firsName : ""}
          </Typography>
          <Typography>
             {lastName.length>0 ?"Last Name :"+lastName : ""}
          </Typography>
          <Typography>
             {expectedSalary.length>0 ?"Expected Salary :"+expectedSalary : ""}
          </Typography>
          <Typography>
             {schoolName.length>0 ?"School Name :"+schoolName : ""}
          </Typography>
          <Typography>
             {degree.length>0 ?"Degree:"+degree : ""}
          </Typography>
          <Typography>
             {gpa.length>0 ?"GPA:"+gpa : ""}
          </Typography>
          <Typography>
             {educationdate ?"Education Date:"+educationdate : ""}
          </Typography>
          <Typography>
             {schoolName2.length>0 ?"School Name :"+schoolName2 : ""}
          </Typography>
          <Typography>
             {degree2.length>0 ?"Degree:"+degree2 : ""}
          </Typography>
          <Typography>
             {gpa2.length>0 ?"GPA:"+gpa2 : ""}
          </Typography>
          <Typography>
             {educationdate2 ?"Education Date:"+educationdate2 : ""}
          </Typography>
          <Typography>
             {schoolName3.length>0 ?"School Name :"+schoolName3 : ""}
          </Typography>
          <Typography>
             {degree3.length>0 ?"Degree:"+degree3 : ""}
          </Typography>
          <Typography>
             {gpa3.length>0 ?"GPA:"+gpa3: ""}
          </Typography>
          <Typography>
             {educationdate3 ?"Education Date:"+educationdate3: ""}
          </Typography>
            
          <Typography>
             {companyName.length>0 ?"Company Name :"+companyName : ""}
          </Typography>
          <Typography>
             {jobTitle.length>0 ?"Job Title :"+jobTitle : ""}
          </Typography>
          <Typography>
             {yearsOfExperience.length>0 ?"Years of Experience :"+yearsOfExperience : ""}
          </Typography>
          <Typography>
             {jobDescription.length>0 ?"Job Description :"+jobDescription : ""}
          </Typography>
          <Typography>
             {companyName2.length>0 ?"Company Name :"+companyName2 : ""}
          </Typography>
          <Typography>
             {jobTitle2.length>0 ?"Job Title :"+jobTitle2 : ""}
          </Typography>
          <Typography>
             {yearsOfExperience2.length>0 ?"Years of Experience :"+yearsOfExperience2 : ""}
          </Typography>
          <Typography>
             {jobDescription2.length>0 ?"Job Description :"+jobDescription2 : ""}
          </Typography>
          <Typography>
             {companyName3.length>0 ?"Company Name :"+companyName3 : ""}
          </Typography>
          <Typography>
             {jobTitle3.length>0 ?"Job Title :"+jobTitle3 : ""}
          </Typography>
          <Typography>
             {yearsOfExperience3.length>0 ?"Years of Experience :"+yearsOfExperience3 : ""}
          </Typography>
          <Typography>
             {jobDescription3.length>0 ?"Job Description :"+jobDescription3 : ""}
          </Typography>
          <Typography>
             {anythingelse.length>0 ?"Extra :"+anythingelse : ""}
          </Typography>
          </div>
         <div style={{display:"flex",flexDirection:"column"}} className="senadpp">
         <Button onClick={handleSend}>Download as Pdf</Button> 
          <Button onClick={sendLast}>Send Application</Button> 
         </div>
            </>) : ""}

         
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
          
            {activeStep===steps.length-1 ? <>
            {count>=1 ? <Button href="/">Finish</Button> :<>
          
            </>
            }
              
              
            </>
            :
            <>
             <Button onClick={handleNext}>
              Next
             </Button>
            </>}
          
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default Stepperr