import React from "react";
import { Box } from "@mui/system";
import { FormGroup, TextField, Typography, Stack, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

function RecieveFeedback() {
  const [feedback, setFeedback] = useState({
    approved: true,
    info: "",
  });
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" paddingTop={5}>
      <Box bgcolor="whitesmoke" padding={2}>
        <Typography variant="h5" padding={1}>
          Check Parts
        </Typography>
        <Stack spacing={1}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Approved Prototype" />
          </FormGroup>
          <TextField id="outlined-basic" label="Additional Feedback" variant="outlined" />
        </Stack>
        <Typography padding={1}>Asignee: {}</Typography>
      </Box>
    </Stack>
  );
}

export default RecieveFeedback;
