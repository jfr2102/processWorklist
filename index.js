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
var cron = require("node-cron");
const { updateMany } = require("./models/userModel");

mongoose.connect(mongooseURL);

const port = 22666;

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

//unassign tasks which are over the daedline
cron.schedule("* * * * *", async () => {
  console.log("running deadline check each minute");
  tasks = await Task.find({ asignee: { $ne: "" } });
  now = new Date();
  overdueTasks = tasks.filter((task) => {
    return task.deadline.getTime() <= now.getTime();
  });
  console.log(overdueTasks.length);

  for (var task of overdueTasks) {
    console.log("OVERDUE TASK: ", task._id, "asignee:", task.asignee);
    const datenow = new Date();
    const newDeadline = new Date(datenow.getTime() + task.deadlineRelativeMinutes * 60000);

    await Task.findOneAndUpdate(
      { _id: task._id },
      { asignee: "", lastAsigned: task.asignee, deadline: newDeadline }
    );
  }
  schedule();
});

const schedule = async () => {
  console.log("Scheduling unassigned / overdue tasks");
  var busyness = await userWorkLoad();

  busyness.sort((a, b) => {
    return a.taskCount - b.taskCount;
  });

  var admins = busyness.filter((tuple) => {
    return tuple.user.role === "admin";
  });

  var factory_workers = busyness.filter((tuple) => {
    return tuple.user.role === "factory-worker";
  });
  var managers = busyness.filter((tuple) => {
    return tuple.user.role === "manager";
  });

  unassigned_tasks = await Task.find({ asignee: "" });
  for (task of unassigned_tasks) {
    //console.log("Unassigned Task; " + task + "/n");
    if (task.role === "admin") {
      leastbusy = admins.filter((tuple) => {
        return tuple.user.username !== task.lastAsigned;
      })[0];
    } else if (task.role === "factory-worker") {
      leastbusy = factory_workers.filter((tuple) => {
        return tuple.user.username != task.lastAsigned;
      })[0];
    } else if (task.role === "manager") {
      leastbusy = managers.filter((tuple) => {
        return tuple.user.username != task.lastAsigned;
      })[0];
    }
    console.log("leastbusy: ", leastbusy);
    console.log("lastAsigned");
    await Task.updateMany({ _id: task._id }, { asignee: leastbusy.user.username });
  }
};

const userWorkLoad = async () => {
  // für alle nutzer die tasks rasusuchen die für ihn assigned sind
  users = await User.find({});
  tasks = await Task.find({});
  busyness = [];
  for (user of users) {
    //size?
    hisTasks = tasks.filter((task) => task.asignee === user.username).length;
    busyness = [...busyness, { user: user, taskCount: hisTasks }];
  }
  return busyness;
};

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Process Worklist API");
});

app.post("/worklist/add", async (req, res) => {
  console.log(req.body);
  const cpee_callback = req.headers["cpee-callback"].slice(0, -1);
  const cpee_callback_id = req.headers["cpee-callback-id"];
  const cpee_instance = req.headers["cpee-instance"];
  const cpee_label = req.headers["cpee-label"];
  const datenow = new Date();
  const deadline = new Date(datenow.getTime() + req.body.deadlineMinutes * 60000);

  try {
    await Task.create({
      callbackId: cpee_callback_id,
      callbackUrl: cpee_callback,
      processInstance: cpee_instance,
      taskname: cpee_label,
      asignee: "",
      uiLink: req.body.uiLink,
      role: req.body.role,
      deadline: deadline,
      processContext: req.body.processContext,
      deadlineRelativeMinutes: req.body.deadlineMinutes,
    });
  } catch (exception) {
    console.log(exception);
  }
  //schedule everything whenever a new task is added?
  schedule();
  res.set("CPEE-CALLBACK", true);
  res.json({ test: "newWorkListItem" });
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
  console.log(req.params.user);
  Task.find({ asignee: req.params.user }, (err, result) => {
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
  console.log("DONE: ", req.params.task, ", DATABODY: ", req.body);
  var task = await Task.findById(req.params.task);

  var deleted = await Task.findByIdAndDelete(req.params.task);
  console.log(task.callbackUrl, req.body);
  axios
    .put(task.callbackUrl, req.body)
    .then((response) => console.log(response.status))
    .catch((err) => console.log(err));
  res.json(task);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
