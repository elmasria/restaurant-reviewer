(function () {
	'use strict';

	angular.module('restaurant-reviewer-app')
	.directive('reviewerModal', ['modalService', modalDirective]);

	function modalDirective(modalService) {
		return {
			restrict:'E',
			replace: true,
			templateUrl: "./templates/review-modal.html",
			link: function(scope, element){
				element.on('shown.bs.modal', function (e) {
					var modal = element[0],
					focusedElementBeforeModal = e.relatedTarget;
					modalService.init(focusedElementBeforeModal, modal);
				});
			}
		}
	}
}());