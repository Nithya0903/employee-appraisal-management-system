var express = require('express');
var bodyParser = require('body-parser');
var Bcrypt = require("bcryptjs")
var app = express();
var jwt = require('jwt-simple');
var jwtauth = require("./jwtauth")
var salt = Bcrypt.genSaltSync(10);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/employees');
var Employee = mongoose.model('Employee', mongoose.Schema({
	name:String,
	dept:String,
	performance:Number,
	area:String,
	status:String,
	contact:String,
	salary:String
}));
var Manager = require("./models/Manager")
var password = Bcrypt.hashSync("password",salt)
//  new Manager({
// 	 deptname:'It',
// 	 password:password,
//  }).save()




app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.set('jwtTokenSecret', 'KEYBOARD-CAT');
app.get('/api/employees',  jwtauth,function(req, res){
	Employee.find().sort({'performance':-1})
	.exec((function(err, employees){
		if(err)
			res.send(err);
			console.log(employees)
		res.json(employees);
	}));
});
app.post('/api/auth',(req,res)=>{
	console.log(req.body)
	const department = req.body.department;
	const Password = req.body.password;
	console.log(department,Password)
	Manager.findOne({deptname: department }, function(err, department) {
		if (err) { 
			return res.status(200).json({err:err
		})
		}
		if (!department) {
			return res.status(200).json({err:"department doesnt exist"
		})
		}
		if (Bcrypt.compareSync(Password,"password")) {
			console.log(Password,department.password)
			console.log("password dont match")
		  return res.status(200).json({err:"incorrect pass"
		})
	}	
		var token = jwt.encode({
		department: department.deptname,
		}, app.get('jwtTokenSecret'));

		res.status(200).json({
		token : token,
		department: department.toJSON()
		});

})
})
app.get('/api/employeesbyDept/:dept', jwtauth,function(req, res){
	var dept = req.params.dept;
	console.log(req.params)
	console.log(dept)
	Employee.find({dept:dept}).sort({'performance':-1})
	.exec((function(err, employees){
		if(err)
			res.send(err);
			console.log(employees)
		res.json(employees);
	}));
});
app.get('/api/bestEmp/:dept', jwtauth,function(req, res){
	var dept = req.params.dept;
	Employee.find({dept:dept}).sort({'performance':-1}).limit(1)
	.exec((function(err, employees){
		if(err)
			res.send(err);
			console.log(employees)
		res.json(employees);
	}));
});
app.get('/api/noOfEmp/:dept', jwtauth,function(req, res){
	var dept = req.params.dept;
	Employee.find({dept:dept}).sort({'performance':-1})
	.exec((function(err, employees){
		if(err)
			res.send(err);
			console.log(employees)
		res.json(employees);
	}));
});
app.get('/api/noOfEmp1/:dept', jwtauth,function(req, res){
	var dept = req.params.dept;
	Employee.find({dept:dept,performance :{$gt:80}}).sort({'performance':-1})
	.exec((function(err, employees){
		if(err)
			res.send(err);
			console.log(employees)
		res.json(employees.length);
	}));
});
app.get('/api/noOfEmp2/:dept', jwtauth,function(req, res){
	var dept = req.params.dept;
	Employee.find({dept:dept,performance :{$gt:60}}).sort({'performance':-1})
	.exec((function(err, employees){
		if(err)
			res.send(err);
			console.log(employees)
		res.json(employees.length);
	}));
});
app.get('/api/noOfEmp3/:dept', jwtauth,function(req, res){
	var dept = req.params.dept;
	Employee.find({dept:dept,performance :{$gt:40}}).sort({'performance':-1})
	.exec((function(err, employees){
		if(err)
			res.send(err);
			console.log(employees)
		res.json(employees.length);
	}));
});
app.get('/api/noOfEmp4/:dept', jwtauth,function(req, res){
	var dept = req.params.dept;
	Employee.find({dept:dept,performance :{$lte:40}}).sort({'performance':-1})
	.exec((function(err, employees){
		if(err)
			res.send(err);
			console.log(employees)
		res.json(employees.length);
	}));
});
app.get('/api/wEmp/:dept', jwtauth,function(req, res){
	var dept = req.params.dept;
	Employee.find({dept:dept}).sort({'performance':1}).limit(1)
	.exec((function(err, employees){
		if(err)
			res.send(err);
			console.log(employees)
		res.json(employees);
	}));
});
app.get('/api/employees/:id',jwtauth, function(req, res){
	Employee.findOne({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.post('/api/employees',jwtauth, function(req, res){
	Employee.create( req.body, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

app.delete('/api/employees/:id',jwtauth, function(req, res){
	Employee.findOneAndRemove({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.put('/api/employees/:id', jwtauth,function(req, res){
	console.log("inside modify")
	console.log(req.body)
	var query = {
		name:req.body.name,
		dept:req.body.dept,
		performance:req.body.performance,
		area:req.body.area,
		status:req.body.status,
		contact:req.body.contact,
		salary:req.body.salary
	};
	Employee.findOneAndUpdate({_id:req.params.id}, query, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.listen(3000, function(){
	console.log('server is running on port 3000..');
});