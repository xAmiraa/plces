var mongoose=require("mongoose")
var Schema=mongoose.Schema
var cart=new Schema({
    note:String,
    totalPrice:Number,
    totalQuantity:Number
    ,product_id : String,
    user:String,
    name:String
},
{
    collection: "cart"
}
);
mongoose.model("cart",cart)