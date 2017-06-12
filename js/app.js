// Code goes here

(function(){
	var app = angular
        .module('app', ['ngRoute'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
			.when('/images', {
                templateUrl: 'templates/images.html',
                controller: 'ImageController',
				auth: true
            })
			.when('/images/add', {
                templateUrl: 'templates/image_add.html',
                controller: 'ImageController',
				auth: true
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController',
				auth: false
            })
            /* .when('/user/:username', {
                templateUrl: 'user.html',
                controllerUrl: 'UserController'
            }) */
            .otherwise({redirectTo: '/login'});
    }
	
	run.$inject = ['$rootScope', '$location', '$http', '$log'];
    function run($rootScope, $location, $http, $log) {
        // keep user logged in after page refresh
		$rootScope.globals = sessionStorage.getItem('globals') || {};
		$log.info($rootScope.globals.currentUser);
        if ($rootScope.globals && $rootScope.globals.currentUser && $rootScope.globals.currentUser.authdata) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
			$log.info($rootScope.globals.currentUser);
            // redirect to login page if not logged in and trying to access a restricted page
            if (!$rootScope.globals || !$rootScope.globals.currentUser) {
				$location.path('/login');
            }
        });
    }
}());