import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { TextField, Stack, Button } from "@mui/material";
import Axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import { useNavigate } from "react-router-dom";

//TODO: process context visualiesieren irgendwie
// - anzeigen welche instanz des prozesses es gerade ist
function Worklist({ setProcessContext, user, setUser, host, setTask }) {
  let navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const handleLogin = () => {
    console.log("login:" + user);
    Axios.get(host + "/worklist/" + user).then((response) => {
      console.log(response.data);
      setTasks(response.data);
    });
  };

  const handleUnasign = async (task) => {
    await Axios.patch(host + "/worklist/unasign/" + task._id, {}).then((response) => {
      console.log(response);
    });

    Axios.get(host + "/worklist/" + user).then((response) => {
      console.log(response.data);
      setTasks(response.data);
    });
  };

  const handleTask = (task) => {
    console.log(task);
    //setProcessContext(task.processContext);
    setTask(task);
    navigate(task.uiLink);
  };
  return (
    <Box padding={3}>
      <Stack spacing={2}>
        <Typography variant="h4">Worklist:</Typography>
        <Typography>{"Please Enter your username"}</Typography>
        <TextField
          id="outlined-basic"
          value={user}
          label="Username"
          variant="outlined"
          onChange={(event) => setUser(event.target.value)}
          onSubmit={handleLogin}
          sx={{ width: "20%" }}
        />
        <Button type="submit" variant="contained" sx={{ width: "10%" }} onClick={handleLogin}>
          Submit
        </Button>
        <Typography variant="h5">Tasks assigned to you: </Typography>
        <List>
          {tasks.map((task) => {
            return (
              <div>
                <ListItem
                  disablePadding
                  sx={{ backgroundColor: "lightblue" }}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleUnasign(task)}>
                      <PersonRemoveIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton sx={{ color: "grey" }} onClick={() => handleTask(task)}>
                    <ListItemText>
                      <Typography variant="normal">{task.taskname}</Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <Divider></Divider>
              </div>
            );
          })}
        </List>
      </Stack>
    </Box>
  );
}

export default Worklist;
