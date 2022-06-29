import React, { useEffect } from "react";
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
import { useState } from "react";

function Worklist() {
  const local = true;
  const host = local ? "http://localhost:22666" : "https://lehre.bpm.in.tum.de/ports/22666";

  const [tasks, setTasks] = useState([
    {
      _id: "62bc6096aaf812d96c9187bd",
      taskname: "order Dummy",
      uiLink: "somehwere",
      role: "admin",
      __v: 0,
      asignee: "johannes",
    },
    {
      _id: "62bc628154ba49821a8f452e",
      taskname: "Task 2",
      uiLink: "somehwere",
      role: "admin",
      __v: 0,
      asignee: "johannes",
    },
  ]);

  const [user, setUser] = useState("");

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
          sx={{ width: "20%" }}
        />
        <Button variant="contained" sx={{ width: "10%" }} onClick={handleLogin}>
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
                  <ListItemButton sx={{ color: "grey" }}>
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