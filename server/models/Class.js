const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    className: String,
    joinCode: String,
    members: [String],
    owner: String,
});

module.exports = mongoose.model("Class", classSchema, "Class");
