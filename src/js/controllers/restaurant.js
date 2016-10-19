(function () {
	'use strict';

	angular.module('restaurant-reviewer-app').controller('restaurantController', ['constants', 'httpService', '$routeParams', mainFunction]);

	function mainFunction(cnst, httpService,  $routeParams) {

		var controller = this;
		controller.restaurants = [];

		controller.moreReviewDetails = function (event) {
			event.preventDefault();
			var review = angular.element(event.currentTarget).data('review');
			controller.selectedtext =review.text;
			controller.selectedrating =review.rating;
			controller.selectedAuthor =review.author_name;
			controller.selectedtime =review.time;
		};

		httpService.GetData('./data/restaurants.json')
		.then(function(response){
			for (var i = 0 ; i < response.restaurants.length ; i++) {
				if (response.restaurants[i].id === Number($routeParams.res_id)) {
					controller.restaurant = response.restaurants[i];
					break;
				}
			}
		});
	}
}());