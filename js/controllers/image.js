(function () {
    'use strict';

    angular
        .module('app')
        .controller('ImageController', ImageController);

    ImageController.$inject = ['$location', '$scope', '$http', 'ImageService', '$log'];
    function ImageController($location, $scope, $http, ImageService, $log) {
	
		ImageService.GetAllImagesOfUser().then(function(success){
			if (success.status == '200') {
				$scope.images = success.data;
			} else {
				$scope.error = true;
				$scope.errorMsg = success.message;
			}
		}, function(error){
			$log.info(error);
		});
		
		$scope.addImage = function() {
			$location.path('/images/add');
		}
    }

})();