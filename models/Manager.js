var mongoose = require('mongoose');
var Manager = mongoose.model('Manager', mongoose.Schema({
	deptname:String,
	password:String,

}));
module.exports = Manager;