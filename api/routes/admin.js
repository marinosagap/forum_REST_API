const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Admin_model = require("../models/admin_model");
const bcrypt = require('bcrypt');
const admin_controller = require("../controllers/admin_controller");
const sessionChecker = require("../middleware/sessionChecker");
var path    = require("path");

router.get("/",sessionChecker,(req,res,next)=>{
    //res.redirect("/login");
    return res.sendFile(path.join(__dirname+'/../public/html/home.html'));

})
router.route("/signup")
    .post(admin_controller.signup)
    .get((req,res,next)=>{
        try{
            return res.sendFile(path.join(__dirname+'/../public/html/admin_signup.html'));
            //return res.status(200).sendFile('../public/html/login.html');
       }
       catch(error){
           return res.status(500).send("error opening file");
       }   
    })

router.route("/login")
    .post( admin_controller.login)
    .get(sessionChecker,(req,res,next) =>{
        
       console.log("get login ");
       try{
            return res.sendFile(path.join(__dirname+'/../public/html/admin_login.html'));
            //return res.status(200).sendFile('../public/html/login.html');
       }
       catch(error){
           return res.status(500).send("error opening file");
       }        
});

router.patch("/update_admin",admin_controller.update_signup);

router.get("/getusers",sessionChecker,admin_controller.get_users);

router.get("/logout",admin_controller.logout);
module.exports = router;