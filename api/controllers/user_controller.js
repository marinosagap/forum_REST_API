const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const User_model = require("../models/user_model");
//const User_model = require("../model/user_model");
const bcrypt = require('bcrypt');
const path = require("path");

exports.login_get = (req,res,next)=>{
    try{
        return res.sendFile(path.join(__dirname+"/../public/html/user_login.html"));
        // return res.status(200).json({
        //     message:"login page for user"
        // })
       // return res.sendFile(path.join(__dirname+'/../public/html/user_login.html'));
        //return res.status(200).sendFile('../public/html/login.html');
   }
   catch(error){
       return res.status(500).send("error opening file");
   }
};

exports.login_post = (req,res,next)=>{
    console.log(req.body.name, req.body.password);
    User_model.find({username:req.body.name})
    .exec()
    .then(result=>{
        if(result.length === 0){//user not found
            return res.status(200).json({
                message:"user not found"
            })
        }
        else{ //user exists
            console.log("result == ", result);
            console.log(result[0].password);
           // return res.sendFile(path.join(__dirname+"/../public/html/home.html"));
           bcrypt.compare(req.body.password,result[0].password,(err,result2)=>{
                if(err){
                    res.status(404).json({
                        message:"Auth failed",
                        error:err
                    })
                }
                else {
                    if(result2){ //authorised

                        res.status(200).json({
                            message:"login successfull",
                            result:result2
                        });
                    }
                    else {

                        res.status(200).json({
                            message:"login failed",
                            result:result2
                        });
                    }
                //res.redirect("/user/home");
                    //return res.sendFile(path.join(__dirname+'/../public/html/home.html'));

                }
            });
        }
    })
    .catch(error=>{
        res.status(500).json({
            error : error
        });
    })
}

exports.signup_get = (req,res,next)=>{
    try{
        return res.sendFile(path.join(__dirname+"/../public/html/user_signup.html"));
        // return res.status(200).json({
        //     message:"login page for user"
        // })
       // return res.sendFile(path.join(__dirname+'/../public/html/user_login.html'));
        //return res.status(200).sendFile('../public/html/login.html');
   }
   catch(error){
       return res.status(500).send("error opening file");
   }
};

//needs body.name , body.password
exports.signup_post = (req,res,next)=>{
   User_model.find({username: req.body.name})
   .exec()
   .then(result=>{
       console.log(result);
       if(result.length===0){ //den yparxei sthn vash 
            bcrypt.hash(req.body.password,10,(err,hash)=>{//ayto den ginetai decrypt
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user = new User_model({
                        _id:new mongoose.Types.ObjectId(),                     
                        username:req.body.name,
                        password : hash
                    });
                    user.save()
                    .then(result2=>{
                        res.status(200).json({
                            message:"Successfully saved in database",
                            result: result2
                        })
                    })
                    .catch(error=>{
                        res.status(500).json({
                            error:error
                        })
                    })
                }
            });
       }
       else{
           res.status(200).json({
               message:"user already exists"
           })
       }
   })
   .catch(error =>{
       res.status(500).json({
           error:error
       })
   })
};

exports.get_userlist = (req,res,next)=>{
    User_model.find()
    .select("username password _id")
    .exec()
    
    .then(result=>{
        return res.status(200).json({
            message: "List of Users",
            userlist :result
        });

    })
    .catch(error=>{
        res.status(500).json({
            error:errror
        })
    })
}

exports.home_get = (req,res,next)=>{
    try{
        return res.sendFile(path.join(__dirname+"/../public/html/home.html"));
        // return res.status(200).json({
        //     message:"login page for user"
        // })
       // return res.sendFile(path.join(__dirname+'/../public/html/user_login.html'));
        //return res.status(200).sendFile('../public/html/login.html');
   }
   catch(error){
       return res.status(500).send("error opening file");
   }
}