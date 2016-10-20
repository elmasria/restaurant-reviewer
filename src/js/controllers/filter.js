(function () {
	'use strict';

	angular.module('restaurant-reviewer-app').controller('filterModalController', ['constants', '$rootScope', '$location', '$scope', 'toastService', mainFunction]);

	function mainFunction(cnst, $rootScope, $location, $scope, toast) {

		var controller = this;
		controller.searchResult = "";
		controller.filter = function () {
			var allRestaurants = $rootScope.AllData.restaurants,
			iscityFillter = $rootScope.cityOptions.selectedOption.id !== 0,
			isCuisineFillter = $rootScope.cuisineOptions.selectedOption.id !== 0,
			filteredRestaurants = allRestaurants.slice(0);
			if (iscityFillter && isCuisineFillter) {
				filteredRestaurants = [];
				for(var i=0; i< allRestaurants.length ; i++){
						if (allRestaurants[i].cuisines.includes($rootScope.cuisineOptions.selectedOption.name) || allRestaurants[i].location.city === $rootScope.cityOptions.selectedOption.name) {
							filteredRestaurants.push(allRestaurants[i]);
						}
					}
			}else if(isCuisineFillter || iscityFillter){
				filteredRestaurants = [];
				if (isCuisineFillter) {
					for(var i=0; i< allRestaurants.length ; i++){
						if (allRestaurants[i].cuisines.includes($rootScope.cuisineOptions.selectedOption.name)) {
							filteredRestaurants.push(allRestaurants[i]);
						}
					}
				}
				if (iscityFillter) {
					for(var i=0; i< allRestaurants.length ; i++){
						if (allRestaurants[i].location.city === $rootScope.cityOptions.selectedOption.name) {
							filteredRestaurants.push(allRestaurants[i]);
						}
					}
				}
			}

			$rootScope.restaurants = filteredRestaurants;
			$location.path("/");
			$('#filterModal').modal('toggle');
			var stRest = $rootScope.restaurants.length>1? "restaurants" :"restaurant";
			$scope.searchResult = "we have found " + $rootScope.restaurants.length + " " +stRest;
			toast.show($scope.searchResult);
		};
	}
}());