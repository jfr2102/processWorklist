import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { TextField, Stack, Button } from '@mui/material';
import { Axios } from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';

function Worklist() {
const [user, setUser] = useState("admin")

const [tasks, setTasks] = useState([{
    callbackId: "callbackId",
    callbackUrl: "url",
    asignee: "Johannes",
    deadline: "21.01.2023",
    role: "factory.worker",
    taskName: "Order Chainsaw",
    uiLink: "/order_chainsaw"
},{
    callbackId: "callbackId",
    callbackUrl: "url",
    asignee: "Johannes",
    deadline: "21.01.2023",
    role: "factory.worker",
    taskName: "Order Chainsaw",
    uiLink: "/order_chainsaw"
}])    
const handleLogin = () => {

}
  return(<Box padding={3}>
    <Stack spacing={2}>
    <Typography variant="h4">Worklist:</Typography>
    <Typography>{ "Please Enter your username"}</Typography>
    <TextField id="outlined-basic" value={user} label="Username" variant="outlined" onInput={(event)=> setUser(event.target.value)} sx={{width: "20%"}}/>
    <Button variant="contained" sx={{width: "10%"}} onClick={handleLogin}>Submit</Button>

    
    <List>
        {tasks.map((task) => { 
            return(<div>
        <ListItem disablePadding sx={{backgroundColor: "lightblue"}}>
            <ListItemButton sx={{color: "grey"}}>
              <ListItemText> <Typography variant = "normal">{task.taskName}</Typography></ListItemText>
            </ListItemButton>
          </ListItem> <Divider></Divider></div>);})}
        </List>
    </Stack>
  </Box>);
}

export default Worklist