const mongoose = require("mongoose");
const Task = new mongoose.Schema(
    {
        callbackId: String,
        callbackUrl: String,
        asignee: String,
        deadline: Date,
        taskname: String, 
        uiLink: String,
        role: {
            type: String,
            enum: ["admin", "manager", "factory-worker" ],
            default: "factory-worker"
        }
    });
    const model = mongoose.model("Task", Task)

    module.exports = model;
