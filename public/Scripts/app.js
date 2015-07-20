/* App Module */
angular.module('app', [
  'ngRoute',//routes
  'UserController'//Adding the controllers
])

//Providing routes for the whole applicarion so far
.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/new', {
        templateUrl: 'Views/vagas.html',
        controller: 'userCtrl'
      })
			.when('/all', {
        templateUrl: 'Views/vagas.html',
        controller: 'userCtrl'
      })
		.otherwise({
			redirect : "/"	
		});
		
		//$locationProvider.html5Mode(true);
  })
	.run(function ($rootScope, $location) {
		$rootScope.$on('$viewContentLoaded', function () {
			$(document).foundation('slider', 'reflow');
		});
	})

.factory('Users', function ($http) {
		return{
	
		all: function(){
			return $http.get('/api/users/');
		},
		
		create: function(data){
			return $http.post('/api/users/', data);
		}
	}
});

