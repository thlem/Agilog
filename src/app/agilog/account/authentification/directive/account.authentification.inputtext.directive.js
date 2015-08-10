(function(){
    'use strict';

	/**
	 * @name authInputTextDir
	 * @description The directive relative to the input of login/register form
     * @memberof ag.acc.auth
	 */

    angular.module('ag.acc.auth').directive('authInputTextDir', getAuthInputText);

    var inject = [];

    getAuthInputText.$inject = inject;

    function getAuthInputText(){
        return{
            restrict:'A',
            templateUrl:'',
            link:function(scope, element, attrs){

                var currentInputText        = $(element[0]),                        // Get the input element
                    currentInputTextLabel   = $(currentInputText.siblings()[0]);    // Get the label element

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