(function () {
    'use strict';
	var app = angular
        .module('app', ['ngRoute', 'ngStorage'])
		.constant( 'CONSTANTS', 
		{
			"env": "development",
			"development" : {
				"apiUrl" : 'http://localhost:3333'
			},
			"production" : {
				"apiUrl" : 'http://localhost:3333'
			}
		});

})();