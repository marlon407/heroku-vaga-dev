angular.module('UserController', [])

.controller('userCtrl', function($scope, Users){
	$scope.emailPattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
	$scope.survey = {ios_score: 0, android_score: 0, django_score:0, python_score: 0, html_score: 0,
									css_score: 0, js_score:0};
	$scope.upload = function(){
		if ($scope.survey){
			//Create user
			Users.create($scope.survey);
			//Redirect to sucess page
			location.href="#/sucess";
		}
	}
})