const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jsonToken = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const {FirstName, LastName, Login, Password } = req.body;

    try {  
        const alreadyExists = await User.findOne({ Login });
        if (alreadyExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = new User({
            UserId: Date.now(),
            FirstName: FirstName,
            LastName: LastName,
            Login: Login,
            Password: hashedPassword,
        });

            await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser.Login, });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const userLogin = async (req, res) => {
    const { Login, Password } = req.body;

    try {
        const user = await User.findOne({Login: Login});
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const trueMatch = await bcrypt.compare(Password, user.Password);
        if (!trueMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jsonToken.sign({ userId: user.UserId }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token,});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { userRegister, userLogin };
