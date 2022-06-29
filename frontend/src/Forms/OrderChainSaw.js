import React from "react";
import { Box } from "@mui/system";
import { FormGroup, TextField, Typography, Stack } from "@mui/material";

function OrderChainSaw() {
  return (
    <Box bgcolor="">
      <Typography variant="h5" padding={1}>
        Order Chainaw
      </Typography>
      <Stack spacing={1}>
        <TextField id="outlined-basic" label="Customer Name" variant="outlined" />

        <TextField id="outlined-basic" label="Guide Bar Type" variant="outlined" />
        <TextField id="outlined-basic" label="Engine Type" variant="outlined" />
        <TextField id="outlined-basic" label="Gear Type" variant="outlined" />
        <TextField id="outlined-basic" label="Chain Type" variant="outlined" />
        <TextField id="outlined-basic" label="Case Type" variant="outlined" />
        <TextField id="outlined-basic" label="Guide Bar Type" variant="outlined" />
        <TextField label="Orderd Chainsaw Amount" variant="outlined" type="number" />
      </Stack>
      <Typography padding={1}>Asignee: {}</Typography>
    </Box>
  );
}

export default OrderChainSaw;
