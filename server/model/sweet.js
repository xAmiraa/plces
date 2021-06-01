var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sweetS = new Schema({
    name:String,
    price:Number,
    images:String
   
},
{collection:"sweet"}
);

const sweet=mongoose.model("sweet",sweetS); 
module.exports =sweet

