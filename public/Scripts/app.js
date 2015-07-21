/* App Module */
angular.module('app', [
  'ngRoute',//routes
  'UserController'//Adding the controllers
])

//Providing routes for the whole applicarion so far
.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'Views/position.html',
			controller: 'userCtrl'
		})
		.when('/sucess', {
			templateUrl: 'Views/sucess.html',
			controller: 'userCtrl'
		})
	.otherwise({
		redirect : "/"	
	});
 })

.factory('Users', function ($http) {
	return{
		//Create new user based on survey
		create: function(data){
			return $http.post('/api/users/', data);
		}
	}
});

