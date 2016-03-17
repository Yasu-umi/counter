var loginCheck = function(req, res, next) {
  if ("session" in req && "user" in req.session){
    console.log("logincheck", req.session.user);
    next();
  } else {
    console.log("redirect");
    res.redirect("/login");
  }
};

module.exports = loginCheck;
