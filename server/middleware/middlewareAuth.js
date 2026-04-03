const token = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let tokenValue = req.headers.authorization?.split(" ")[1];

    if(!tokenValue) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = token.verify(tokenValue, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token", error: error.message });
    }
};

module.exports = {authMiddleware};