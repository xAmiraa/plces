var express = require("express");
var bodyParser = require("body-parser");
var route = express.Router();
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var app = express();







var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});

var Token = ''


function verifytoken(req, res, next) {
  let token = req.query.token;

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

route.get("/add/:id/:price/:name0", verifytoken, function (req, resp, next) {
  console.log(Token.useremail)
  cartId = Token.useremail
  productId = req.params.id
  productPrice = parseInt(req.params.price);
  productName = req.params.name;
  // productImage = req.query.images;
  console.log(productId)
  console.log(productPrice);
  console.log(productName);
  // console.log(productImage);
  

  const productAddedToCart = {
    price: productPrice,
    name: productName,
    quantity: 1,
    _id: productId
    // images: productImage
  }

  mongoose.model('cart').findOne({
    user: cartId,
    product_id: req.params.id
  }, (err, cart) => {

    if (!cart) {
      var cartModel = mongoose.model("cart")
      var cart = new cartModel()
      cart.product_id = req.params.id 
      cart.totalPrice = productPrice;
      cart.totalQuantity = 1;
      cart.user = cartId;
      cart.name = productName;
  
      cart.save(function (err, data) {
        resp.send(data);
        console.log(data);
      })
      console.log("Iam Heree save")


    } else {
      cart.totalQuantity += 1;
      cart.totalPrice += productPrice
      mongoose.model('cart').updateOne({
        user: cartId,
        product_id: req.params.id
      }, {
        $set: cart
      }, (err, data) => {
        if (err) {
          console.log(err)
        }
        console.log(data)
        console.log(cart)
      


      })
    }
  })

})

route.get('/details', verifytoken, function (req, resp) {
  if (req.query.token != null) {
    cartId = Token.useremail
    mongoose.model("cart").find({
      user: cartId
    }, function (err, data) {
      if (!err) {
        console.log(Token.useremail);
        resp.status(200).send(data)
        console.log(data)
      } else {
        console.log(err)
      }
    })
  } else {
    resp.status(200).json('no user login')
  }

})

    route.get('/deleteItem/:id', verifytoken, function (req, resp) {
      cartId = Token.useremail
      mongoose.model('cart').deleteOne({
        user: cartId
      }, {
        $pull: {
          products: {
            product_id: req.params.id
          }
        }
      }, () => console.log("deleted" + req.params.id))
    
      resp.end()
    })
 



route.get('/clear', verifytoken, function (req, resp) {
  cartId = Token.useremail
  mongoose.model("cart").remove({
    user: cartId
  }, (err, data) => console.log(data))
  resp.end()

})
module.exports = route;
