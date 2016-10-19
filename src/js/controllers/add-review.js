(function () {
	'use strict';

	angular.module('restaurant-reviewer-app').controller('ReviewModalController', ['constants', mainFunction]);

	function mainFunction(cnst) {

		var controller = this;
		controller.restaurants = [];
		controller.addReview = function () {
			console.log("a");
		};
	}
}());