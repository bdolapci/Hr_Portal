import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import '../styles/SideBar.scss';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import jwt_decode from "jwt-decode";
export default function SideBar(){

  var token=localStorage.getItem("User");
  var decoded = jwt_decode(token);

return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        anchor="left"
        
      >
        <List sx={{top:'30%'}} > 
          
                {decoded.userRole==="hr" ?<>
                <ListItem  button component={Link}  to="/hrPanel/home" >
              <ListItemIcon>
                  <HomeIcon/>
                </ListItemIcon>Home</ListItem>
                <ListItem  button component={Link}  to="/hrPanel/jobs" >
             <ListItemIcon>
                 <WorkIcon/>
                 </ListItemIcon>Jobs</ListItem> 
                </> :
                <>
                 <ListItem  button component={Link}  to="/adminPanel" >
              <ListItemIcon>
                  <HomeIcon/>
                </ListItemIcon>Home</ListItem>
                 <ListItem  button component={Link}  to="/adminpanel/users" >
                 <ListItemIcon>
                     <WorkIcon/>
                     </ListItemIcon>Users</ListItem>
                     <ListItem  button component={Link}  to="/adminpanel/hr" >
                 <ListItemIcon>
                     <WorkIcon/>
                     </ListItemIcon> Hr</ListItem>
                     <ListItem  button component={Link}  to="/adminpanel/jobs" >
                 <ListItemIcon>
                     <WorkIcon/>
                     </ListItemIcon>Jobs</ListItem>
                </>}
            
        </List>
      </Drawer>

    </Box>
  );
}