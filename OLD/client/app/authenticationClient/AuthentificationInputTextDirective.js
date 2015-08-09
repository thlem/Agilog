(function(){
	'use strict';

	/**
	 * @desc The directive associated with input text elements of the login and register form
	 * @example <input type="" id="" name="" ng-model="" required auth-input-text-dir />
	 */

	angular.module('agilog').directive('authInputTextDir', getAuthInputText);

	function getAuthInputText(){
		return{
			restrict:'A',
			link:function(scope, element, attrs){

				var currentInputText 		= $(element[0]),						// Get the input element
					currentInputTextLabel 	= $(currentInputText.siblings()[0]); 	// Get the label element

				// On the input focus, apply the class on the label to move it at the bottom
				currentInputText.on('focus', function(){
					// Check if there is a value to keep the label at the bottom
					if(!currentInputText.val()){
						// If there is no value do the animation
						currentInputTextLabel.addClass('moveLabelToBottom');
					}
				});

				// On the input focus out, apply the right class to animate the label
				currentInputText.on('focusout', function(){
					// If there is a value in the input
					if(currentInputText.val()){
						// Keep the label at the bottom
						currentInputTextLabel.addClass('labelOnBottom');
					}
					// If there is no value
					else{
						// Reset the label position into the input
						currentInputTextLabel.removeClass('labelOnBottom');
					}
					// Clear class that make the animation
					currentInputTextLabel.removeClass('moveLabelToBottom');
				});
			}
		};
	}
})();