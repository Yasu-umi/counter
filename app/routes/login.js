var User = require("../model").User;

var get = function(req, res) {
  var email = req.query.email;
  var password = req.query.password;
  var query = { "email": email, "password": password };
  User.find(query, function(err, data){
    if (err) {
      console.log(err);
    }
    if (data.length === 0) {
      res.render("login");
    } else {
      req.session.user = email;
      res.redirect("/");
    }
  });
};

module.exports = {
  get: get
};
