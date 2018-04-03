module.exports = (req,res,next)=>{
    console.log("req.session == "+JSON.stringify(req.session) );
        if(req.session.user && req.cookie.user_id){ //an synethoume me session koble proxwrame
        //    return  res.status(404).json({
        //         message:"User logedin with session"
        //     });
            //next();
            console.log("loged in with session")

            res.redirect("/")
        }
        else {
                console.log("here we have to login witout session")
            //here we have to login witout session
            /*res.status(404).json({
                message:"User cannot login with session"
            });*/
          //  next();
            //res.redirect("/login"); //alliws pame gia login 
             next();
        }
        

};