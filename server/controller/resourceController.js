const Resource = require("../models/Resource");

const createResource = async (req, res) => {
    const { title, type, link, tags, uploadedBy, classID } = req.body;

    try {
        const foundClass = await Class.findById(classID);
        if (!foundClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        if(!foundClass.members.includes(req.user.UserId)) {
            return res.status(403).json({ message: "Access denied" });
        }

        const newResource = new Resource({
            title,
            type,
            link,
            tags,
            uploadedBy: req.user.UserId,
            classID,
        });

        await newResource.save();

        res.status(201).json({ message: "Resource created", resource: newResource });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
/*
const getResourcesByClass = async (req, res) => {
    try {
        const resources = await Resource.find({ classID: req.params.classID });
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
*/

const getResourcesByClass = async (req, res) => {
    try {
        const foundClass = await Class.findById(req.params.classID);
        if (!foundClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        if(!foundClass.members.includes(req.user.UserId)) {
            return res.status(403).json({ message: "Access denied" });
        }

        const resources = await Resource.find({ classID: req.params.classID });
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
};

const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        const foundClass = await Class.findById(resource.classID);
        if (!foundClass) {
            return res.status(404).json({ message: "Class not found" });
        }
        const isCreator = String(resource.uploadedBy) === String(req.user.UserId);
        const isOwner = String(foundClass.owner) === String(req.user.UserId);

        if (!isCreator && !isOwner) {
            return res.status(403).json({ message: "Access denied" });
        }

        await Resource.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Resource deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createResource, getResourcesByClass, deleteResource };
