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
			window.location.href="/#/dashboard"
		});
	};
	$scope.dashboard = function(){
		var dept = localStorage.getItem("department");//change and get from localstorage
		$scope.dept = dept;
		$http.get('/api/noOfEmp/'+dept).then(function(response){
		
			$scope.no = response.data.length;
			console.log(response.data)
		});
		$http.get('/api/noOfEmp1/'+dept).then(function(response){
		
			$scope.no1 = (response.data/$scope.no)*100;
			console.log(response.data)
		});
		$http.get('/api/noOfEmp2/'+dept).then(function(response){
		
			$scope.no2 = (response.data/$scope.no)*100;
			console.log(response.data)
		});
		$http.get('/api/noOfEmp3/'+dept).then(function(response){
		
			$scope.no3 = (response.data/$scope.no)*100;
			console.log(response.data)
		});
		$http.get('/api/noOfEmp4/'+dept).then(function(response){
		
			$scope.no4 = (response.data/$scope.no)*100;
			console.log(response.data)
		});
		$http.get('/api/bestEmp/'+dept).then(function(response){
		
			$scope.bestemployee = response.data[0];
			console.log($scope.bestemployee)
		});
		$http.get('/api/wEmp/'+dept).then(function(response){
		
			$scope.wemployee = response.data[0];
			console.log($scope.wemployee)
		});

		
	};
	$scope.getEmployees = function(){
		var dept = localStorage.getItem("department");//change and get from localstorage
		$scope.dept = dept;
		$http.get('/api/employees/').then(function(response){
			$scope.employees = response.data;
		});
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
			performance:$scope.employee.performance,
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
		console.log($scope.employee.performance)
		$http.put('/api/employees/'+ id ,{	
			name:$scope.employee.name,
		dept:dept,
		performance:$scope.employee.performance,
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