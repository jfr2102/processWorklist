var express = require("express");
var cors = require("cors");
var app = express();
var axios = require("axios");

const port = 22666;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Process Worklist");
});

app.post("/add", (req, res) => {
  console.log("add task");
  console.log(req.headers);
  console.log(req.body);
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
