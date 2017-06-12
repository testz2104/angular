(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', '$scope', '$log'];
    function LoginController($location, AuthenticationService, $scope, $log) {
	
        $scope.login = function() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                if (response.token) {
                    AuthenticationService.SetCredentials($scope.username, response.token);
					$log.info("Session Set");
                    $location.path('/images');
                } else {
                    // do nothing
                }
            });
        };
		
		$scope.logout = function() {
            AuthenticationService.ClearCredentials();
			$location.path('/login');
        };
    }

})();