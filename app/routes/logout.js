'use strict';


module.exports = {
  get: function(req, res){
    req.session.destroy();
    res.redirect('/');
  }
};
