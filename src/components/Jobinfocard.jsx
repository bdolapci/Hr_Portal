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
import Stack from '@mui/material/Stack';
function Jobcard(props) {
  const navigate = useNavigate();
  function jobInfo(){
        navigate('/jobinfo/'+props.id)
  }


  return (
    <>
     
    <Card sx={{ display: 'flex'}}>
    <Button onClick={jobInfo} variant='contained' style={{height:"75px", width:"80px",marginTop:"35px", marginRight:"20px", marginLeft:"10px"}}>Apply Job</Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', width:"70%" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {props.Name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {props.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={banner}
        alt="Live from space album cover"
      />
      
    </Card>
    
    </>
  )
}

export default Jobcard