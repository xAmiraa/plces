var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var notification=new Schema({
 
 
   
     name:String,
     price:Number,
     images:String
    

},
{collection:"notificationDelete"}
);
const Notification=mongoose.model("Notification",notification); 


module.exports= Notification