angular.module('UserController', [])

.controller('userCtrl', function($scope, Users){
	$scope.emailPattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
	$(document).foundation('slider', 'reflow');
	$scope.upload = function(){
		if ($scope.survey){
			console.log($scope.survey)
			Users.create($scope.survey);
			location.href="#/all";
		}
	}
})