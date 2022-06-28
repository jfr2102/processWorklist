var express = require("express");
var cors = require("cors");
var app = express();
var axios = require("axios");
const fs = require("fs");

const port = 22666;

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Process Worklist");
});

app.post("/add", (req, res) => {
  console.log(req.body);
  const cpee_callback = req.headers["cpee-callback"].slice(0, -1);
  const cpee_callback_id = req.headers["cpee-callback-id"];

  fs.writeFile("callbacks/" + cpee_callback_id, cpe_callback + ";" + JSON.stringify(req.body), { flag: "a" }, (err) => {
    if (err) {
      console.error(err);
    }
  });

  res.set("CPEE-CALLBACK", true);
  res.json({ test: "newWorkListItem" });
});

//brauche eig eig nciht da in file / db hier die info habe und client nicht hiervon direkt fetchen muss?
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
