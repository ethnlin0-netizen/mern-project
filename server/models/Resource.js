const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    title: String,
    type: String,
    link: String,
    tags: [String],
    uploadedBy: String,
    classID: String,
});

module.exports = mongoose.model("Resource", resourceSchema, "Resource");
