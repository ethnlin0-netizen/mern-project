const Class = require("../models/Class");

const createClass = async (req, res) => {
    const { className } = req.body;
    const owner = req.user.userId.toString(); // from token, not req.body

    try {
        const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const newClass = new Class({ className, joinCode, members: [owner], owner });
        await newClass.save();
        res.status(201).json({ message: "Class created", class: newClass });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const joinClass = async (req, res) => {
    const { joinCode } = req.body;
    const userId = req.user.userId.toString();

    try {
        const foundClass = await Class.findOne({ joinCode });
        if (!foundClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        if (foundClass.owner == userId || foundClass.members.includes(userId)) {
            return res.status(400).json({ message: "Already a member" });
        }

        foundClass.members.push(userId);
        await foundClass.save();

        res.status(200).json({ message: "Joined class", class: foundClass });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getClass = async (req, res) => {
    try {
        const foundClass = await Class.findById(req.params.id);
        if (!foundClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        res.status(200).json(foundClass);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getMyClasses = async (req, res) => {
    try {
        const myClasses = await Class.find({ members: req.user.userId.toString() });
        res.status(200).json(myClasses);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const searchClasses = async (req, res) => {
    const { query } = req.query;

    try {
        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }
        const classes = await Class.find({ className: { $regex: query, $options: "i" } });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createClass, joinClass, getClass, getMyClasses, searchClasses };
