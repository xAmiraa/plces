var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var drinks = new Schema({
    name:String,
    price:Number,
    images:String
   
},
{collection:"drink"}
);
const drink=mongoose.model('drink',drinks)
module.exports =drink