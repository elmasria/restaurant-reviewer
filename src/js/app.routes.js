(function () {

	'use strict';

	angular.module('restaurant-reviewer-app').config(['$routeProvider', configuration]);

	function configuration($routeProvider) {

		$routeProvider.when('/', {

			templateUrl: ''

		}).when('/404', {

			templateUrl: './templates/404.html'

		}).otherwise({

			redirectTo: '/404'

		});

	}

}());