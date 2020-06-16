var jwt = require('jwt-simple');
var Manager = require("./models/Manager")

module.exports = function(req, res, next) {
    console.log("in middleware")
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
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
          return next();
        }
      } else {
        next();
      }
};