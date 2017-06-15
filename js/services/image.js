(function () {
    'use strict';

    angular
        .module('app')
        .factory('ImageService', ImageService);

    ImageService.$inject = ['$timeout', '$http', '$filter', '$q', 'CONSTANTS', '$log'];
    function ImageService($timeout, $http, $filter, $q, CONSTANTS, $log) {

        var service = {};

        service.GetAllImagesOfUser = GetAllImagesOfUser;
 

        return service;

        function GetAllImagesOfUser() {
			return $http({
				method: "GET",
				url: CONSTANTS.development.apiUrl+'/images'
			});
        }

        
    }
})();