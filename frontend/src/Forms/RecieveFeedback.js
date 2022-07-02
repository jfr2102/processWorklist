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
import { Axios } from "axios";

function RecieveFeedback({ host }) {
  const location = useLocation();
  const task = location.state ? location.state.task : {};
  const [feedback, setFeedback] = useState({
    approved: true,
    info: "",
  });

  const handleSubmit = () => {
    console.log("delete: ", task, " with: ", feedback);
    Axios.delete(host + "/worklist/" + task.id, { data: feedback });
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
          <TextField id="outlined-basic" label="Additional Feedback" variant="outlined" />
          <Button type="submit" variant="contained" sx={{ width: "10%" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
        {/* <Typography padding={1}>Asignee: {task.asignee}</Typography> */}
      </Box>
    </Stack>
  );
}

export default RecieveFeedback;
