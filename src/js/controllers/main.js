(function () {
	'use strict';

	angular.module('restaurant-reviewer-app').controller('mainController', ['constants', mainFunction]);

	function mainFunction(cnst) {

		var controller = this;

		controller.pageTitle = cnst.APP_TITLE;
	}
}());