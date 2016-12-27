var app = angular.module('CDSApp', ['ui.router', 'angularUtils.directives.dirPagination', 'chart.js', 'CDSApp.services', 'ngStorage', 'ui.bootstrap']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('slider', {
        controller: 'ChartsController',
        url: '/slider',
        templateUrl: 'app/views/slider.ejs'
    }).state('login', {
        controller: 'LoadController',
        url: '/login',
        templateUrl: 'app/views/loginbkp.ejs'
    }).state('signup', {
        controller: 'LoadController',
        url: '/signup',
        templateUrl: 'app/views/register.ejs'
    }).state('forget', {
        controller: 'LoadController',
        url: '/forget',
        templateUrl: 'app/views/forgotpassword.ejs'
    }).state('changepassword', {
        controller: 'LoadController',
        url: '/changepassword',
        templateUrl: 'app/views/changepassword.ejs'
    }) .state('contact', {
        controller: 'ContactController',
        url: '/contact',
        templateUrl: 'app/views/contact.ejs'
    }).state('dashboard', {
        controller: 'DashboardController',
        url: '/dashboard',
        templateUrl: 'app/views/dashboard.ejs'
    }).state('dashboard.dboardGraphs', {
        url: '/dboardGraphs',
        views: {
            'dboardSection': {
                templateUrl: 'app/views/dashboard/dboardGraphs.ejs',
                controller: 'DboardGraphController'
            }
        }
    }).state('dashboard.myrequests', {
        url: '/myrequests',
        views: {
            'dboardSection': {
                templateUrl: 'app/views/dashboard/myRequests.ejs',
                controller: 'MyRequestsController'
            }
        }

    }).state('dashboard.viewrequest', {
        url: '/viewrequest',
        views: {
            'dboardSection': {
                templateUrl: 'app/views/dashboard/viewRequest.ejs',
                controller: 'ViewRequestController'
            }
        }
    }).state('dashboard.postrequest', {
        url: '/postrequest',
        views: {
            'dboardSection': {
                templateUrl: 'app/views/dashboard/postRequest.ejs',
                controller: 'PostRequestController'
            }
        }
    }).state('dashboard.otherrequests', {
        url: '/otherrequests',
        views: {
            'dboardSection': {
                templateUrl: 'app/views/dashboard/otherRequests.ejs',
                controller: 'AllRequestsController'
            }
        }
    }).state('dashboard.viewotherrequest', {
        url: '/viewotherrequest',
        views: {
            'dboardSection': {
                templateUrl: 'app/views/dashboard/viewOtherRequest.ejs',
                controller: 'ViewOtherRequestController'
            }
        }
    }).state('mycomments', {
        controller: 'LoadController',
        url: '/mycomments',
        templateUrl: 'app/views/mycomments.ejs'
    })

    $urlRouterProvider.otherwise('/slider');
}]);
