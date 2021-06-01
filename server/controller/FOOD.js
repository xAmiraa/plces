var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});
router.get('/listfood',function(req,resp){
     mongoose.model('food').find(function (err, data) {
       var output=0
      data.forEach(e => {
        if (e["id"] != '') {
          output++;
        }
      });
      console.log(output)
         resp.json(data);
   })
   })
   router.get('/details/:_id',function(req,resp){
    var _id=req.params._id;
   mongoose.model('food').findOne({_id:_id},function(err,data){
    resp.json(data);
   })
  })
  
  router.put('/update/:id', function(req, res){
   
    mongoose.model("food").findByIdAndUpdate(req.params.id,
    {
        $set: {name: req.body.name,
       
          price: req.body.price, 
        
          images: req.body.images
        }
    },
    {
        new: true
    },
    function(err, updated){
        if(err){
            res.send("Error updating data");
        }else{
            res.json(updated);
            console.log("updated done")
        } });
}); 

router.post('/addfood',parseUrlencoded,(req,res)=>{ 
    const food=mongoose.model('food');
    const newfood=new food({
          name: req.body.name,
        
          price: req.body.price,
     
          images: req.body.images
    })
    newfood.save((err,res)=>{
      if (err){
        console.log(err)
      }
      console.log(res)
    })
  }) 
  router.delete('/delete/:id', function(req, res){
    mongoose.model("food").findByIdAndRemove(req.params.id, function(err, data){
        if(err){
            res.send("Error deleting ");
        }else{
            res.json(data);
            console.log(data)
        }
    });
  });

  router.post('/addNotification',parseUrlencoded,(req,res)=>{ 
    const Notification=mongoose.model('Notification');
    const newNoti=new Notification({
          name: req.body.name,
        
          price: req.body.price,
     
          images: req.body.images
    })
    newNoti.save((err,res)=>{
      console.log('notification saved')
      if (err){
        console.log(err)
      }
      else
     {
      setTimeout(function(){ 
        mongoose.model('Notification').deleteOne((err,data)=>{
console.log(data)
        })
        console.log('from sitTimeOut')
      }, 5000);

     }
    })
  }) 
  //list notification
  router.get('/listNoti',function(req,resp){
  
    mongoose.model('Notification').find(function (err, data) {
        resp.json(data);  
  })
  })
   module.exports = router;