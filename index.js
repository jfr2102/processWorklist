var express = require("express");
var cors = require("cors");
var app = express();
var axios = require("axios");
const fs = require("fs");
const mongoose = require("mongoose");
var User = require("./models/userModel")
var Task = require("./models/taskModel")
const mongooseURL = "";

mongoose.connect(mongooseURL);

const port = 22666;

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const schedule =  async () => {
  console.log("Scheduling unassigned / overdue tasks")
  const busyness = userWorkLoad();

  admins = busyness.filter(user => { user.role === "admin"});
  factory_workers = busyness.filter(user => { user.role === "factory_worker"});
  manager = busyness.filter(user => { user.role === "manager"});

  unassigned_tasks = await Task.find({assignee: ""});
  for ( task of unassigned_tasks ) {

    var leastbusy = {};

   switch (task.role){
    case "admin":
      leastbusy = [...admins].sort((a,b) => a.taskCount - b.taskCount )[0];
    case "factory_worker":
      leastbusy = [...factory_workers].sort((a,b) => a.taskCount - b.taskCount )[0];
    case "manager": 
      leastbusy = [...manager].sort((a,b) => a.taskCount - b.taskCount )[0];
   }
   console.log("Scheduled for: " +  leastbusy.username)
   Task.findByIdAndUpdate(task._id, {assignee: leastbusy.username})
  }
}

const userWorkLoad = async () =>  {
 // für alle nutzer die tasks rasusuchen die für ihn assigned sind
 users = await Users.find({});
 tasks = await Tasks.find({});

 busyness = []
 for (user of users){
  //size? 
  hisTasks = tasks.filter((task) => task.assigne === user.username).length
  busyness = [...busyness, {user: user, taskCount: hisTasks }]
  return busyness;
 }
}

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Process Worklist");
});

app.post("worklist/add", async (req, res) => {
  console.log(req.body);
  const cpee_callback = req.headers["cpee-callback"].slice(0, -1);
  const cpee_callback_id = req.headers["cpee-callback-id"];

  try {
    await Task.create({
    callbackId: cpee_callback_id,
    callbackUrl: cpee_callback,
    deadline: req.body.deadline,
    taskname: req.body.taskname,
    uiLink: req.body,
    role: req.body.role

  })
} catch (exception) {
  console.log(exception);
}
//schedule everything whenever a new task is added?
schedule();
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

app.post("/user", (req,res) => {
  User.create(req.body).then((result) => {
    res.json(result)
  }).catch((error) => {
    console.log(error)
  })
});
app.get("/worklist", (req, res) => {
  // send back all worklist items that this user could pick up 
 console.log("Get worklist for: " + req.body.user)
 Task.find({user: req.body.user}, (err, result) => {
  if(err){
    res.status(500).json(err);
  } else {
    res.json(result);
  }
 })
});



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
