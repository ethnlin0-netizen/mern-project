const express = require("express");
const router = express.Router();

const { createResource, getResourcesByClass } = require("../controller/resourceController");

router.post("/", createResource);
router.get("/:classID", getResourcesByClass);

module.exports = router;
