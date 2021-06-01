var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var foods = new Schema({
    name:String,
    price:Number,
    images:String
   
},
{collection:"food"}
);
 const food=mongoose.model("food",foods); 


module.exports= food