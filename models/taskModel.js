const mongoose = require("mongoose");
const Task = new mongoose.Schema({
  callbackId: { type: String, required: false },
  callbackUrl: { type: String, required: false },
  asignee: { type: String, required: false },
  lastAsigned: { type: String, required: false },
  deadline: { type: Object, required: false },
  taskname: { type: String, required: true },
  uiLink: { type: String, required: false },
  role: {
    type: String,
    enum: ["admin", "manager", "factory-worker"],
    default: "factory-worker",
  },
  processContext: { type: Object, required: false },
  processInstance: Number,
  deadlineRelativeMinutes: Number,
});
const model = mongoose.model("Task", Task);

module.exports = model;
