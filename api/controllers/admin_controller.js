const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Admin_model = require("../models/admin_model");
//const User_model = require("../model/user_model");
const bcrypt = require('bcrypt');
const path = require("path");

exports.signup = (req,res,next)=> {

    // res.status(200).json({
    //     message:"here we signup"
    // });

    Admin_model.find({name:req.body.name})
    .exec()
    .then(result=>{
        console.log(result);
        //an vrethei sthn vasei to emailtote den kanoume tpt 
        if(result.length==0){ //an den vrethei sthn vash pame kai ton apothikevoume
            console.log("apothikeysh sthn vash ");
            bcrypt.hash(req.body.password,10,(err,hash)=>{//ayto den ginetai decrypt
                if(err!=null){//error we cound not hash it 
                    return res.status(500).json({
                        error:err
                    });
                }
                else{
                    const user = new Admin_model({
                        _id:new mongoose.Types.ObjectId(),                     
                        name:req.body.name,
                        email:req.body.name,
                        password:hash,
                    });

                    user.save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            mesage:'User created',
                            user:user
                        });
                    })
                    .catch(error=>{
                        console.log(error);
                        res.status(500).json({
                            error:error
                        });
                    });

                   
                    
                }
            });

        }
        else {
            console.log("o admin einai hdh sthn bash");
            //return res.redirect('/admin/signup');
            return res.status(201).json({
                mesage:'Admin  already exists'
            })
            //next();
            //res.redirect("/");
        }
    })
    .catch(error=>{
        res.status(500).json({
            message : error
        });
    })

};
//controller for updating a User
exports.update_signup = (req,res,next)=>{
    console.log("update_signup");
    bcrypt.hash(req.body.password,10,(err,hash)=>{//ayto den ginetai decrypt
        if(err!=null){//error we cound not hash it 
            return res.status(500).json({
                error:err
            });
        }
        else{
            Admin_model.update({name:req.body.name} ,{
                email:req.body.email,
                name:req.body.name,
                password:hash

            }) 
            .exec()
            .then(result=>{
                res.status(200).json({
                    message:result
                });
            })
            .catch(err=>{
                return res.status(500).json({
                    error:err
                });
            })
            
        }
    });

   
};
//controller that returns all users from the database
exports.get_users = (req,res,next)=>{
    Admin_model.find()
    .exec()
    .then(result=>{
        res.status(200).json({
            users:result
        });
    })
    .catch(err=>{
        return res.status(500).json({
            error:err
        });
    })
}

exports.login = (req,res,next)=>{//post request login
    if(req.body.name==null){
        res.status(404).json({
            error:"give name"
        })

    }
    Admin_model.find({name:req.body.name})
    .exec()
    .then(result=>{
       //afou brethei o user
    //    console.log("printing result\n");
    //    console.log(result);
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
    })
    .catch(error=>{
        res.status(500).json({
            message : error 
        });
    })
   
    // res.status(200).json({
    //     message:"here perform login post request"
    // });
};

exports.logout = (req,res,next)=>{
    console.log("logouttttttt\n");
    req.session.destroy(function(err) {
        if(err) {
          console.log(err);
        } else {
         console.log("logout successfully")
         res.status(200).json({
             message:"loged out successfully"
         })
        }
      });
}

