// var jwt = require('jsonwebtoken');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var admin = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
      type: String,
      required: true
    }
  },
  
  {
    collection: "admin"
  }
);
const Admin = mongoose.model('Admin', admin);
module.exports = Admin;
