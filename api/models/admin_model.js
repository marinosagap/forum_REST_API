const mongoose= require("mongoose");
const adminSchema = mongoose.Schema({//mongoose.Schema is theway is stored in the database
    _id:mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        required:true,
        unique:true,
        match:  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    name:{
        type:String,
        required:true,
        unique:true,
    },
    password :{type:String ,required:true}

})

module.exports = mongoose.model('Admin',adminSchema); //compiling the Schema into a model