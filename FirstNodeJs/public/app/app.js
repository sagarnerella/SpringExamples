var app = angular.module('FirstNodeJs', ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
        controller: 'LoginController',
        url: '/login',
        templateUrl: 'app/views/login.ejs'
    }).state('home', {
        controller: 'LoginController',
        url: '/login',
        templateUrl: 'app/views/home.ejs'
    })
	
	$urlRouterProvider.otherwise('/login');
}]);
