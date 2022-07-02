import { Button, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

function CheckParts({ host, task }) {
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

  const handleSubmit = () => {
    Axios.delete(host + "/worklist/" + task._id, { data: checkPart });
  };

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" paddingTop={5}>
      <Box bgcolor="whitesmoke" padding={2}>
        <Typography variant="h5" padding={1}>
          Check Parts
        </Typography>
        <Stack spacing={1} justifyContent="center" alignItems="center">
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
          <Button type="submit" variant="contained" sx={{ width: "10%" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
        {/* <Typography>Asignee: {task.asignee}</Typography> */}
      </Box>
    </Stack>
  );
}

export default CheckParts;
