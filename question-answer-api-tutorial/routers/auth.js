const express = require('express');
const { register,getUser,login,logout,imageUpload } = require('../controllers/auth')
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const profileImageUpload  = require("../middlewares/libraries/profileImageUpload")
const router = express.Router();


router.post("/register", register);
router.get("/profile",getAccessToRoute, getUser);
router.post("/login",login);
router.get("/logout",getAccessToRoute,logout);
router.post(
    "/uploads",
    [getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload);

module.exports =router;
