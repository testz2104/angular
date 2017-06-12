(function () {
    'use strict';

    angular
        .module('app')
		.constant( 'CONSTANTS', 
		{
			"development" : {
				"apiUrl" : 'http://localhost:3333'
			},
			"production" : {
				"apiUrl" : 'http://localhost:3333'
			}
		});

})();