var mongoose = require("mongoose");
var config = require('config');

var url = config.get("mongo.url") + "/user";
var db  = mongoose.createConnection(url, function(err, res){
  if (err) {
    console.log("Error connected: " + url + " - " + err);
  } else {
    console.log("Success connected: " + url);
  }
});

var UserSchema = new mongoose.Schema({
  email : String,
  password  : String
},{collection: "info"});

module.exports = db.model("User", UserSchema);
