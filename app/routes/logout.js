var get = function(req, res){
  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  get: get
};
