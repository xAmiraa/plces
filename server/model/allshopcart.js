var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var allshoppets = new Schema({
    name:String,
    
    price:Number,
    
    images:String
    // userId:[{
    //     type : Schema.Types.ObjectId,
    //     ref : "UserSchema",
    //     required : true
    //   }]
},
    {collection:"allshoppets"}

);
module.exports= mongoose.model("allshoppets",allshoppets);
