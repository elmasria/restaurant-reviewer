(function () {
	'use strict';

	angular.module('restaurant-reviewer-app').controller('ReviewModalController', ['constants', mainFunction]);

	function mainFunction(cnst) {

		var controller = this;
		controller.addReview = function () {
			console.log("a");
		};
	}
}());