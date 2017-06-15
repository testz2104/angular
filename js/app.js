// Code goes here

(function(){
	'use strict';
	
	angular.module('app')
		.config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
	 
        $routeProvider
			.when('/images', {
                templateUrl: 'templates/images.html',
                controller: 'ImageController',
				secure: true
            })
			.when('/images/add', {
                templateUrl: 'templates/image_add.html',
                controller: 'ImageController',
				secure: true
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController',
				secure: false
            })
            /* .when('/user/:username', {
                templateUrl: 'user.html',
                controllerUrl: 'UserController'
            }) */
            .otherwise({redirectTo: '/login'});
    }
	
	run.$inject = ['$rootScope', '$location', '$http', '$localStorage', '$log'];
    function run($rootScope, $location, $http, $localStorage, $log) {
        // keep user logged in after page refresh
		$rootScope.globals = $localStorage.globals || {};

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
			if (next && next.$$route && next.$$route.secure) {
				if ($rootScope.globals && $rootScope.globals.authdata) {
					$http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.authdata; // jshint ignore:line
				}
				if (!$rootScope.globals.authdata) {
					$location.path('/login');
				}
			}
        });
    }
}());