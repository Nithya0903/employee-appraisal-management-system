var jwt = require('jwt-simple');
var Manager = require("./models/Manager")

module.exports = function(req, res, next) {
    console.log("in middleware")
    console.log(req.headers)
    console.log(req.body)
    //console.log(localStorage.getItem(department))
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
   console.log(token);
    if (token) {
        try {
          var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
          if (decoded.exp <= Date.now()) {
            res.end('Access token has expired', 400);
          }
          Manager.findOne({ deptname: decoded.deptname }, function(err, user) {
            req.user = user;
          });
      
        } catch (err) {
          console.log(err)
          return next();
        }
      } else {
        console.log("not authenticated")

        return res.status(400).json({err:"not authenticated"});

      }
};