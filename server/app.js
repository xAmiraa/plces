var express = require("express");
var mongoose = require("mongoose");
var fs = require("fs");
var cors = require('cors');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
const http = require('http');
const socketIO = require('socket.io');
var app = express();
const server=http.createServer(app)
const io=socketIO(server)
const foodM =require('./model/food')
const sweetM=require('./model/sweet')
const drinkM=require('./model/drink')
//model
var users =require('./model/users')

app.use(bodyParser.json());
var bodyParser = require('body-parser')
var route = express.Router();
app.use(cors());
var food=require('./controller/FOOD')
var sales =require('./controller/sales')
app.use('/restaurant/sales',sales)
app.use('/restaurant/food',food);
var drink=require('./controller/DRINK')
app.use('/restaurant/drink',drink);
var sweet=require('./controller/SWEET')
app.use('/restaurant/sweet',sweet);
var user=require('./controller/user')
var admin=require('./controller/admin')
var payment=require('./controller/payment')
var uProfile=require('./controller/uProfile')

app.use('/sprofile',uProfile)
app.use ('/restaurant/pay',payment)
app.use("/restaurant/admin",admin);
var cart =require('./controller/cart')
app.use("/restaurant/cart",cart);
app.use("/restaurant/user", user);
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, HEAD, GET, OPTIONS, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.all("*", (req, resp, next) => {
  resp.status(404).send("cant find this url");
});
// 



app.use(cors());

app.use(express.static("public"));


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, HEAD, GET, OPTIONS, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.all("*", (req, resp, next) => {
  resp.status(404).send("cant find this url");
});


app.set("viewengine", "ejs");
app.set("views", "./views");
app.use(cors());




// SOCKET
app.use(cors());
  

io.on('connection', (socket) => {
  
  console.log('socket connected')
  //deleteFood
  var finish =false
  
  socket.on('deleteEvent', (eventID) => {
    console.log('connected food')
    foodM.deleteOne({ _id: eventID }, (err, data) => {
        if (!err) {
            console.log("Event Delete");
            foodM.find({}, (err, data) => {
                if (!err)
                
                    io.emit("getEvents", data)
                else {
                    console.log(error);
                }
            });
        } else {
            console.log(error);
        }
    });
    finish =true
});
//delete Sweet

socket.on('deleteSweet', (eventID) => {
  console.log('connected sweet')
  sweetM.deleteOne({ _id: eventID }, (err, data) => {
      if (!err) {
          console.log("Event Delete");
          sweetM.find({}, (err, data) => {
              if (!err)
              
                  io.emit("getSweet", data)
              else {
                  console.log(error);
              }
          });
      } else {
          console.log(error);
      }
  });
  finish =true
});
//delete drink
socket.on('deleteDrink', (eventID) => {
  console.log('connected sweet')
  drinkM.deleteOne({ _id: eventID }, (err, data) => {
      if (!err) {
          console.log("Event Delete");
          drinkM.find({}, (err, data) => {
              if (!err)
              
                  io.emit("getDrink", data)
              else {
                  console.log(error);
              }
          });
      } else {
          console.log(error);
      }
  });
  finish =true
});
//notification
socket.on('noteDelete',(note)=>{

  
    if (!finish)
  {
    note+1
    console.log('note+1',note)
  }

  else{
    console.log('not done')
  }

}
)
//chat
socket.on('newJoin',(data)=>{
  data.user=req.user
  socket.join(data.room);
  socket.in(data.room).broadcast. emit('serverNewJoin',{
    msg:data.name+ ' '+'successfully joined' +" " +data.room,
    user:data.name,
    date:new Date().getHours()
    
  })
  console.log('this msg from client' +data['user','room'])
})
//sendmsg
socket.on('clientNewMessage',(data)=>{
  socket.in(data.room).broadcast. emit('serverNewMessage',{
    msg:data.msg,
    user:data.name,
    date:new Date().getHours()
    
  })
})

})
app.use(cors());


//CONNECT TO DATABASE
mongoose.connect("mongodb+srv://places:places@cluster0-xyxl3.mongodb.net/restaurantDATA?retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology: true}).then(()=> console.log("Up"))
.then(()=>console.log("Database Connected"));




mongoose.connection.on("error", err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});



var files_arr = fs.readdirSync(__dirname + "/model");
files_arr.forEach(function (file) {
  require(__dirname + "/model/" + file);
});
app.use(express.urlencoded ({extended : false}));
server.listen(2000, function () {
  console.log("server on port 2000 ");

});
