const express = require("express");
const router = express.Router();
const { createResource, getResourcesByClass, deleteResource} = require("../controller/resourceController");
const { authMiddleware } = require("../middleware/middlewareAuth");

router.post("/", authMiddleware, createResource);
router.get("/class/:classID", authMiddleware , getResourcesByClass);
router.delete("/:id", authMiddleware, deleteResource);

module.exports = router;
