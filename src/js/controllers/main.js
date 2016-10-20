(function () {
	'use strict';

	angular.module('restaurant-reviewer-app').controller('mainController', ['constants', '$rootScope', 'httpService', mainFunction]);

	function mainFunction(cnst, $rootScope, httpService) {

		var controller = this;
		controller.pageTitle = cnst.APP_TITLE;

		httpService.GetData('./data/restaurants.json')
		.then(function(response){
			var allCuisines = response.cuisines,
			allCities = response.cities,
			allRestaurants = response.restaurants;
			allCities.unshift({id: 0, name: 'All'});
			allCuisines.unshift({id: 0, name: 'All'});
			$rootScope.AllData = response;

			$rootScope.restaurants = allRestaurants;

			var Cuisines = {selectedOption: {id: 0, name: 'All'}};
			Cuisines.availableOptions = allCuisines;
			$rootScope.cuisineOptions = Cuisines;

			var Cities = {selectedOption: {id: 0, name: 'All'}};
			Cities.availableOptions = allCities;
			console.log(Cities);
			$rootScope.cityOptions = Cities;
		})
	}
}());