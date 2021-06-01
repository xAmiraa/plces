var express =require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser")
var route=express.Router()
 var app = express();
 var User = require('../model/user');
 var Payment = require('../model/payment')
 var bcrypt = require('bcryptjs');
 var jwt = require('jsonwebtoken');
 var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
  

var Token = ''
function verifytoken(req, res, next) {  
  let token = req.query.token;
  console.log(token)
  jwt.verify(token, 'Secret', (err, verifytoken) => {
    if (err)
      return res.status(400).json({
        Msg: 'Unauthorized'
      })
    if (verifytoken) {
      Token = verifytoken;      
      next();
    }
  })
}

route.post('/pay',parseUrlencoded,(req,res)=>{
  cartId = Token.useremail
  const payment=mongoose.model('payment');
  const newPay=new payment({
        card: req.body.card,
        acount_number: req.body.acount_number,
        postal_code: req.body.postal_code
      
  })
  newPay.save((err,data)=>{
    if (err){ 
      console.log(err)
    }
    else{
   
      res.send(data)
     
      
    }
    
  })
}) 
module.exports=route;