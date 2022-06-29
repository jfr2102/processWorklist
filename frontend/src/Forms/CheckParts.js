import React from "react";
import { Box } from "@mui/system";
import { FormGroup, TextField, Typography, Stack, FormControlLabel, Checkbox } from "@mui/material";

function CheckParts() {
  return (
    <Box bgcolor="">
      <Typography variant="h5" padding={1}>
        Check Parts
      </Typography>
      <Stack spacing={1}>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Gear OK" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Case OK" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Guide Bar OK" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Engine OK" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Chain OK" />
        </FormGroup>
      </Stack>
      <Typography padding={1}>Asignee: {}</Typography>
    </Box>
  );
}

export default CheckParts;
