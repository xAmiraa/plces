const mongoose = require('mongoose');

const sprofileSchema = new mongoose.Schema({
  ID: String,
  name:{
    type:String,
   
  }
  ,

  email:{
    type:String,
     
  },
  

  
 image:{
  type:String,
  default:'uploads'+'//'+'default.jpg'
},



});

const sprofile = mongoose.model('uprofile', sprofileSchema);

module.exports = sprofile;
