const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jsonToken = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/emailService");



const userRegister = async (req, res) => {
  const {FirstName, LastName, Email, Login, Password } = req.body;

    try {  
        const alreadyExists = await User.findOne({ Login });
        if (alreadyExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const crypto = require("crypto");
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const newUser = new User({
            UserId: Date.now(),
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Login: Login,
            Password: hashedPassword,
            isVerified: false,
            verificationToken: verificationToken,
            verificationTokenExpires: Date.now() + 3600000, // 1 hour
        });
            console.log("Before saving:", newUser);
            await newUser.save();
            console.log("After saving:", newUser);
            await sendVerificationEmail(Email, verificationToken);

        res.status(201).json({ message: "User registered successfully, please check your email for account verification", user: newUser.Login, });
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

        if(!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email before logging in" });
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

const emailVerification = async (req, res) => {
    try {
        console.log("CONNECTED DB:", User.db.name);
        console.log("USER COLLECTION:", User.collection.name);
        console.log("TOKEN FROM URL:", req.params.token);
        const allUsers = await User.find({});
console.log("TOTAL USERS FOUND BY APP:", allUsers.length);

const matchingUsers = await User.find({ verificationToken: req.params.token });
console.log("MATCHING USERS:", matchingUsers);


        const user = await User.findOne({ verificationToken: req.params.token, verificationTokenExpires: { $gt: Date.now() } });
        console.log("USER FOUND:", user);
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpires = null;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const resendVerificationEmail = async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        const crypto = require("crypto");
        user.verificationToken = crypto.randomBytes(32).toString("hex");
        user.verificationTokenExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Here we would send the email with the new verification token
        await sendVerificationEmail(user.Email, user.verificationToken);

        res.status(200).json({ message: "Verification email resent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const passwordReset = async (req, res) => {};

const forgotPassword = async (req, res) => {};


module.exports = { userRegister, userLogin, emailVerification, resendVerificationEmail, passwordReset, forgotPassword };
