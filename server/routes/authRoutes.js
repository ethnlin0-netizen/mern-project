const express = require("express");
const router = express.Router();

const { userRegister, userLogin, emailVerification, resendVerificationEmail, passwordReset, forgotPassword} = require("../controller/authController");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/verify-email/:token", emailVerification);
router.post("/resend-verification", resendVerificationEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", passwordReset);
module.exports = router;