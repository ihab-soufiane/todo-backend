const express = require("express");
const { getForgotPasswordView, sendForgotPasswordLink,getResetPasswordView ,resetThePassword} = require("../controllers/passwordController");
const router = express.Router();



//password/forgot-password


router.get("/forgot-password",getForgotPasswordView);
router.post("/forgot-password",sendForgotPasswordLink);
router.get("/password/reset-password/:userId/:token",getResetPasswordView);
router.post("/password/resetThePassword/:userId/:token",resetThePassword);

module.exports =router;