import React from "react";
import { Box } from "@mui/system";
import { FormGroup, TextField, Typography, Stack, FormControlLabel, Checkbox } from "@mui/material";

function RecieveFeedback() {
  return (
    <Box bgcolor="">
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
  );
}

export default RecieveFeedback;
