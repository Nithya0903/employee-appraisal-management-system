myApp.controller('empController', function($scope,$route,$routeParams,$http){

	$scope.login = function(){
		console.log($scope.department.deptname)
		console.log("after")
		let data =  {'department': $scope.department.deptname,
				     'password': $scope.department.password}
		$http.post('/api/auth',{'department': $scope.department.deptname,
		'password': $scope.department.password})
			.then(function(response){
			//$scope.employees = response.data;
			var res = response.data;
			console.log(res);
			localStorage.setItem("department",res.department.deptname)
			console.log("storage set")
			window.location.href="/#/employees"
		});
	};
	$scope.getEmployees = function(){
		var dept = localStorage.getItem("department");//change and get from localstorage
		$scope.dept = dept;
		console.log("inside get employees")
		let headers = new Headers({'x-access-token':`${dept}`})
		//headers.append('x-access-token',`${dept}`)
		console.log("headers",headers['x-access-token']);
		console.log(headers);
		const body = {
			'x-access-token':`${dept}`
		}
		$http.get('/api/employees/',body,{headers}).then(function(response){
			$scope.employees = response.data;
		}
		,(response)=>{
			//console.log(err)
			if(response.status=== 400)
			window.location.href="/#/"
		})
	};
	$scope.showEmployee = function(){
		var id = $routeParams.id;
		var dept = localStorage.getItem("department");//change and get from localstorage
		$scope.dept = dept;
		$http.get('/api/employees/'+ id).then(function(response){
			$scope.employee = response.data;
		});
	};
	$scope.showDepartment = function(){
		var dept = localStorage.getItem("department");
	
			$scope.dept = dept;
			console.log(dept)
	
	};
	$scope.getEmployeesbyDept = function(){
		var dept = localStorage.getItem("department");//change and get from localstorage
		$scope.dept = dept;
		$http.get('/api/employeesbyDept/'+dept).then(function(response){
			$scope.employees = response.data;
		});
	};
	$scope.addEmployee = function(){
		//var id = $routeParams.id;
		var dept = localStorage.getItem("department");//change and get from localstorage
	
		$scope.dept = dept;
		
		$http.post('/api/employees/', {
			name:$scope.employee.name,
			dept:dept,
			performance:$scope.employee.no,
			area:$scope.employee.area,
			status:$scope.employee.status,
			salary:$scope.employee.salary,
			contact:$scope.employee.contact
		}).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/#/employees';
		});
	};
	$scope.updateEmployee = function(){
		var id = $routeParams.id;
		var dept = localStorage.getItem("department");//change and get from localstorage
		$scope.dept = dept;
		$scope.employee.dept = dept;
		$http.put('/api/employees/'+ id ,{	
			name:$scope.employee.name,
		dept:dept,
		performance:$scope.employee.no,
		area:$scope.employee.area,
		status:$scope.employee.status,
		salary:$scope.employee.salary,
		contact:$scope.employee.contact})
		.then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/#/employees';
		});
	};
	$scope.deleteEmployee = function(id){
		var id = id;
		$http.delete('/api/employees/'+ id).then(function(response){
			$route.reload();
		});
	};
	
});