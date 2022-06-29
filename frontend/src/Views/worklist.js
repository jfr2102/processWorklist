import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { TextField, Stack, Button } from '@mui/material';
import { Axios } from 'axios';

function Worklist() {
const [user, setUser] = useState("admin")
const handleLogin = () => {
   
}
  return(<Box flex={4} padding={3}>
    <Stack spacing={2}>
    <Typography variant="h4">Worklist:</Typography>
    <Typography>{ "Please Enter your username"}</Typography>
    <TextField id="outlined-basic" value={user} label="Username" variant="outlined" onInput={(event)=> setUser(event.target.value)} sx={{width: "20%"}}/>
    <Button variant="contained" sx={{width: "10%"}} onClick={handleLogin}>Submit</Button>
    </Stack>
  </Box>);
}

export default Worklist