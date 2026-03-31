const Resource = require("../models/Resource");

const createResource = async (req, res) => {
    const { title, type, link, tags, uploadedBy, classID } = req.body;

    try {
        const newResource = new Resource({
            title,
            type,
            link,
            tags,
            uploadedBy,
            classID,
        });

        await newResource.save();

        res.status(201).json({ message: "Resource created", resource: newResource });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getResourcesByClass = async (req, res) => {
    try {
        const resources = await Resource.find({ classID: req.params.classID });
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createResource, getResourcesByClass };
