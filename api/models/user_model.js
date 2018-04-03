const mongoose= require("mongoose");
const userSchema = mongoose.Schema({//mongoose.Schema is theway is stored in the database
    _id:mongoose.Schema.Types.ObjectId,
    username:{//sthn ousia email
        type:String,
        required:true,
        unique:true,
        match:  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    
    password :{type:String ,required:true}

});

module.exports = mongoose.model('Usersdb',userSchema); //compiling the Schema into a model