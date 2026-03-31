const express = require("express");
const router = express.Router();

const { createClass, joinClass, getClass } = require("../controller/classController");

router.post("/create", createClass);
router.post("/join", joinClass);
router.get("/:id", getClass);

module.exports = router;
