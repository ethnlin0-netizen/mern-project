const express = require("express");
const router = express.Router();

const { createClass, joinClass, getClass, getMyClasses, searchClasses, leaveClass, deleteClass } = require("../controller/classController");
const { authMiddleware } = require("../middleware/middlewareAuth");

router.post("/create", authMiddleware, createClass);
router.post("/join", authMiddleware, joinClass);
router.get("/user/me", authMiddleware, getMyClasses);
router.get("/search", authMiddleware, searchClasses);
router.post("/leave/:id", authMiddleware, leaveClass);
router.delete("/delete/:id", authMiddleware, deleteClass);
router.get("/:id", authMiddleware, getClass);


module.exports = router;
