(function () {
	'use strict';

	angular.module('restaurant-reviewer-app').controller('restaurantController', ['constants', 'httpService', '$rootScope', '$routeParams', '$timeout', 'toastService', mainFunction]);

	function mainFunction(cnst, httpService, $rootScope, $routeParams, $timeout, toast) {

		var controller = this,
		allRestaurants = $rootScope.AllData.restaurants,
		restaurantCursor = 0;
		controller.restaurants = [];
		controller.dayOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		controller.moreReviewDetails = function (event) {
			event.preventDefault();
			var review = angular.element(event.currentTarget).data('review');
			controller.selectedtext =review.text;
			controller.selectedrating =review.rating;
			controller.selectedAuthor =review.author_name;
			controller.selectedtime =review.time;
		};

		controller.getTime = function(oCtime){
			var timeArray = (""+oCtime).split("");
			return timeArray[0]+""+timeArray[1]+":"+timeArray[2]+""+timeArray[3];
		};

		controller.addReview = function(){
			console.log(controller.reviewerName);
			console.log(controller.reviewerText);
			console.log(controller.reviewerRate);
			if (controller.reviewerName && controller.reviewerText && controller.reviewerRate) {
				var newReview =  {};
                newReview.author_name = controller.reviewerName;
                newReview.rating = controller.reviewerRate;
                newReview.text = controller.reviewerText;
                newReview.time = Date.now()/1000;
				$rootScope.AllData.restaurants[i].reviews.push(newReview);
				controller.reviewerName = "";
				controller.reviewerText = "";
				controller.reviewerRate = 1;
				_showMessage("Thank you for your review");
				$('#addReviewModal').modal('toggle');
			}else{
				_showMessage("You are missing some required fields");
			}
		};

		for (var i = 0 ; i < allRestaurants.length ; i++) {
				if (allRestaurants[i].id === Number($routeParams.res_id)) {
					controller.restaurant = allRestaurants[i];
					restaurantCursor = i;
					break;
				}
			}

		function _showMessage(message){
			controller.errorDetails = message;
			toast.show(controller.errorDetails);
			$timeout(function(){
				controller.errorDetails = ""
			}, 3000);
		}
	}



}());