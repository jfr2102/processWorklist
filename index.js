var express = require("express");
var cors = require("cors");
var app = express();
var axios = require("axios");
const fs = require("fs");
const mongoose = require("mongoose");
var User = require("./models/userModel");
var Task = require("./models/taskModel");
const { useParams } = require("react-router-dom");
const mongooseURL =
  "mongodb+srv://admin:HtNuRC5G0imkW7I5@cluster0.w8czfkx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongooseURL);

const port = 22666;

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const schedule = async () => {
  console.log("Scheduling unassigned / overdue tasks");
  const busyness = await userWorkLoad();
  busyness.sort((a, b) => {
    a.user.taskCount - b.user.taskCount;
  });
  console.log(busyness);
  console.log("_____________");
  var admins = busyness.filter((tuple) => {
    return tuple.user.role === "admin";
  });
  var factory_workers = busyness.filter((tuple) => {
    return tuple.user.role === "factory_worker";
  });
  var managers = busyness.filter((tuple) => {
    return tuple.user.role === "manager";
  });

  unassigned_tasks = await Task.find({ asignee: "" });
  for (task of unassigned_tasks) {
    switch (task.role) {
      case "admin":
        //TODO FILTER wie unten:
        leastbusy = admins.filter((tuple) => {
          return tuple.user.username != task.lastAsigned;
        })[0];

        console.log(leastbusy);
      case "factory_worker":
        leastbusy = factory_workers.filter((tuple) => {
          return tuple.user.username != task.lastAsigned;
        })[0];
      case "manager":
        leastbusy = managers.filter((tuple) => {
          return tuple.user.username != task.lastAsigned;
        })[0];
    }

    await Task.findOneAndUpdate({ _id: task._id }, { asignee: leastbusy.user.username });
  }
};

const userWorkLoad = async () => {
  // für alle nutzer die tasks rasusuchen die für ihn assigned sind
  users = await User.find({});
  tasks = await Task.find({});

  busyness = [];
  for (user of users) {
    //size?
    hisTasks = tasks.filter((task) => task.assigne === user.username).length;
    busyness = [...busyness, { user: user, taskCount: hisTasks }];
    return busyness;
  }
};

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
      // deadline: req.body.deadline,
      taskname: req.body.taskname,
      uiLink: req.body,
      role: req.body.role,
    });
  } catch (exception) {
    console.log(exception);
  }
  //schedule everything whenever a new task is added?
  schedule();
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

app.post("/user", (req, res) => {
  User.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/orgmodel", (req, res) => {
  User.find({}, (err, result) => {
    err ? res.status(500).json(err) : res.json(result);
  });
});

app.get("/worklist/:user", (req, res) => {
  // send back all worklist items that this user could pick up
  console.log(req.params.user);
  Task.find({ asignee: req.params.user }, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/worklist", (req, res) => {
  Task.find({}, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/worklist/addDummy", async (req, res) => {
  console.log(req.body);
  try {
    await Task.create({
      taskname: req.body.taskname,
      uiLink: req.body.uiLink,
      role: req.body.role,
    });
  } catch (exception) {
    console.log(exception);
  }
  //schedule every unassigned or marked task whenever a new task is added //TODO: also add a timer to reschedule at least once a day e.g. (to check the deadlines)
  schedule();
  res.json("Added Taks");
});

app.delete("/worklist", async (req, res) => {
  Task.deleteMany({}, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.patch("/worklist/unasign/:task", async (req, res) => {
  console.log("UNASIGN:" + req.params.task);
  const task = await Task.findById(req.params.task);

  const updated = await Task.findByIdAndUpdate(req.params.task, {
    asignee: "",
    lastAsigned: task.asignee,
  });
  res.json(updated);
});

//UI send to this endpoint when completing the task
app.delete("/worklist/:task", async (req, res) => {
  task = await Task.findById(req.params.task);
  axios.put(task.callbackUrl);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
