var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
}); 

router.get('/listsweet',function(req,resp){
     mongoose.model('sweet').find(function (err, data) {
       
   
 
         resp.json(data);
         
   })
   })
   router.get('/details/:_id',function(req,resp){

     
    var _id=req.params._id;
   
   mongoose.model('sweet').findOne({_id:_id},function(err,data){
  
    resp.json(data);
  
   })

  
  })
  router.put('/update/:id', function(req, res){
   
    mongoose.model("sweet").findByIdAndUpdate(req.params.id,
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
        }
    }

    );
});
router.post('/addsweet',parseUrlencoded,(req,res)=>{ 
    const sweet=mongoose.model('sweet');
    const newsweet=new sweet({
          name: req.body.name,
        
          price: req.body.price,
     
          images: req.body.images
    })
    
    newsweet.save((err,res)=>{
      if (err){
        console.log(err)
      }
      console.log(res)
    })
  })  
  router.delete('/delete/:id', function(req, res){
 
    mongoose.model("sweet").findByIdAndRemove(req.params.id, function(err, data){
        if(err){
            res.send("Error deleting ");
        }else{
            res.json(data);
        }
    });
  });
   module.exports = router;