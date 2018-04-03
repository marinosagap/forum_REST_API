const express =require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require("morgan");
const Posts = require('./api/routes/posts');
const Users = require("./api/routes/user")
const mongoose = require("mongoose");
const Admin = require("./api/routes/admin");

const cookieParser= require("cookie-parser");
const session = require("express-session");

app.use(express.static('public'));
app.use(express.static('./public/html/home'));

mongoose.connect(
    "mongodb://node-shop:node-shop@nodeshop-shard-00-00-9kvxg.mongodb.net:27017,nodeshop-shard-00-01-9kvxg.mongodb.net:27017,nodeshop-shard-00-02-9kvxg.mongodb.net:27017/test?ssl=true&replicaSet=nodeshop-shard-0&authSource=admin",
    {
      //useMongoClient: true
    }
  ).then(result=>{
    console.log("mongoose connection ok");
  }).catch(err=>{
    console.log("mongoose connection error");
    console.log(JSON.stringify(err) );
  });
  mongoose.Promise = global.Promise;
  

app.use(morgan("dev")); //for printing in the console all the requests taking place
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //gia na diaxeirizomaste pio eykola ta json 
app.use(cookieParser());
var sess = {
    key:"user_id",
    secret:"giaxabibi_yoleley_xorepse_mou_tsifteteliiiii",
    resave:false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
};
app.use(session(sess));

app.use((req,res,next)=> {
    // console.log("cookies\n");
    // console.log(req.cookies);
    // console.log("session\n");

    // console.log(req.session);
    // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
    // This usually happens when you stop your express server after login, your cookie still remains saved in the browser.

    if(req.cookies.user_id && !req.session.user ){
        res.clearCookie('user_id');
    }
    next();
    //  if(req.cookies.user_id && !res)
})

//etsi leme ston client kai ston browser oti mporeis na exeis acess sto API mas
//edw den stelnoume to response apla to kanoume adjust etsi wste opote stelnoume response na exei ta parakatw headers
//kai sthn synexeia kanoume next() kai paei kai trexei ta alla routes 
app.use((req,res,next)=>{
    //me ayto dilwnoume an h apanthsh mporei na ginei share me ton client pou to kalese
    //den einai trelo protection dhladh me ton postman tha mporoume kai pali na to kanoume consume aneksarthta an exoume dilwsei mono mia selida apla 
    //etsi tha mporousame na dilwsoume kai oti mono h dikia mas frontend web page tha mporei na kanei consume to API
    res.header("Access-Control-Allow-Origin","*") //epitrepoume se opoion dipote client/server na kanei consume to API mas
    res.header("Access-Control-Allow-Headers",//etsi kanoume define ti eidous headers mporei kapoios na steilei sto api mas mazi me ena request 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization" //an ta thelame ola tha vazame '*'
    );
    //method mas deixnei to http method gia to request
    if(req.method === 'OPTIONS') //o browser panta stelnei ena OPTIONS request prin ena post h get request gia na dei poia request mporei na kanei 
    {
        res.header("Acess-Control-Allow-Methods","PUT,POST,PATCH, DELETE")
        return res.status(200).json({}); //gia to options request den prepei na proxwrhsei sta routes to response
    }
    next();
});

app.use("/user",Users);
app.use('/posts',Posts);
app.use('/admin',Admin);



///handling errors in case the endpoint of the request doesnt exist
app.use((req,res,next) =>{
    const error = new Error("Not found");
    error.status(404);
    next(error);// we create the error and we pass it to the next event handler
});

app.use((error,req,res,next) =>{
    res.status(error.status|| 500).json({
        error:{
            message:"Endpoint Not Found  "+ error.message
        }
    });
});
module.exports = app;