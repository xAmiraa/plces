var express = require("express");

var router = express.Router();
var mongoose = require("mongoose");
router.get('/listsales',function(req,resp){
     mongoose.model('cart').find(function (err, data) {
       
   
 
         resp.json(data);
         
   })
   })

   router.get('/details/:_id',function(req,resp){
    var _id=req.params._id;
   mongoose.model('food','drink','sweet').findOne({_id:_id},function(err,data){
    resp.json(data);
   })
  })
   module.exports = router;