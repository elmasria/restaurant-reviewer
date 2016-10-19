(function () {
	'use strict';

	angular.module('restaurant-reviewer-app').controller('restaurantsController', ['constants', 'httpService', mainFunction]);

	function mainFunction(cnst, httpService) {

		var controller = this;
		controller.restaurants = [];
		httpService.GetData('./data/restaurants.json')
		.then(function(response){
			console.log(response)
			controller.restaurants = response.restaurants
		})
		.catch()
	}
}());