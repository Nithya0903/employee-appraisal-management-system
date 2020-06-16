var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl:'templates/login.html',
			controller:'empController'
		})
		// .when('/', {
		// 	templateUrl:'templates/list.html',
		// 	controller:'empController'
		// })
		.when('/dashboard',{
			templateUrl:'templates/dashboard.html',
			controller:'empController'
		})
		.when('/employees', {
			templateUrl:'templates/list.html',
			controller:'empController'
		})
		.when('/employeesbyDept/:dept', {
			templateUrl:'templates/listbyDept.html',
			controller:'empController'
		})
		.when('/employees/create', {
			templateUrl:'templates/add.html',
			controller:'empController'
		})
		.when('/employees/:id/edit', {
			templateUrl:'templates/edit.html',
			controller:'empController'
		})
		.when('/employees/:id/show', {
			templateUrl:'templates/show.html',
			controller:'empController'
		});
});
