import React from "react";
import { Box } from "@mui/system";
import { FormGroup, TextField, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderChainSaw({ host, task }) {
  const navigate = useNavigate();
  // const location = useLocation();
  // const task = location.state ? location.state.task : {};
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

  const handleSubmit = async () => {
    console.log("delete: ", task, " with: ", chainSawOrder);
    await Axios.delete(host + "/worklist/" + task._id, { data: chainSawOrder });
    navigate("/ports/8123/ui");
  };
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      paddingTop={5}
      spacing={2}
    >
      <Box bgcolor="whitesmoke" padding={2}>
        <Typography variant="h5" padding={1}>
          Order Chainaw
        </Typography>
        <Stack spacing={1} justifyContent="center" alignItems="center">
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
          <Button type="submit" variant="contained" sx={{ width: "10%" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>

        {/* <Typography>Asignee: {task.asignee}</Typography> */}
      </Box>
      <Box bgcolor="lightblue" paddingTop={5}>
        <Typography>Process Instance: {task.processInstance}</Typography>
        <Typography> {JSON.stringify(task.processContext)}</Typography>
        {/* {Object.keys(task.processContext).map((key) => (
          <Typography>{JSON.stringify(task.processContext[key])}</Typography>
        ))} */}
      </Box>
    </Stack>
  );
}

export default OrderChainSaw;
