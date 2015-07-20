/* App Module */
angular.module('app', [
  'ngRoute',//routes
  'UserController'//Adding the controllers
])

//Providing routes for the whole applicarion so far
.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'Views/vagas.html',
        controller: 'userCtrl'
      })
			.when('/sucess', {
        templateUrl: 'Views/sucess.html',
        controller: 'userCtrl'
      })
		.otherwise({
			redirect : "/"	
		});
		
		//$locationProvider.html5Mode(true);
  })
.run(function($rootScope) {
    $rootScope.$on('$viewContentLoaded', function () {
        $(document).foundation();
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

