import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function Jobcard(Categoryex) {


  return (
    <>
     <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {Categoryex.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {Categoryex.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">See Jobs</Button>
      </CardActions>
    </Card>
    </>
  )
}

export default Jobcard