const express = require("express");
const router = express.Router();

const { createClass, joinClass, getClass, getMyClasses } = require("../controller/classController");
const { authMiddleware } = require("../middleware/middlewareAuth");

router.post("/create", createClass);
router.post("/join", joinClass);
router.get("/:id", authMiddleware, getClass);
router.get("/user/me", authMiddleware, getMyClasses);  

module.exports = router;
