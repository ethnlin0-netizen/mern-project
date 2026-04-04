const express = require("express");
const router = express.Router();
const { createResource, getResourcesByClass } = require("../controller/resourceController");
const { authMiddleware } = require("../middleware/middlewareAuth");

router.post("/", authMiddleware, createResource);
router.get("/class/:classID", authMiddleware , getResourcesByClass);

module.exports = router;
