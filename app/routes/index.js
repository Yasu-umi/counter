var get = function(req, res){
  console.log("login: " + req.session.user);
  res.render("index", { user: req.session.user});
};

module.exports = {
  get: get
};
