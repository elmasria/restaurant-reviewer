(function () {
	'use strict';

	angular.module('restaurant-reviewer-app')
	.directive('filterModal', ['modalService',filterModalDirective]);

	function filterModalDirective(modalService) {
		return {
			restrict:'E',
			replace: true,
			templateUrl: "./templates/filter.html",
			link: function(scope, element, attrs){
				var rtarget = "";
				element.on('shown.bs.modal', function (e) {
					var modal = element[0],
					focusedElementBeforeModal = e.relatedTarget;
					modalService.init(focusedElementBeforeModal, modal);
					rtarget = e.relatedTarget;
				});
				/*element.on('hidden.bs.modal', function () {
					$(rtarget).one('focus', function(e){
						$(this).blur();
						$('#resultSearch')[0].focus();
					})

				});*/
			}
		}
	}
}());