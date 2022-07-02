import React from "react";
import { Box } from "@mui/system";
import { FormGroup, TextField, Typography, Stack, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

function CheckParts() {
  const [checkPart, setCheckPart] = useState({
    gear_ok: true,
    case_ok: true,
    guidebar_ok: true,
    engine_ok: true,
    chain_ok: true,
  });

  const handleChange = (event) => {
    setCheckPart({ ...checkPart, [event.target.name]: event.target.checked });
  };

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" paddingTop={5}>
      <Box bgcolor="whitesmoke" padding={2}>
        <Typography variant="h5" padding={1}>
          Check Parts
        </Typography>
        <Stack spacing={1}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  checked={CheckParts.gear_ok}
                  onChange={handleChange}
                  name="gear_ok"
                />
              }
              label="Gear OK"
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  checked={CheckParts.case_ok}
                  onChange={handleChange}
                  name="case_ok"
                />
              }
              label="Case OK"
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  checked={CheckParts.guidebar_ok}
                  onChange={handleChange}
                  name="guidebar_ok"
                />
              }
              label="Guide Bar OK"
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  checked={CheckParts.engine_ok}
                  onChange={handleChange}
                  name="engine_ok"
                />
              }
              label="Engine OK"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={CheckParts.chain_ok}
                  defaultChecked
                  onChange={handleChange}
                  name="chain_ok"
                />
              }
              label="Chain OK"
            />
          </FormGroup>
        </Stack>
        <Typography>Asignee: </Typography>
      </Box>
    </Stack>
  );
}

export default CheckParts;
