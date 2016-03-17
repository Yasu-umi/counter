var User = require("../model").User;

var post = function(req, res){
  var newUser = new User(req.body);
  newUser.save(function(err){
    if(err){
      res.redirect("back");
    }else{
      res.redirect("/");
    }
  });
};

module.exports = {
  post: post
};
