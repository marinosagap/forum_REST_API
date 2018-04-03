const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user_controller= require("../controllers/user_controller");
router.route("/signup")
    .get(user_controller.signup_get)
    .post(user_controller.signup_post);

router.route("/login")
    .get(user_controller.login_get)
    .post(user_controller.login_post);

router.get("/home",user_controller.home_get);

router.get("/",user_controller.get_userlist); //return all users

module.exports = router;

