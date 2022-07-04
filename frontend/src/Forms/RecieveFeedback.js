import React from "react";
import { Box } from "@mui/system";
import {
  FormGroup,
  TextField,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function RecieveFeedback({ host, task }) {
  const navigate = useNavigate();
  // const location = useLocation();
  // const [task, setTask] = useState(location.state.task);
  const [feedback, setFeedback] = useState({
    approved: true,
    info: "",
  });

  const handleSubmit = async () => {
    console.log("delete: ", task, " with: ", feedback);
    await Axios.delete(host + "/worklist/" + task._id, { data: feedback });
    navigate("/ports/8123/ui");
  };

  const handleChange = (event) => {
    setFeedback({ ...feedback, [event.target.name]: event.target.value });
  };

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" paddingTop={5}>
      <Box bgcolor="whitesmoke" padding={2}>
        <Typography variant="h5" padding={1}>
          Check Parts
        </Typography>
        <Stack spacing={1} justifyContent="center" alignItems="center">
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Approved Prototype" />
          </FormGroup>
          <TextField
            id="outlined-basic"
            label="Additional Feedback"
            variant="outlined"
            onChange={handleChange}
            name="info"
          />
          <Button type="submit" variant="contained" sx={{ width: "10%" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
        <Typography padding={1}>Asignee: </Typography>
      </Box>

      <Typography>Process Instance: {task.processInstance}</Typography>
      <Typography> {JSON.stringify(task.processContext)}</Typography>
      <Box bgcolro="lightblue" paddingTop={5}>
        {Object.keys(task.processContext).map((key) => (
          <Typography>{JSON.stringify(task.processContext[key])}</Typography>
        ))}
      </Box>
    </Stack>
  );
}

export default RecieveFeedback;
