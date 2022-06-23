var express = require("express");
var cors = require("cors");
var app = express();
var axios = require("axios");
const fs = require("fs");
const port = 22666;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Process Worklist");
});

app.post("/add", (req, res) => {
  console.log("add task");
  const cpee_callback = req.headers["cpee-callback"];
  const cpee_callback_id = req.headers["cpee-callback-id"];
  console.log(cpee_callback);

  fs.writeFile("/callbacks/" + cpee_callback_id, cpee_callback, { flag: "a" }, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

  res.set("CPEE-CALLBACK", true);
  res.json({ test: "newWorkListItem" });
});
///:id
app.get("/callbacks/:id", (req, res) => {
  console.log("callbacks: " + req.params.id);
  axios
    .get(`https://cpee.org/flow/engine/${req.params.id}/callbacks/`)
    .then((response) => {
      console.log(response.data);
      res.json({ html: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
