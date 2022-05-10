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
const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

function Stepperr() {

 var formData =new FormData();

const onfileChange =(e)=>{
  console.log(e.target.files[0])
  if(e.target.files[0]){
    formData.append("file",e.target.files[0])
  }
}
async function submitFileData(){
 await axios.post("https://localhost:44361/api/Home/UploadFile",{
    formData
  })
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(err)
  })
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

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
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
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
           {activeStep === 0 ?( 
             <>
           
              <Box sx={{justifyContent:"space-between"}}>
              <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
          variant="standard"
        />
                 <TextField 
               // multiline  
               variant="filled"
               sx={{ marginBottom:"2%",width:"20%"}}
               label="LastName"
               multiline
               placeholder="LastName"
              
               ></TextField>
              </Box>
              <TextField 
               // multiline  
               variant="filled"
               sx={{ marginBottom:"2%",width:"20%"}}
               label="Salary Expectation"
               multiline
               placeholder="Salary Expectation"
              
               ></TextField>
              

                <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="contained-button-file">
                    <input name="file" onChange={onfileChange}  accept="file/*" id="contained-button-file" multiple type="file" />
                    <button onClick={submitFileData}  variant="contained" component="span">
                      Upload
                    </button>
                  </label>
                </Stack>
              
             
             </>
          ):""}
          {activeStep === 1 ?( 
            <React.Fragment>
              {/* <Typography style={{marginTop:"20px",marginLeft:"20px",backgroundColor:"white",width:"200px",height:"50px",textAlign:"center"}} sx={{ mt: 2, mb: 1 }}>{randomnum}</Typography> */}
              <TextField style={{marginTop:"20px",marginLeft:"20px"}}  id="outlined-basic" label="upper number" variant="outlined" />
            </React.Fragment>
          ):""}
          {activeStep === 2 ?( 
          <TextField style={{marginTop:"20px",marginLeft:"20px"}}  id="outlined-basic" label="new password" variant="outlined" />
          ):""}

         
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
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default Stepperr