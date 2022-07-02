import React from "react";
import { Box } from "@mui/system";
import { FormGroup, TextField, Typography, Stack } from "@mui/material";
import { useState } from "react";

function OrderChainSaw() {
  const [chainSawOrder, setChainSawOrder] = useState({
    name: "",
    guide_bar: "",
    engine_type: "",
    gear_type: "",
    chain_type: "",
    case_type: "",
    amount: 0,
  });

  const handleChange = (event) => {
    setChainSawOrder({ ...chainSawOrder, [event.target.name]: event.target.value });
  };

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" paddingTop={5}>
      <Box bgcolor="whitesmoke" padding={2}>
        <Typography variant="h5" padding={1}>
          Order Chainaw
        </Typography>
        <Stack spacing={1}>
          <TextField
            id="outlined-basic"
            label="Customer Name"
            variant="outlined"
            // // value={chainSawOrder.name}
            onChange={handleChange}
            name="name"
          />
          <TextField
            id="outlined-basic"
            label="Engine Type"
            variant="outlined"
            value={chainSawOrder.engine_type}
            onChange={handleChange}
            name="engine_type"
          />
          <TextField
            id="outlined-basic"
            label="Gear Type"
            variant="outlined"
            onChange={handleChange}
            name="gear_type"
            value={chainSawOrder.gear_type}
          />
          <TextField
            id="outlined-basic"
            label="Chain Type"
            variant="outlined"
            onChange={handleChange}
            name="chain_type"
            value={chainSawOrder.chain_type}
          />
          <TextField
            id="outlined-basic"
            label="Case Type"
            variant="outlined"
            onChange={handleChange}
            name="case_type"
            value={chainSawOrder.case_type}
          />
          <TextField
            id="outlined-basic"
            label="Guide Bar Type"
            variant="outlined"
            value={chainSawOrder.guide_bar}
            onChange={handleChange}
            name="guide_bar"
          />
          <TextField
            label="Orderd Chainsaw Amount"
            variant="outlined"
            type="number"
            value={chainSawOrder.amount}
            onChange={handleChange}
            name="amount"
          />
        </Stack>
        <Typography>Asignee: {}</Typography>
      </Box>
    </Stack>
  );
}

export default OrderChainSaw;
