//Here is where the model is set up
var myAppModule = angular.module('myAppModule', ['ngRoute']);

//use the config method to set up routing
myAppModule.config(function($routeProvider){
	$routeProvider.when('/', {
			templateUrl: 'partials/view1.html'
		})
		.when('/main', {
			templateUrl: 'partials/view2.html'
		})
		.when('/profile/:id', {
			templateUrl: 'partials/view3.html'
		})
		.when('/edit/:id', {
			templateUrl: 'partials/view4.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});