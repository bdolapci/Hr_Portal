import { Card,CardContent, TextField,Box } from '@mui/material'
import React from 'react'
import DatePicker from './DatePicker'
function PostJob(job) {
  return (
    <>
    <Card sx={{marginBottom:"5%"}}>
        <CardContent sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}>
            <form>
                <Box sx={{justifyContent:'space-between'}} >

                <TextField multiline  variant="filled"sx={{ marginRight:"3%" ,"width": "15%" }}></TextField>
                <DatePicker/>
                <TextField multiline variant="filled"sx={{ marginLeft:"3%",marginRight:"3%","width": "15%" }}></TextField>
                <TextField multiline variant="filled"sx={{ marginRight:"3%","width": "15%" }}></TextField>
                <TextField multiline variant="filled"sx={{ marginRight:"3%","width": "15%" }}></TextField>
                </Box>
            </form>
        </CardContent>
    </Card>
    </>
  )
}

export default PostJob