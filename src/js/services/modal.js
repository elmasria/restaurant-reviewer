(function () {
	'use strict';

	angular.module('restaurant-reviewer-app').factory('modalService', ['constants', mainFunction]);

	function mainFunction(cnst) {
		var appModal = new Modal();
		return appModal;
	};


	var Modal = function(){
	};

	Modal.prototype.init = function (focusedElementBeforeModal, modal) {
		this.focusedElementBeforeModal = focusedElementBeforeModal ;
		this.modal = modal;
		this.firstTabStop = null;
		this.lastTabStop = null;
		this._openModal();
	}

	Modal.prototype._closeModal = function () {
		/*Set focus back to element that had it before the modal was opened*/
		this.focusedElementBeforeModal.focus();
	}


	Modal.prototype._openModal = function () {
		var self = this;
		/*Listen for and trap the keyboard*/
		this.modal.addEventListener('keydown', function(e){
			self._trapTabKey(e, self);
		});

		/*  Find all focusable children*/
		var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
		var focusableElements = this.modal.querySelectorAll(focusableElementsString);
		/*Convert NodeList to Array*/
		focusableElements = Array.prototype.slice.call(focusableElements);

		this.firstTabStop = focusableElements[0];
		this.lastTabStop = focusableElements[focusableElements.length - 1];

		/*  Focus first child*/
		if (this.firstTabStop) {
			this.firstTabStop.focus();
		}
	}

	Modal.prototype._trapTabKey = function (e, self) {
		/*Check for TAB key press*/
		if (e.keyCode === 9) {
			/*SHIFT + TAB*/
			if (e.shiftKey) {
				if (document.activeElement === self.firstTabStop) {
					e.preventDefault();
					self.lastTabStop.focus();
				}

				/*TAB*/
			} else {
				if (document.activeElement === self.lastTabStop) {
					e.preventDefault();
					self.firstTabStop.focus();
				}
			}
		}

		/*ESCAPE*/
		if (e.keyCode === 27) {
			self._closeModal();
		}
	}



}());


