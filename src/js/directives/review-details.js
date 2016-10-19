(function () {
	'use strict';

	angular.module('restaurant-reviewer-app')
	.directive('reviewModal', ['modalService',reviewModalDirective]);

	function reviewModalDirective(modalService) {
		return {
			restrict:'E',
			replace: true,
			scope:{
				author: "@",
				text: "@",
				time: "@",
				rating: "@"
			},
			templateUrl: "./templates/review-details.html",
			link: function(scope, element, attrs){
				element.on('shown.bs.modal', function (e) {
					var modal = element[0],
					focusedElementBeforeModal = e.relatedTarget;
					modalService.init(focusedElementBeforeModal, modal);
				});
			}
		}
	}
}());