import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import banner from '../pictures/banner.jpg'
import { useNavigate } from 'react-router-dom';
function Jobcard(props) {
  const navigate = useNavigate();
  function jobInfo(){
        navigate('/jobinfo/'+props.id)
  }

  

  return (
    <>
     
    <Card sx={{ display: 'flex',width:"50rem",alignItems:"center" }}>
    <Button onClick={jobInfo} variant='contained' style={{height:"50px", width:"9rem", marginLeft:"30px"}}>Apply Job</Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', width:"70%" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {props.Name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {props.Category}
          </Typography>
          
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

        </Box>
      </Box>
     <Box sx={{marginRight:"2%",marginTop:"1%" }}>
     {props.photo=="" ? <img src={banner} style={{maxWidth:"250px",borderRadius:"1.125rem"}} alt="empty"/> :
        <img style={{maxWidth:"250px",maxHeight:"200px"}} src={"https://hrportal.blob.core.windows.net/uploadfile/"+props.photo} alt="banner"></img>}  
     </Box>
    </Card>
    </>
  )
}

export default Jobcard