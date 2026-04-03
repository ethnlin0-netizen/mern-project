const express = require("express");
const router = express.Router();

const { userRegister, userLogin, emailVerification, resendVerificationEmail} = require("../controller/authController");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/verify-email/:token", emailVerification);
router.post("/resend-verification", resendVerificationEmail);

module.exports = router;