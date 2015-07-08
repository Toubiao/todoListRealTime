angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.when('/',{
			templateUrl: 'views/todolist.html',
			controller: 'TodoListController'	
		});

	$locationProvider.html5Mode(true);

}]);