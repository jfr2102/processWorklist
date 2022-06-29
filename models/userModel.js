const mongoose = require("mongoose");
const User = new mongoose.Schema(
    {   
        username: String,
        role: {
            type: String,
            enum: ["admin", "manager", "factory-worker" ],
            default: "factory-worker"
        }
    });
    const model = mongoose.model("User", User)

    module.exports = model;